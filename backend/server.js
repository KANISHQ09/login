import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import complaintRoutes from './routes/Complaints.js'; // Import complaint routes

dotenv.config();
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/complaint', complaintRoutes); // Use complaint routes
app.get('/', (req, res) => res.send('API is running...'));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.error(err));
