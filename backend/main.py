from flask import Flask
from flask_cors import CORS
from app1 import app1
from app2 import app2
from team_composition import app_team
from wiki import wiki
from app_analysis import app_analysis  # Import the new blueprint

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(app1)
app.register_blueprint(app2)
app.register_blueprint(app_team, url_prefix="/api")
app.register_blueprint(wiki)
app.register_blueprint(app_analysis, url_prefix="/api")  # Register the new blueprint

if __name__ == "__main__":
    app.run(debug=True, port=8000)  # Run everything under one server
