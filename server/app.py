
from dotenv import load_dotenv
from flask import ( render_template,request, jsonify)
from flask import Flask
from flask_cors import CORS, cross_origin
from keras.models import load_model
from keras.applications.resnet50 import preprocess_input
import os
from keras.preprocessing import image
import numpy as np


load_dotenv()

app = Flask(__name__, static_folder='../client/build/', static_url_path='/')

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER'] = os.path.join('static/images')

@app.route('/')
def index():
    return app.send_static_file('index.html')
#, flask_token="Hello world"


@app.route('/api',methods=['GET'])
def api():
    player_id ='d'
   
    return{
        'userid':'1234',
        'name':player_id,
    }
@app.route('/api/uploadfile', methods=['GET', 'POST'])
@cross_origin()
def add_message():
    file = request.data
    f = open("upload.png", "wb")
    file_path=os.path.join(app.config['UPLOAD_FOLDER'],'upload.png')
    f.write(file)
    f.close()
    img = image.load_img('upload.png', target_size=(128, 128))
    image_classifier = load_model('./cat_dog_classifier_v1.h5')
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    class_labels = {0: 'Dog', 1: 'Cat'}
    prediction = image_classifier.predict_classes(x)
    percent_values = prediction.tolist()   
    guess = class_labels[prediction[0][0]] 
    print(percent_values)  
    print(guess)
    
    return{
        'prediction':guess
        
    }

if __name__ == '__main__':
    app.run(port=(os.getenv('PORT') if os.getenv('PORT') else 8000), debug=False)