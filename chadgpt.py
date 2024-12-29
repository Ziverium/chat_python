from openai import OpenAI
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
from flask_cors import CORS
# Replace 'your-api-key' with your actual API key

# Load environment variables from .env file
load_dotenv()

# Retrieve API key from environment variables
api_key = os.getenv("OPENAI_API_KEY")

# Test the API key# Load environment variables from .env file
client = OpenAI(
    # This is the default and can be omitted
    api_key=api_key,
)

app = Flask(__name__)

CORS(app)  # Enable CORS for all routes
# Normal Function 
def chat_incept(prompt):
    chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": prompt,
        }
    ],
    model="gpt-3.5-turbo",
    )

    print(chat_completion.choices[0].message.content)
    return chat_completion.choices[0].message.content
# Normal Function 
@app.route('/chad_gpt', methods=['POST'])
def chad_gpt():
    try:
        # Get the user's message from the request
        data = request.json
        user_message = data.get('message', '')

        if not user_message:
            return jsonify({'error': 'Message is required'}), 400

        # Generate a reply using OpenAI ChatGPT
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
        {
            "role": "user",
            "content": user_message,
        }
    ]
        )

        reply = response.choices[0].message.content

        # Return the response as JSON
        return jsonify({'reply': reply})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    host = os.getenv("FLASK_HOST", "0.0.0.0")
    port = int(os.getenv("FLASK_PORT", 80))
    app.run(host=host, port=port)