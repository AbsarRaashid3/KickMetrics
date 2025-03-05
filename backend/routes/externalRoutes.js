import express from 'express';
import { protect} from '../middleware/authMiddleware.js';
import {getCountries,getLeagues} from '../controllers/externalController.js';

const router = express.Router();

// Player realted routes
router.get('/getCountries', protect, getCountries);
router.get('/getLeagues', protect, getLeagues);

export default router;