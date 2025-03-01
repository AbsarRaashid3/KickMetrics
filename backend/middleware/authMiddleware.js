import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/UserModel.js';

//This middleware is typically used to protect routes that require authentication.
const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;   // Read JWT from the 'jwt' cookie
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); //returnsu user object
            req.user = await User.findById(decoded.userId).select('-password');  //excludes the password field from the returned user object
            //req.user Attaches the user object to the request for use in subsequent middleware/routes
            next();    //move to the next piece of middleware
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed'); //token is there but it si not the right token
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

//Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as an admin');
    }
};

export { protect, admin };
