import numpy as np
import pathlib
import dlib
import os

# Find path to shape predictor
for base_path in ['.', '..', '../..', '../../../']:
    try:
        print('face_points_detection: search glob path {}'.format(base_path))
        PREDICTOR_PATH = os.path.abspath(str(sorted(pathlib.Path(base_path).glob('**/*.dat'))[0]))
        print('face_points_detection: model found at ', PREDICTOR_PATH)
        predictor = dlib.shape_predictor(PREDICTOR_PATH)
        break
    except:
        continue

# Face and points detection
def face_points_detection(img, bbox:dlib.rectangle):

    # Get the landmarks/parts for the face in box d.
    shape = predictor(img, bbox)

    # loop over the 68 facial landmarks and convert them
    # to a 2-tuple of (x, y)-coordinates
    coords = np.asarray(list([p.x, p.y] for p in shape.parts()), dtype=np.int)

    # return the array of (x, y)-coordinates
    return coords
