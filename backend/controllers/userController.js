import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/UserModel.js';
import generateToken from '../utils/generateToken.js';
import multer from 'multer';
import path from 'path';

//image handling thru multer
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads');
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Images only!'));
  }
}).single('image');

//@desc Auth user and get the token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});



//@desc Auth user and get the token
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    console.log("User created successfully!");
    generateToken(res, user._id);
    console.log("token genearted successfully!");

    res.status(200).json({ //200 means everything is ok and user created
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
  else {
    res.status(400);
    throw new Error('Invalid user data');
  };
});

//@desc logout user / clear cookie
//@route POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully!' });
});

//@desc reset password
//@route POST /api/users/reset-password
//@access Private
const resetPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

 
  if (user) {
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
      const updatedUser= await user.save();
      res.status(200).json({ message: 'Password updated successfully' });
  } else {
      res.status(404);
      throw new Error('User not found');
  }
});

//@desc Get user profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      image: user.image,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');

  }
});

//@desc Update user profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const user = await User.findById(req.user._id);
    
    if (user) {
      user.name = req.body.name || user.name;
      user.bio = req.body.bio || user.bio;
      
      if (req.file) {
        user.image = `/uploads/${req.file.filename}`;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        bio: updatedUser.bio,
        image: updatedUser.image
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });
});

/////////////////////////////////ADMIN CONTROLLERS//////////////////////////////////
//@desc Get users
//@route GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.json("i am in user controller, in getUsers");
});

//@desc Get users
//@route GET /api/users/:id
//@access Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  res.json("i am in user controller, in getUserByID");
});

//@desc UPDATE users
//@route PUT /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.json("i am in user controller, in updateUser");
});

//@desc Delete users
//@route DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.json("i am in user controller, in deleteUser");
});

export {
  authUser,
  registerUser,
  logoutUser,
  resetPassword,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserByID,
  updateUser,
  deleteUser,
};