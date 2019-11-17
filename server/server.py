from sanic.log import logger
from sanic import Sanic, response
from uuid import uuid4
import base64
import time
import os

from blackmirror.models.FaceSwap.main import swap_face
from blackmirror.utils import *

SOURCE_MEME_PATH = search_path('**/template_cache/meme')

upload_path = './uploads'
app = Sanic()

def create_filename():
    return os.path.join(upload_path, str(uuid4()) + '.jpg')

def store_base64_image(img_str):
    imgdata = base64.b64decode(img_str)
    filename = create_filename()
    with open(filename, "wb") as f:
        f.write(imgdata)
    return filename

@app.route('/ping')
async def ping(request):
    return response.json({
        'parsed': True,
        'args': request.args,
        'url': request.url,
        'query_string': request.query_string
    })

@app.route('/meme', methods=['POST', 'PUT'])
async def upload(request):

    # Create upload folder if doesn't exist
    if not os.path.exists(upload_path):
        os.makedirs(upload_path)

    payload = request.json

    meme_path = os.path.join(SOURCE_MEME_PATH, random.choice(list(filter(lambda x: 'jpg' in x, os.listdir(SOURCE_MEME_PATH)))))
    image_path = store_base64_image(payload['image'])
    target_path = create_filename()

    print(image_path, meme_path, target_path)
    swap_face(image_path, meme_path, target_path)

    return response.json({'url': '/public/' + os.path.basename(target_path)})

app.static('/public', upload_path)

if __name__ == '__main__':
    print(SOURCE_MEME_PATH)
    app.run(
        debug=True,
        access_log=True,
        host='0.0.0.0',
        port=5000
    )
