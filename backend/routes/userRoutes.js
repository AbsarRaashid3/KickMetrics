import express from 'express';
import {authUser,
        registerUser,
        logoutUser,
        getUserProfile,
        updateUserProfile,
        getUsers,
        getUserByID,
        updateUser,deleteUser,resetPassword} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();


// Auth routes
router.route('/').post(registerUser).get(protect,admin,getUsers);
router.post('/logout', logoutUser);
router.post('/login', authUser);
router.post('/reset-password', resetPassword);

// Profile routes
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserByID).put(protect,admin,updateUser);


// Admin routes
// router.get('/admin', protect, admin, getAdminPanel);
export default router;

