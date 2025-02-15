import express from 'express';
import {getPlayers, getPlayerByID} from '../controllers/playerController.js';

const router = express.Router();
router.route('/').get(getPlayers);
router.route('/:id').get(getPlayerByID);
export default router;