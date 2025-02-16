const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PythonShell } = require('python-shell');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/predict', async (req, res) => {
    console.log("Received /predict request with body:", req.body);
    const playerId = req.body.playerId;
    if (!playerId) {
      console.log("No playerId provided");
      return res.status(400).json({ error: "No playerId provided" });
    }

    let options = {
        mode: 'json',
        pythonOptions: ['-u'],
        scriptPath: './',
        args: [playerId],
        env: { PYTHONWARNINGS: "ignore" }
    };

    console.log("Invoking PythonShell...");
    PythonShell.run('predict.py', options, (err, results) => {
        console.log("PythonShell callback triggered.");  // <--- Important
        if (err) {
            console.error("PythonShell error:", err);
            return res.status(500).json({ error: err.message });
        }
        console.log("PythonShell results:", results);
        res.json({ predicted_value: results[0] });
    });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
