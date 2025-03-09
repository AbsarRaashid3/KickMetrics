import asyncHandler from '../middleware/asyncHandler.js';
import FavPlayers from '../models/FavPlayersModel.js';

const getLeagues = asyncHandler(async (req, res) => {
  try {
    const response = await fetch('https://api.sportmonks.com/v3/football/leagues?api_token=Z4F7nheHrMtdygK8bJ5etCFJlXqEGjRKIECSlZzsnxJQImPERjnsVobvbQze&include=currentSeason;upcoming;', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leagues data', error: error.message });
  }
});

const getCoaches = asyncHandler(async (req, res) => {
  try {
    const response = await fetch('https://api.sportmonks.com/v3/football/coaches?api_token=Z4F7nheHrMtdygK8bJ5etCFJlXqEGjRKIECSlZzsnxJQImPERjnsVobvbQze&include=teams;player;country;', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching coaches data', error: error.message });
  }
});

const getScouts = asyncHandler(async (req, res) => {
  try {
    const response = await fetch(`https://api.sportmonks.com/v3/football/transfers/latest?api_token=Z4F7nheHrMtdygK8bJ5etCFJlXqEGjRKIECSlZzsnxJQImPERjnsVobvbQze&include=player;fromTeam;toTeam`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transfers data', error: error.message });
  }
});

const getFavorites = asyncHandler(async (req, res) => {
  try {
    const favorites = await FavPlayers.find({ user: req.user._id });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving favorites', error: error.message });
  }
});

const addFavorite = asyncHandler(async (req, res) => {
  const { playerId } = req.body; 
  const favorite = await FavPlayers.create({
    user: req.user._id,
    playerId
  });
  res.status(201).json(favorite);
});

const removeFavorite = asyncHandler(async (req, res) => {
  const playerId = Number(req.params.playerId); // Convert to number
  const favorite = await FavPlayers.findOneAndDelete({ 
    user: req.user._id,
    playerId: playerId 
  });

  if (favorite) {
    res.json({ message: 'Favorite removed' });
  } else {
    res.status(404);
    throw new Error('Favorite not found');
  }
});


export {getLeagues,getCoaches,getFavorites,addFavorite,removeFavorite,getScouts};
