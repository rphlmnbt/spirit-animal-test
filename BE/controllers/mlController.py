import json

from flask_restful import request
from __main__ import app
import numpy as np
from services.mlService import MLService


@app.route('/ml', methods=['POST'])
def predict():
    ml = MLService()
    json = request.json
    answers = json["answers"]
    result = ml.predict(answers)
    return {'result': result.tolist()}, 200  # return data with 200 OK


@app.route('/ml/probability', methods=['POST'])
def predict_probability():
    ml = MLService()
    json = request.json
    answers = json["answers"]
    probabilities = ml.prediction_probability(answers)
    return {'probabilities': probabilities.tolist()}, 200  # return data with 200 OK


