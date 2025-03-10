import asyncHandler from '../middleware/asyncHandler.js';
import Player from '../models/PlayersModel.js';
import axios from 'axios';

// Fetch image from Wikipedia (if not stored)
const fetchWikiImage = async (playerName) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/fetch-image", {
      playerName,
    });
    return response.data.image_url || null;
  } catch (error) {
    console.error(`Error fetching image for ${playerName}`);
    return null;
  }
};
//@desc Fetch all players
//@route GET /api/players
//@access Public
const getPlayers = asyncHandler(async (req, res) => {
  const players = await Player.find({}); //.limit(100)
  res.json(players);
});

//@desc Fetch player by ID
//@route GET /api/players/:id
//@access Public
const getPlayerByID = asyncHandler(async (req, res) => {
    const player = await Player.findById(req.params.id);
    if(player){
        return res.json(player);
    }
    res.status(404);
    throw new Error('Player not found');
    
  });

  
//@desc Update player image
//@route PUT /api/players/:id/update-image
const updatePlayerImage = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (player) {
    player.image_url = req.body.image_url || player.image_url;
    await player.save();
    res.json({ message: 'Player image updated', image_url: player.image_url });
  } else {
    res.status(404);
    throw new Error('Player not found');
  }
});

export {getPlayers, getPlayerByID, updatePlayerImage};