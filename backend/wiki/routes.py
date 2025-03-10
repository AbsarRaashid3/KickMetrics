import requests
import re
from flask import Blueprint, request, jsonify

wiki = Blueprint("wiki", __name__)

WIKI_API_URL = "https://en.wikipedia.org/w/api.php"

def clean_player_name(player_name):
    # Remove initial letters like L.Messi → Messi
    name = re.sub(r'^[A-Za-z]\.', '', player_name).strip()
    return name.split(" ")[-1]  # Use the last word (usually the surname)

def is_valid_image(image_url):
    # Filter out flags, logos, or coat of arms
    bad_keywords = ["Flag_of", "Coat_of_Arms", "logo", "emblem"]
    file_ext = image_url.split(".")[-1].lower()

    # Allow only jpg, jpeg, png
    valid_extensions = ["jpg", "jpeg", "png"]

    return (
        any(ext in file_ext for ext in valid_extensions)
        and not any(keyword in image_url for keyword in bad_keywords)
    )

@wiki.route("/fetch-image", methods=["POST"])
def fetch_wiki_image():
    try:
        data = request.json
        player_name = data.get("playerName")

        if not player_name:
            return jsonify({"error": "Player name is required"}), 400

        clean_name = clean_player_name(player_name)

        search_params = {
            "action": "query",
            "format": "json",
            "list": "search",
            "srsearch": f"{clean_name} football player",
        }
        search_response = requests.get(WIKI_API_URL, params=search_params).json()
        
        search_results = search_response["query"]["search"]
        if not search_results:
            return jsonify({"error": "Player not found"}), 404

        # Loop through search results to find a valid image
        for result in search_results:
            page_title = result["title"]
            image_params = {
                "action": "query",
                "format": "json",
                "titles": page_title,
                "prop": "pageimages",
                "pithumbsize": 400,
            }
            image_response = requests.get(WIKI_API_URL, params=image_params).json()
            page = list(image_response["query"]["pages"].values())[0]
            image_url = page.get("thumbnail", {}).get("source")

            if image_url and is_valid_image(image_url):
                return jsonify({"image_url": image_url})

        return jsonify({"error": "No valid image found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500