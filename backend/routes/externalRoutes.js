import express from 'express';
import { protect} from '../middleware/authMiddleware.js';
import {getLeagues,getCoaches,getFavorites,addFavorite,removeFavorite,getScouts} from '../controllers/externalController.js';

const router = express.Router();

//SportsMonk API routes
router.get('/getLeaguesCurrentSeasonUpcoming', protect, getLeagues);
router.get('/getCoachesPlayersTeamsCountries', protect, getCoaches);
router.get('/getTransfers', protect, getScouts);
// Fav Player routes
router.get('/favorites', protect, getFavorites);
router.post('/favorites', protect, addFavorite);
router.delete('/favorites/:playerId', protect, removeFavorite);

export default router;