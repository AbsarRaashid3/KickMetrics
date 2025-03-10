import express from 'express';
import {getPlayers, getPlayerByID} from '../controllers/playerController.js';
import { protect} from '../middleware/authMiddleware.js';

const router = express.Router();

// Player realted routes
router.get('/', protect, getPlayers);
router.get('/:id', protect, getPlayerByID);


export default router;