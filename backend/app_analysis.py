from flask import Blueprint, request, jsonify
from langchain_groq import ChatGroq
from langchain.memory import ConversationBufferMemory
from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from langchain.chains import LLMChain
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app_analysis = Blueprint("app_analysis", __name__)

system_prompt = "Analyze the impact of the following football player metric adjustments and explain how they affect overall performance."

# Use environment variable for API key
groq_api_key = "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"

if not groq_api_key:
    raise ValueError("Missing Groq API key! Set GROQ_API_KEY in your .env file.")

# Initialize LLM model
llm = ChatGroq(temperature=0.7, model_name="mixtral-8x7b-32768", groq_api_key=groq_api_key)
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
prompt = ChatPromptTemplate.from_messages([
    SystemMessagePromptTemplate.from_template(system_prompt),
    HumanMessagePromptTemplate.from_template("{text}")
])
conversation = LLMChain(llm=llm, prompt=prompt, memory=memory)

@app_analysis.route("/analyze-impact", methods=["POST"])
def analyze_impact():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "Invalid input, JSON expected"}), 400
        
        player_name = data.get("player_name", "Unknown Player")
        metric_changes = data.get("metrics", {})

        if not metric_changes:
            return jsonify({"error": "No metric changes provided"}), 400

        input_text = f"Player: {player_name}\nMetric Changes:\n" + "\n".join(
            [f"{metric}: {change}" for metric, change in metric_changes.items()]
        )

        response = conversation.run(input_text)

        return jsonify({"analysis": response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
