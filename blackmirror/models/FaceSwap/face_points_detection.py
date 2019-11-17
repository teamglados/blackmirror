import numpy as np
import pathlib
import dlib
import os

from blackmirror.utils import search_path

PREDICTOR_PATH = search_path('**/faceswap_cache/model/*.dat')
predictor = dlib.shape_predictor(PREDICTOR_PATH)

# Face and points detection
def face_points_detection(img, bbox:dlib.rectangle):

    # Get the landmarks/parts for the face in box d.
    shape = predictor(img, bbox)

    # loop over the 68 facial landmarks and convert them
    # to a 2-tuple of (x, y)-coordinates
    coords = np.asarray(list([p.x, p.y] for p in shape.parts()), dtype=np.int)

    # return the array of (x, y)-coordinates
    return coords
