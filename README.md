# ⚽ Kick Metrics – AI-Powered Football Analytics Platform



Kick Metrics is a full-stack football analytics and talent management platform powered by AI. It enables scouts, coaches, players, and administrators to analyze performance metrics, build optimal lineups, simulate outcomes, and track live data — all in a single intuitive interface.

---

## 🚀 Features

### 🎯 Core Functionalities
- 🔍 **Player Exploration & Stats**  
  View comprehensive player data including attributes, physical stats, positions, and performance ratings.

- 📊 **AI-Powered Performance Simulation (What-If)**  
  Adjust player metrics to simulate performance changes. Visualize before/after results with interactive radar, bar, and line charts.

- 🧠 **Advanced Team Composition Engine**  
  Generate optimal starting XI and substitutes using AI strategies (balanced, offensive, defensive).

- 📈 **Market Value Prediction**  
  Predict a player's market value using ML models based on performance, age, physical metrics, and more.

- 🤖 **AI-Based Insight Generation**  
  Analyze the strengths and weaknesses of your selected team automatically using NLP-based summarization.

- ⭐ **Favorites Dashboard**  
  Users can select favorite players and view updates, statistics, and personalized tracking.

- 🔐 **Role-Based Dashboards**  
  - **Admin**: Player CRUD, user management  
  - **Coach**: Tactical tools, simulations  
  - **Scout**: Talent identification, comparison  
  - **User**: Player insights, favorites, dashboards

- 🔴 **Live Feed via Socket.io**  
  Real-time updates on match schedules and league statuses.

---

## 🧩 Tech Stack

| Frontend                     | Backend (Node.js)         | AI/ML Backend (Python)      |
|-----------------------------|---------------------------|-----------------------------|
| React.js                    | Express.js                | FastAPI / Flask             |
| Redux Toolkit & RTK Query   | RESTful APIs              | Scikit-learn, Pandas        |
| Chart.js                    | Socket.io (Real-Time)     | Transformers / NLP Models   |
| React Bootstrap             | JWT Auth, Role Middleware |                             |
| React Router DOM            | MongoDB (assumed)         |                             |

---

## 📁 Project Structure

```
kick-metrics/
├── frontend/                # React app (UI, Redux, Routing)
│   ├── assets/              # Images, stylesheets, pitch backgrounds
│   ├── components/          # Reusable components (Header, Footer, Modals, Charts, etc.)
│   ├── screens/             # Route-based pages (TeamC, WhatIf, Dashboard, etc.)
│   ├── redux/               # Redux slices and store
│   ├── utils/               # Validation logic, socket config, constants
│   ├── App.js               # App layout and routes (with <Outlet />)
│   ├── index.js             # React entry point and router setup
│   └── ...
│
├── backend/                 # Node.js Express server
│   ├── routes/              # Express routes (e.g., players, users, external API)
│   ├── controllers/         # Logic for each route
│   ├── models/              # Mongoose models (assumed)
│   ├── socket.js            # Socket.IO setup
│   ├── main.py              # Python AI service (FastAPI/Flask)
│   ├── requirements.txt     # Python dependencies
│   └── ...
│
├── .env                     # Environment variables
├── package.json             # Project scripts (frontend/backend)
└── README.md                # Project documentation
```

## ⚙️ Getting Started
### 📌 Prerequisites
- Node.js (v18+)
- Python 3.9+
- MongoDB
- pip / virtualenv


## 🚧 Installation & Setup
### 🔹 Frontend
```
cd frontend
npm install
npm start
```
### 🔹 Backend 
```
cd backend
npm install
npm start
```
### 🔹 Backend (Python - AI Services)
```
cd backend
# Optional: python -m venv venv && source venv/bin/activate
python main.py
```
**Make sure both http://localhost:8000 (Node backend) and http://localhost:5000 (Python AI backend) are running.**



## 🛡️ Authentication & Roles
- JWT-based authentication with role-specific dashboards:
- admin, coach, scout, user
- Protected routes using React Router and Redux state
- Password reset, register, and login functionality


## 🌐 API Integration
## 🧠 AI Endpoints (Python)
| Endpoint              | Description                           |
| --------------------- | ------------------------------------- |
| `/api/analyze-impact` | AI-based What-If performance analysis |
| `/api/updateInsights` | NLP team insight generation           |
| `/api/predict-value`  | Market value prediction               |


## ⚙️ Backend REST Endpoints (Node)
| Endpoint           | Method | Description                 |
| ------------------ | ------ | --------------------------- |
| `/api/players`     | GET    | List all players            |
| `/api/users`       | GET    | Get user dashboard          |
| `/api/composeTeam` | POST   | Generate team composition   |
| `/api/favorites`   | POST   | Add/remove favorite players |


## 📊 Screens Overview
| Screen                  | Description                       |
| ----------------------- | --------------------------------- |
| `LandingScreen`         | Welcome and onboarding            |
| `HomeScreen`            | Browse and filter players         |
| `PlayerDetails`         | View full player statistics       |
| `TeamCompositionScreen` | Generate & edit optimal XI        |
| `UserDashboard`         | Track favorites, upcoming matches |
| `WhatIfSimulator`       | Simulate performance adjustments  |
| `MarketValuePrediction` | Predict transfer value of players |
| `AdminPanel`            | Manage player records             |
| `EditUserProfile`       | Update user credentials/profile   |


## 📸 UI Highlights
- Custom pitch layout with player positions
- Editable team lineup with real-time insights
- Stunning AI-generated summaries via Markdown
- Animated sections and smooth transitions
- Real-time sockets for live data


## 🔒 Security & Validation
- Field-level validation for all player attributes (age, height, nationality, etc.)
- Email & password validation (regex + strength)
- File upload validation (image type & size)
- Protected admin-only routes

## 📌 Environment Configuration
### .env (frontend):
```
REACT_APP_BACKEND_URL=http://localhost:8000
REACT_APP_PYTHON_API=http://localhost:5000
```

## 🧑‍💻 Authors
Built with ❤️ by Absar and Habiba and Team Kick Metrics
Special thanks to the open-source community and all contributors.

## 🌐 Connect
🔗 GitHub: github.com/absarraashid3/kick-metrics
