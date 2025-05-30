from flask import Blueprint, request, jsonify
from flask_cors import CORS
import json
import subprocess
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain
import re
import markdown 

app1 = Blueprint("app1", __name__)  # Define Blueprint
CORS(app1)

# Load players from JavaScript file
def load_players():
    try:
        with open("players.js", "r", encoding="utf-8") as f:
            content = f.read()

        # Extract JSON array from `players.js`
        match = re.search(r'\[.*\]', content, re.DOTALL)
        if match:
            json_str = match.group(0)
        else:
            raise ValueError("No valid JSON array found in players.js")

        # Convert single quotes to double quotes for valid JSON
        json_str = json_str.replace("'", '"')

        # Ensure all keys are enclosed in double quotes
        json_str = re.sub(r'(?<!")(\b\w+\b)(?=\s*:)', r'"\1"', json_str)
        
        # Fix trailing commas
        json_str = re.sub(r',\s*([}\]])', r'\1', json_str)

        return json.loads(json_str)

    except Exception as e:
        print(f"Error loading players.js: {e}")
        return []

players_data = load_players()


# AI Football Performance Analyzer Class
class FootballPerformanceAnalyzer:
    def __init__(self, role="Coach", player_name=""):
        player = next((p for p in players_data if p["name"].lower() == player_name.lower()), None)
        if not player:
            player_analysis = "Player not found. Please try another name."
        else:
            player_analysis = (
                f"**Player:** {player['full_name']} ({player['nationality']})\n"
                f"**Age:** {player['age']} | **Height:** {player['height_cm']} cm | **Weight:** {player['weight_kgs']} kg\n"
                f"**Best Position:** {player['positions']} | **Overall Rating:** {player['overall_rating']}\n"
                f"**Market Value:** ${player.get('value_in_million', 'N/A')}M | **Release Clause:** ${player.get('release_clause_in_million', 'N/A')}M"
            )

        system_prompt = (
            f"You are a {role} analyzing the performance of football player {player_name}. "
            "Use available stats to provide in-depth insights and suggestions.\n\n"
            f"Here is the player's profile:\n{player_analysis}"
        )

        self.llm = ChatGroq(temperature=0.7, model_name="mistral-saba-24b", groq_api_key="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")
        self.memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
        self.prompt = ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template(system_prompt),
            HumanMessagePromptTemplate.from_template("{text}")
        ])
        self.conversation = LLMChain(llm=self.llm, prompt=self.prompt, memory=self.memory)

    def analyze_player(self, player_name):
        player = next((p for p in players_data if p["name"].lower() == player_name.lower()), None)
        if not player:
            return "Player not found. Please try another name."

        analysis = (
            f"**Player:** {player['full_name']} ({player['nationality']})\n"
            f"**Age:** {player['age']} | **Height:** {player['height_cm']} cm | **Weight:** {player['weight_kgs']} kg\n"
            f"**Best Position:** {player['positions']} | **Overall Rating:** {player['overall_rating']}\n"
            f"**Market Value:** ${player.get('value_in_million', 'N/A')}M | **Release Clause:** ${player.get('release_clause_in_million', 'N/A')}M"
        )

        return analysis

    def process(self, text):
        full_prompt = self.prompt.format(text=text)
        response = self.conversation.invoke({"text": full_prompt})
        return response['text']

@app1.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    player_name = data.get("playerName")
    query = data.get("query")
    role = data.get("role", "Coach")

    analyzer = FootballPerformanceAnalyzer(role=role)
    if query.lower() == "analyze":
        response_text = analyzer.analyze_player(player_name)
    else:
        response_text = analyzer.process(query)

    # Convert markdown to HTML
    response_text = markdown.markdown(response_text, extensions=["fenced_code", "tables"])


    return jsonify({"response": response_text})

