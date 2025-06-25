import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression'; // Optional: for compression

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
app.use(compression()); // Optional: Add compression
app.use(express.json());
const allowedOrigins = [
  'http://localhost:5174',
  'http://localhost:5175',
  'https://website-9dcc0a45.gxz.cjs.mybluehost.me',
  'https://cliff-services.com',
  'https://cliff-services-career.onrender.com',
  'https://cliff-services-career-admin.onrender.com'
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
app.use(express.static(path.join(__dirname, '../frontend/dist'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    } else if (path.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    }
  }
}));

// Serve static files for admin panel
app.use('/admin', express.static(path.join(__dirname, '../admin/dist'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    } else if (path.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    }
  }
}));

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

// Catch-all for career portal (non-API routes)
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Catch-all for admin panel
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin/dist', 'index.html'));
});

// Start Server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port: ${port}`);
});