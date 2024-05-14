# Import necessary libraries
from flask import Flask, request, jsonify  # Import Flask framework for creating web applications, and modules for handling requests and JSON responses
from flask_cors import CORS  # Import CORS module for enabling Cross-Origin Resource Sharing
import pint  # Import the Pint library for handling physical quantities and units
import google.generativeai as genai  # Import the GenerativeAI module from Google's library for AI-powered text generation
import sys
sys.path.append('Reality Check\.gitignore')  # Add the config file's directory to Python's search path
import config


#For api to work you must to into your terminal and do the following:
#pip install flask
#pip install flask-cors
#pip install pint
#pip install google-generativeai
#You also need python installed, if installed python does not work install python lastest version from microsoft store

# Configure the GenerativeAI API with your API key
genai.configure(api_key=config.GEMINI_API_KEY)

# Set up generation configuration for the model
generation_config = {
  "temperature": 1,         # Controls the randomness of generation
  "top_p": 0.95,            # Controls diversity
  "top_k": 0,               # Controls diversity
  "max_output_tokens": 8192 # Maximum number of tokens generated
}

# Initialize the GenerativeAI model
model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                              generation_config=generation_config)

# Start a conversation with an empty history
convo = model.start_chat(history=[])

# Initialize Flask app
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) for all routes
CORS(app)  

# Initialize Unit Registry for unit conversion
ureg = pint.UnitRegistry()

# Route for unit conversion
@app.route('/convert_units', methods=['POST'])
def convert():
    # Get the query from the request body
    data = request.get_json()
    query = data.get('query')

    # Perform unit conversion using pint
    try:
        converted = ureg(query).to("minutes")
        result = {'magnitude': converted.magnitude, 'unit': str(converted.units)}
        return jsonify({'result': result})
    except pint.UndefinedUnitError:
        return jsonify({'result': 'Invalid unit'})
    
# Route for reality check using Gemini
@app.route('/Reality_check', methods=['POST'])
def RealityCheck():
    data = request.get_json()
    query = data.get('query')

    # Use Gemini for understanding and a basic reality check
    try:
        convo.send_message(f"Is the following prompt realistic?: {query}? Explain why/why not and use comparisons so the user can better understand. make sure to have a bold formatted conclusion and when showing equations using multiplication the letter x give answer with absolutely no formatting or astricks' or /n"),
        max_tokens=150
        #print(convo.last.text)  #so the user can better understand. make sure to have a bold formatted conclusion  
        return jsonify({'result': convo.last.text})

    except Exception as e:  
        return jsonify({'result': f"Error calling Gemini API: {str(e)}"})
        
# Run the app
if __name__ == '__main__':
    app.run(port=7777)
