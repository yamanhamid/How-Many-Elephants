from flask import Flask, request, jsonify 
from flask_cors import CORS
import pint
import google.generativeai as genai 

#For api to work you must to into your terminal and do the following:
#pip install flask
#pip install flask-cors
#pip install pint
#pip install google-generativeai
#You also need python installed, if installed python does not work install python lastest version from microsoft store



genai.configure(api_key="AIzaSyDqL4uMB8tpcrEU6xVBrH5RhX8YJAcs5xk")

# Set up the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 0,
  "max_output_tokens": 8192,
}



model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                              generation_config=generation_config,)

convo = model.start_chat(history=[
])


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

ureg = pint.UnitRegistry()


@app.route('/convert_units', methods=['POST'])
def convert():
    # Get the query from the request body
    data = request.get_json()
    query = data.get('query')

    # Perform unit conversion using pint
    try:
        converted = ureg(query).to_base_units()
        result = {'magnitude': converted.magnitude, 'unit': str(converted.units)}
        return jsonify({'result': result})
    except pint.UndefinedUnitError:
        return jsonify({'result': 'Invalid unit'})
    
    
#convo.send_message("write me a story about monkeys")
#print(convo.last.text)

@app.route('/Reality_check', methods=['POST'])
def RealityCheck():
    data = request.get_json()
    query = data.get('query')

    # Use Gemini for understanding and a basic reality check
    try:
        
        convo.send_message(f"Is this a realistic quantity: {query}? Explain. without any formatting and no asterisks"),
        max_tokens=150
        
        #gemini_explanation = response[0].text
        return jsonify({'result': convo.last.text})

    except Exception as e:  
        return jsonify({'result': f"Error calling Gemini API: {str(e)}"})
        
if __name__ == '__main__':
    app.run(port=7777)
