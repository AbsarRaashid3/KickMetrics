import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import playerRoutes from './routes/playerRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
//Axios is a popular third-party library for making HTTP requests in JavaScript.

const app = express();
const port = process.env.PORT || 5000;
connectDB();

// Add these lines before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('i am in server.js at /');
  res.send('Api is running');
});

app.use('/api/players', playerRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});



// The request flow goes like this:
// Request hits server.js
// Matches route in routes file
// Passes through any middleware
// Reaches controller
// Response sent back

// Browser shows: http://localhost:3000/player/1
// ↓
// Axios request: /api/players/1
// ↓
// Actually calls: http://localhost:5000/api/players/1
// ↓
// Express backend handles request
