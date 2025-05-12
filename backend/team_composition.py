from flask import Blueprint, request, jsonify
from flask_cors import CORS
import json
import re
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain

app_team = Blueprint("app_team", __name__)
CORS(app_team)

# Load players from players.js
def load_players():
    try:
        with open("players.js", "r", encoding="utf-8") as f:
            content = f.read()
        # Extract JSON array from players.js
        match = re.search(r'\[.*\]', content, re.DOTALL)
        if match:
            json_str = match.group(0)
        else:
            raise ValueError("No valid JSON array found in players.js")
        # Convert single quotes to double quotes and ensure keys are quoted
        json_str = json_str.replace("'", '"')
        json_str = re.sub(r'(?<!")(\b\w+\b)(?=\s*:)', r'"\1"', json_str)
        json_str = re.sub(r',\s*([}\]])', r'\1', json_str)
        return json.loads(json_str)
    except Exception as e:
        print(f"Error loading players.js: {e}")
        return []

players_data = load_players()

# Category mapping functions.
def is_gk(player):
    return "GK" in player.get("positions", "")

def is_defender(player):
    positions = player.get("positions", "")
    for pos in ["CB", "LB", "RB", "LWB", "RWB"]:
        if pos in positions:
            return True
    return False

def is_midfielder(player):
    positions = player.get("positions", "")
    for pos in ["CM", "CDM", "CAM", "LM", "RM"]:
        if pos in positions:
            return True
    return False

def is_forward(player):
    positions = player.get("positions", "")
    for pos in ["ST", "CF", "LW", "RW"]:
        if pos in positions:
            return True
    return False

# Helper: Fallback to fill missing slots with remaining best available players (excluding GK).
def select_players_for_category(candidates, required_count, used_ids):
    selected = []
    if len(candidates) >= required_count:
        selected = candidates[:required_count]
        for p in selected:
            used_ids.add(p.get("_id"))
    else:
        selected = candidates.copy()
        for p in candidates:
            used_ids.add(p.get("_id"))
        missing = required_count - len(selected)
        remaining = [p for p in players_data if p.get("_id") not in used_ids and not is_gk(p)]
        remaining.sort(key=lambda p: p.get("overall_rating", 0), reverse=True)
        for p in remaining:
            if missing <= 0:
                break
            if p not in selected:
                selected.append(p)
                used_ids.add(p.get("_id"))
                missing -= 1
    return selected

# Generate an optimal team composition based on the chosen formation.
# Supports three-part formations (e.g., "4-4-2") and four-part formations (e.g., "4-2-3-1").
def generate_optimal_team(formation, player_type, strategy):
    formation_parts = formation.split("-")
    if len(formation_parts) == 3:
        defenders_count = int(formation_parts[0])
        midfielders_count = int(formation_parts[1])
        forwards_count = int(formation_parts[2])
        formation_type = "3-part"
        extra_info = ""
    elif len(formation_parts) == 4:
        defenders_count = int(formation_parts[0])
        def_mid_count = int(formation_parts[1])
        att_mid_count = int(formation_parts[2])
        forwards_count = int(formation_parts[3])
        midfielders_count = def_mid_count + att_mid_count
        formation_type = "4-part"
        extra_info = f" (Defensive Midfielders: {def_mid_count}, Attacking Midfielders: {att_mid_count})"
    else:
        return None, "Invalid formation format. Use '4-4-2' or '4-2-3-1' formats."

    starting_team = {}
    used_ids = set()

    # Select Goalkeeper.
    gk_candidates = [p for p in players_data if is_gk(p)]
    gk_candidates.sort(key=lambda p: p.get("overall_rating", 0), reverse=True)
    if not gk_candidates:
        return None, "No eligible goalkeeper found."
    starting_team["GK"] = gk_candidates[0]
    used_ids.add(gk_candidates[0].get("_id"))

    # Select Defenders.
    def_candidates = [p for p in players_data if is_defender(p) and p.get("_id") not in used_ids]
    def_candidates.sort(key=lambda p: p.get("overall_rating", 0), reverse=True)
    starting_team["DEF"] = select_players_for_category(def_candidates, defenders_count, used_ids)
    if len(starting_team["DEF"]) < defenders_count:
        return None, "Not enough eligible defenders."

    # Select Midfielders.
    mid_candidates = [p for p in players_data if is_midfielder(p) and p.get("_id") not in used_ids]
    mid_candidates.sort(key=lambda p: p.get("overall_rating", 0), reverse=True)
    starting_team["MID"] = select_players_for_category(mid_candidates, midfielders_count, used_ids)
    if len(starting_team["MID"]) < midfielders_count:
        return None, "Not enough eligible midfielders."

    # Select Forwards.
    fwd_candidates = [p for p in players_data if is_forward(p) and p.get("_id") not in used_ids]
    fwd_candidates.sort(key=lambda p: p.get("overall_rating", 0), reverse=True)
    starting_team["FWD"] = select_players_for_category(fwd_candidates, forwards_count, used_ids)
    if len(starting_team["FWD"]) < forwards_count:
        return None, "Not enough eligible forwards."

    # Select substitutes: top 7 remaining players by overall rating.
    subs_candidates = [p for p in players_data if p.get("_id") not in used_ids]
    subs_candidates.sort(key=lambda p: p.get("overall_rating", 0), reverse=True)
    substitutes = subs_candidates[:7]

    team_info = {
        "starting_team": starting_team,
        "substitutes": substitutes,
        "formationType": formation_type,
        "extraInfo": extra_info
    }
    return team_info, None

# Advanced team analysis using LangChain (ChatGroq).
class TeamCompositionAnalyzer:
    def __init__(self, role="Coach", team_summary=""):
        system_prompt = (
            f"You are a {role} and football strategist. Analyze the following team composition with strategic preference '{role}'. "
            "Provide in-depth insights regarding the team's balance, strengths, weaknesses, tactical fit, and suggestions for improvement.\n\n"
            f"{team_summary}"
        )
        self.llm = ChatGroq(
            temperature=0.7,
            model_name="mistral-saba-24b",
            groq_api_key="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"
        )
        self.memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
        self.prompt = ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template(system_prompt),
            HumanMessagePromptTemplate.from_template("{text}")
        ])
        self.conversation = LLMChain(llm=self.llm, prompt=self.prompt, memory=self.memory)

    def analyze_team(self):
        full_prompt = self.prompt.format(text="Provide your detailed analysis.")
        response = self.conversation.invoke({"text": full_prompt})
        insights = response.get("text", "No insights generated.")

        # Formatting response for better readability
        formatted_insights = insights.replace(". ", ".\n\n")  # Adds line breaks after each sentence
        formatted_insights = re.sub(r"Strengths:", "\n\n**Strengths:**\n", formatted_insights)
        formatted_insights = re.sub(r"Weaknesses:", "\n\n**Weaknesses:**\n", formatted_insights)
        formatted_insights = re.sub(r"Tactical Fit:", "\n\n**Tactical Fit:**\n", formatted_insights)
        formatted_insights = re.sub(r"Suggestions for Improvement:", "\n\n**Suggestions for Improvement:**\n", formatted_insights)
        formatted_insights = re.sub(r"In conclusion,", "\n\n**Conclusion:**", formatted_insights)

        return formatted_insights

# Endpoint to generate team composition.
@app_team.route("/composeTeam", methods=["POST"])
def compose_team():
    data = request.json
    formation = data.get("formation", "4-4-2")
    player_type = data.get("playerType", "balanced")
    strategy = data.get("strategy", "balanced")

    team_result, error_msg = generate_optimal_team(formation, player_type, strategy)
    if not team_result:
        return jsonify({"error": error_msg}), 400

    starting_team = team_result["starting_team"]
    substitutes = team_result["substitutes"]
    extra_info = team_result["extraInfo"]

    starting_players = [starting_team["GK"]] + starting_team["DEF"] + starting_team["MID"] + starting_team["FWD"]
    avg_overall = sum(p.get("overall_rating", 0) for p in starting_players) / len(starting_players)
    avg_speed = sum(p.get("sprint_speed", 0) for p in starting_players) / len(starting_players)
    avg_strength = sum(p.get("strength", 0) for p in starting_players) / len(starting_players)

    summary_lines = [f"Formation: GK, {formation}{extra_info}"]
    summary_lines.append("Starting XI:")
    summary_lines.append(f"GK: {starting_team['GK'].get('full_name', starting_team['GK'].get('name', 'Unknown'))} (Overall: {starting_team['GK'].get('overall_rating')})")
    summary_lines.append("Defenders:")
    for p in starting_team["DEF"]:
        summary_lines.append(f" - {p.get('full_name', p.get('name', 'Unknown'))} (Overall: {p.get('overall_rating')})")
    summary_lines.append("Midfielders:")
    for p in starting_team["MID"]:
        summary_lines.append(f" - {p.get('full_name', p.get('name', 'Unknown'))} (Overall: {p.get('overall_rating')})")
    summary_lines.append("Forwards:")
    for p in starting_team["FWD"]:
        summary_lines.append(f" - {p.get('full_name', p.get('name', 'Unknown'))} (Overall: {p.get('overall_rating')})")
    summary_lines.append(f"Average Overall: {avg_overall:.1f}, Average Speed: {avg_speed:.1f}, Average Strength: {avg_strength:.1f}")
    summary_lines.append("\nSubstitutes:")
    for p in substitutes:
        summary_lines.append(f" - {p.get('full_name', p.get('name', 'Unknown'))} (Overall: {p.get('overall_rating')})")
    team_summary = "\n".join(summary_lines)

    analyzer = TeamCompositionAnalyzer(role=strategy, team_summary=team_summary)
    advanced_insights = analyzer.analyze_team()

    return jsonify({
        "formation": formation,
        "playerType": player_type,
        "strategy": strategy,
        "starting_team": starting_team,
        "substitutes": substitutes,
        "basic_summary": team_summary,
        "advanced_insights": advanced_insights
    })

#


# New endpoint to update insights for a modified team.
@app_team.route("/updateInsights", methods=["POST"])
def update_insights():
    data = request.json
    team_summary = data.get("teamSummary", "")
    strategy = data.get("strategy", "balanced")
    analyzer = TeamCompositionAnalyzer(role=strategy, team_summary=team_summary)
    advanced_insights = analyzer.analyze_team()
    return jsonify({"advanced_insights": advanced_insights})

# Endpoint to return all players (for candidate selection).
@app_team.route("/allPlayers", methods=["GET"])
def all_players():
    return jsonify(players_data)
