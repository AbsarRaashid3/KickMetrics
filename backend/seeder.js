import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Player from './models/PlayersModel.js';  // Import Player model
import players from './data/players.js';  // Import sample players data
import User from './models/UserModel.js';  // Import user model
import users from './data/users.js';  // Import sample user data
import connectDB from './config/db.js'; // Your MongoDB connection file

dotenv.config(); // Load environment variables
connectDB();

const importData = async () => {
    try {
        await Player.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);  //from users.js to model User
        const adminUser = createdUsers[0]._id;
        const samplePlayers = players.map((player) => {  
            return { ...player, user: adminUser };
        });
        await Player.insertMany(samplePlayers);  //from players.js to players Model
        console.log('Data imported!!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }

};

const destroyData = async () => {
    try {
        await Player.deleteMany();
        await User.deleteMany();
        console.log('Data destroyed!!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }

};


if (process.argv[2]==='-d'){
    destroyData();
}else{
    importData();
}