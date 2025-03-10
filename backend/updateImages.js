import mongoose from "mongoose";
import Player from "./models/PlayersModel.js";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

// Function to connect to MongoDB with retry logic
const connectWithRetry = () => {
  console.log("Connecting to MongoDB...");
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => {
      console.error("❌ MongoDB connection failed, retrying in 5s...", err);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry(); // Start connection process

// Function to fetch Wikipedia image
const fetchWikiImage = async (playerName) => {
  try {
    console.log(`🔍 Fetching image for: ${playerName}`);
    const response = await axios.post("http://127.0.0.1:8000/fetch-image", {
      playerName,
    });
    console.log(`✅ Image found: ${response.data.image_url}`);
    return response.data.image_url || null;
  } catch (error) {
    console.error(`⚠️ Error fetching image for ${playerName}:`, error.message);
    return null;
  }
};

// Function to update player images in MongoDB
const updatePlayerImages = async () => {
  try {
    const players = await Player.find({});
    console.log(`📋 Found ${players.length} players`);

    for (let player of players) {
      if (!player.image_url) {
        console.log(`🖼 Updating image for: ${player.name}`);
        const imageUrl = await fetchWikiImage(player.name);
        if (imageUrl) {
          player.image_url = imageUrl;
          await player.save();
          console.log(`✅ Image updated for: ${player.name}`);
        } else {
          console.log(`❌ No image found for: ${player.name}`);
        }
      }
    }
  } catch (error) {
    console.error("❌ Error updating player images:", error);
  } finally {
    mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
  }
};

// Wait for MongoDB connection before running the update function
mongoose.connection.once("open", () => {
  console.log("🚀 Running image update...");
  updatePlayerImages();
});
