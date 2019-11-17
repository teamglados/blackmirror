import numpy as np
import argparse
import cv2
import os

from blackmirror.models.FaceSwap.face_detection import face_detection
from blackmirror.models.FaceSwap.face_points_detection import face_points_detection
from blackmirror.models.FaceSwap.face_swap import warp_image_2d, mask_from_points, apply_mask, correct_colours, transformation_from_points

def select_face(im, r=25):
    faces = face_detection(im)
    if len(faces) != 1:
        raise RuntimeError('Multiple faces found!')
    bbox = faces[0]
    points = np.asarray(face_points_detection(im, bbox))
    im_w, im_h = im.shape[:2]

    left, top = np.min(points, 0)
    right, bottom = np.max(points, 0)

    x, y = max(0, left-r), max(0, top-r)
    w, h = min(right+r, im_h)-x, min(bottom+r, im_w)-y
    return points - np.asarray([[x, y]]), (x, y, w, h), im[y:y+h, x:x+w]

def swap_face(src_path, target_path, out_path):
    src_img = cv2.imread(src_path)
    dst_img = cv2.imread(target_path)
    src_points, src_shape, src_face = select_face(src_img)
    dst_points, dst_shape, dst_face = select_face(dst_img)

    h, w = dst_face.shape[:2]
    src_mask = mask_from_points(src_face.shape[:2], src_points)
    src_face = apply_mask(src_face, src_mask)

    # Warp
    warped_src_face = warp_image_2d(src_face, transformation_from_points(dst_points, src_points), (h, w, 3))

    ## Mask for blending
    mask = mask_from_points((h, w), dst_points)
    mask_src = np.mean(warped_src_face, axis=2) > 0
    mask = np.asarray(mask*mask_src, dtype=np.uint8)

    warped_src_face = apply_mask(warped_src_face, mask)
    dst_face_masked = apply_mask(dst_face, mask)
    warped_src_face = correct_colours(dst_face_masked, warped_src_face, dst_points)

    # Shrink the mask
    kernel = np.ones((10, 10), np.uint8)
    mask = cv2.erode(mask, kernel, iterations=1)

    # Poisson Blending
    r = cv2.boundingRect(mask)
    center = ((r[0] + int(r[2] / 2), r[1] + int(r[3] / 2)))
    output = cv2.seamlessClone(warped_src_face, dst_face, mask, center, cv2.NORMAL_CLONE)

    x, y, w, h = dst_shape
    dst_img_cp = dst_img.copy()
    dst_img_cp[y:y+h, x:x+w] = output
    output = dst_img_cp

    dir_path = os.path.dirname(out_path)
    if not os.path.isdir(dir_path):
        os.makedirs(dir_path)
    cv2.imwrite(out_path, output)

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='FaceSwap')
    parser.add_argument('--src', required=True, help='Path for source image')
    parser.add_argument('--dst', required=True, help='Path for target image')
    parser.add_argument('--out', required=True, help='Path for storing output images')
    args = parser.parse_args()

    swap_face(args.src, args.dst, args.out)
