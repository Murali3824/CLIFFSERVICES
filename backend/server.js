import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

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

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());
const allowedOrigins = [
    'http://localhost:5174', // Local frontend
    'http://localhost:5175', // Local admin
    'https://website-9dcc0a45.gxz.cjs.mybluehost.me', // Localfrontend
    'https://cliff-services.com', // Production frontend
    'https://cliff-services-career.onrender.com', // Production frontend
    'https://cliff-services-career-admin.onrender.com' // Production admin
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Serve static files for career portal
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Serve static files for admin panel (under a different path, e.g., /admin)
app.use('/admin', express.static(path.join(__dirname, '../admin/build')));

// API Routes with Versioning
app.use('/api/hr', hrRouter);
app.use('/api/admin', adminRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/user', userRouter);
app.use('/api/applications', applicationRouter);

// API Health Check
app.get('/api', (req, res) => {
    res.send('API is running...');
});

// Catch-all route for career portal (non-API routes)
app.get(/^(?!\/api\/).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Catch-all route for admin panel (non-API routes starting with /admin)
app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/build', 'index.html'));
});

// Start Server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port: ${port}`);
});