import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import playerRoutes from './routes/playerRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import externalRoutes from './routes/externalRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
//Axios is a popular third-party library for making HTTP requests in JavaScript.

const app = express();
const port = process.env.PORT || 5000;
connectDB();

// Body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cookie parser middleware
app.use(cookieParser());  

app.get('/', (req, res) => {
  console.log('i am in server.js at /');
  res.send('Api is running');
});

app.use('/api/players', playerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/external', externalRoutes);  // Add this line

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});



// When a client (React frontend) makes an API request,
//  the request flows through different layers in the backend:
// React Frontend → Sends a request (e.g., fetch or axios).
// Server (Express.js) → Handles the request and forwards it to the router.
// Routes → Define API endpoints and link to controllers.
// Controllers → Process business logic and interact with models.
// Models (Database) → Handle data retrieval and storage.
// Middleware → Modify or validate requests before reaching controllers.


// Browser shows: http://localhost:3000/player/1
// ↓
// Axios request: /api/players/1
// ↓
// Actually calls: http://localhost:5000/api/players/1
// ↓
// Express backend handles request
