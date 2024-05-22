from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from units import unit, scaled_unit
from units.predefined import define_units
define_units()

genai.configure(api_key="")

# Set up generation configuration for the model
generation_config = {
  "temperature": 1,         # Controls the randomness of generation
  "top_p": 0.95,            # Controls diversity
  "top_k": 0,               # Controls diversity
  "max_output_tokens": 8192 # Maximum number of tokens generated
}

# Initialize the GenerativeAI model
model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest", generation_config=generation_config)

# Start a conversation with an empty history
convo = model.start_chat(history=[])

app = Flask(__name__)
CORS(app)

equivalents = {
    "skyTower": scaled_unit('skyTower', 'm', 328),  # Example height for Sky Tower
    "SaturnV": scaled_unit('SaturnV', 'm', 111),    # Example height for Saturn V
    "airbus": scaled_unit('airbus', 'tonne', 50),   # Example weight for Airbus
    "elephant": scaled_unit('elephant', 'tonne', 4.5),  # Example weight for Elephant
    "ruler": scaled_unit('ruler', 'cm', 30),        # Example length for Ruler
    "shark": scaled_unit('shark', 'ft', 25)         # Example length for Shark
}

@app.route('/convert/<conversion>', methods=['POST'])
def convert_units(conversion):
    data = request.json
    input_value = data['value']
    try:
        unit1_str, unit2_str = conversion.split('_to_')
        unit1 = unit(unit1_str)
        unit2 = unit(unit2_str)
        result = unit2(unit1(input_value))
        return jsonify({"result": str(result)})
    except Exception as e:
        print(f"Error Occurred: {e}")
        return jsonify({"error": f"Invalid conversion type or value: {e}"}), 400

@app.route('/equivalent', methods=['POST'])
def equivalent_units():
    data = request.json
    input_value = data['value']
    input_unit = data['unit']
    equivalent_type = data['equivalentType']

    try:
        input_quantity = unit(input_unit)(input_value)
        equivalent_unit = equivalents[equivalent_type]

        result = input_quantity / equivalent_unit(1)
        result_str = f"{result:.2f} {equivalent_type}(s)"
        
        return jsonify({"result": result_str})
    except Exception as e:
        print(f"Error Occurred: {e}")
        return jsonify({"error": f"Invalid equivalent type or value: {e}"}), 400

@app.route('/realitycheck', methods=['POST'])
def RealityCheck():
    data = request.json
    query = data.get('query')

    try:
        convo.send_message(f"Is the following prompt realistic?: {query}? Explain it to a kid why/why not and use comparisons so the user can better understand. make sure to have a bold formatted conclusion"),
        return jsonify({'result': convo.last.text})
    except Exception as e:  
        return jsonify({'result': f"Error calling Gemini API: {str(e)}"})

if __name__ == '__main__':
    app.run(debug=True)