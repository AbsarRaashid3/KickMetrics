from flask import Blueprint, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import json
import re
import warnings

app2 = Blueprint("app2", __name__)  # Define Blueprint
CORS(app2)

warnings.filterwarnings("ignore")

# Load the trained model & scaler
model = joblib.load("market_value_model.pkl")
scaler = joblib.load("scaler.pkl")

# Load player data
with open("players.js", "r", encoding="utf-8") as f:
    content = f.read()

# Extract JSON array from players.js
match = re.search(r'\[.*\]', content, re.DOTALL)
if match:
    json_str = match.group(0)
else:
    print(json.dumps({"error": "No player data found"}))
    exit(1)

# Convert to valid JSON format
json_str = json_str.replace("'", '"')
json_str = re.sub(r'(?<!")(\b\w+\b)(?=\s*:)', r'"\1"', json_str)
json_str = re.sub(r',\s*([}\]])', r'\1', json_str)

players = json.loads(json_str)

@app2.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        player_id = data.get("playerId")

        if not player_id:
            return jsonify({"error": "Missing playerId"}), 400

        player_data = next((p for p in players if str(p.get("_id")) == str(player_id) or str(p.get("id")) == str(player_id)), None)

        if not player_data:
            return jsonify({"error": "Player not found"}), 404

        # Extract all 18 features (ensuring they exist with a default of 0)
        features = np.array([
            player_data.get("age", 0),
            player_data.get("overall_rating", 0),
            player_data.get("potential", 0),
            player_data.get("long_shots", 0),
            player_data.get("crossing", 0),
            player_data.get("finishing", 0),
            player_data.get("heading_accuracy", 0),
            player_data.get("short_passing", 0),
            player_data.get("dribbling", 0),
            player_data.get("ball_control", 0),
            player_data.get("acceleration", 0),
            player_data.get("sprint_speed", 0),
            player_data.get("stamina", 0),
            player_data.get("strength", 0),
            player_data.get("vision", 0),
            player_data.get("positioning", 0),
            player_data.get("penalties", 0),
            player_data.get("composure", 0)
        ]).reshape(1, -1)

        print("Extracted features:", features)  # Debugging

        # Scale and predict
        features_scaled = scaler.transform(features)
        predicted_value = np.expm1(model.predict(features_scaled)[0])

        return jsonify({"predicted_value": round(predicted_value, 2)})

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500
