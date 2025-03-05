from flask import Flask
from flask_cors import CORS
from app1 import app1
from app2 import app2

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(app1)
app.register_blueprint(app2)

if __name__ == "__main__":
    app.run(debug=True, port=8000)  # Run both under one server
