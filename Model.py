import smtplib
import ssl
from email.message import EmailMessage
from tkinter import *
import os.path
from os.path import exists
import socket
import platform
from datetime import datetime
from tkinter import scrolledtext  # For Beta Version the password is always "Pass"
import os
import time
import datetime
import requests
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import json
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from tkinter import *
import tkinter as tk
import win32gui
from PIL import ImageGrab, Image
from PIL import Image
import numpy as np
from keras.models import load_model
import io
import base64
from PIL import Image
import numpy as np
from keras.models import load_model
import matplotlib
matplotlib.use('Agg')  
import matplotlib.pyplot as plt

#Flask Communication------------------------------------------------------------------------------------------------------------

#cd C:\Users\Big_T\OneDrive\Desktop\VsCode\Number Recognition
#set FLASK_APP=Model.py
#set FLASK_ENV=development
#flask run --port=5600

app = Flask(__name__)

CORS(app)

@app.route('/Prediction', methods=['POST'])
def prediction_data():
    data = request.get_json()  

    if (data == ""):
        ""
    else:
        GrayScale_Img = data['GSImg']
       
        model = load_model('C:\\Users\\Big_T\\OneDrive\\Desktop\\VsCode\\Number Recognition\\OldFiles\\mnist.h5')
     
    def predict_digit(img_b64):
        # decode base64 img
        img_data = base64.b64decode(img_b64)
        # convert bytes to img
        img = Image.open(io.BytesIO(img_data))
        # resize image to 28x28 pixels
        img = img.resize((28, 28))
        # convert rgb to grayscale
        img = img.convert('L')
        img = np.array(img)
        # reshaping to support model input and normalizing
        img = img.reshape(1, 28, 28, 1)
        img = img / 255.0
        # display processed img
        plt.imshow(img.squeeze(), cmap='gray')
        plt.show()
        # predicting class
        res = model.predict([img])[0]
        return int(np.argmax(res)), float(np.max(res))
        
    prediction, confidence = predict_digit(GrayScale_Img)
    print(prediction, confidence)
        
    result = {"Prediction": prediction, "Confidence": confidence}
    return jsonify(result)
if __name__ == '__main__':
    app.run(port=5600)


#Flask Communication------------------------------------------------------------------------------------------------------------


























