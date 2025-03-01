import asyncHandler from '../middleware/asyncHandler.js';
import Player from '../models/PlayersModel.js';

//@desc Fetch all players
//@route GET /api/players
//@access Public
const getPlayers = asyncHandler(async (req, res) => {
  const players = await Player.find({});
  console.log("i am in player controller, in getPlayers");
  res.json(players);
});

//@desc Fetch player
//@route GET /api/players/:id
//@access Public
const getPlayerByID = asyncHandler(async (req, res) => {
    const player = await Player.findById(req.params.id);
    if(player){
      console.log("i am in player controller, in getPlayerByID");
        return res.json(player);
    }
    res.status(404);
    throw new Error('Player not found');
    
  });

export {getPlayers, getPlayerByID};