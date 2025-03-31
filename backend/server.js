import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importing Routes
import connectDB from './config/mongodb.js';
import hrRouter from './routes/hrRoute.js';
import adminRouter from './routes/adminRoute.js';
import jobRouter from './routes/jobRoutes.js';
import userRouter from './routes/userRoute.js';
import applicationRouter from './routes/applicationRoutes.js';

// App Config
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// const corsOptions = {
//     origin: function (origin, callback) {
//         const allowedOrigins = [
//             'http://localhost:5174',  // Client frontend
//             'http://localhost:5175',  // Admin frontend
//         ];

//         if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// };
// app.use(cors(corsOptions));


// API Routes with Versioning
app.use('/api/hr', hrRouter);       
app.use('/api/admin', adminRouter); 
app.use('/api/jobs',jobRouter)
app.use('/api/user', userRouter);
app.use('/api/applications', applicationRouter);

// API Health Check
app.get('/', (req, res) => {
    res.send("API is running...");
});

// Start Server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port: ${port}`);
});
