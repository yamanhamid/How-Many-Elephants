from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/convert/celsius_to_fahrenheit', methods=['POST'])
def convert_celsius_to_fahrenheit():
    data = request.json
    result = celsius_to_fahrenheit(data['celsius'])
    return jsonify({"fahrenheit": result})

@app.route('/convert/fahrenheit_to_celsius', methods=['POST'])
def convert_fahrenheit_to_celsius():
    data = request.json
    result = fahrenheit_to_celsius(data['fahrenheit'])
    return jsonify({"celsius": result})

@app.route('/convert/kilometers_to_meters', methods=['POST'])
def convert_kilometers_to_meters():
    data = request.json
    result = kilometers_to_meters(data['kilometers'])
    return jsonify({"meters": result})

@app.route('/convert/meters_to_kilometers', methods=['POST'])
def convert_meters_to_kilometers():
    data = request.json
    result = meters_to_kilometers(data['meters'])
    return jsonify({"kilometers": result})

@app.route('/convert/mps_to_kmh', methods=['POST'])
def convert_mps_to_kmh():
    data = request.json
    result = MPS_to_KMH(data['mps'])
    return jsonify({"kmh": result})

@app.route('/convert/kmh_to_mps', methods=['POST'])
def convert_kmh_to_mps():
    data = request.json
    result = KMH_to_MPS(data['kmh'])
    return jsonify({"mps": result})

def celsius_to_fahrenheit(C):
    return (C * 9/5) + 32

def fahrenheit_to_celsius(F):
    return (F - 32) * 5/9

def kilometers_to_meters(K):
    return K * 1000

def meters_to_kilometers(M):
    return M / 1000

def MPS_to_KMH(M):
    return M * 3.6

def KMH_to_MPS(K):
    return K / 3.6

if __name__ == '__main__':
    app.run(debug=True)
