import express from 'express'
import mongoose from 'mongoose'
import * as authRoute from './routes/auth.js';

const app = express();

app.use(express.json());

async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/mern-learnit')
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

connectDB();

app.use('/api/auth', authRoute.default)



app.listen(5000, () => {
    console.log('Server started on port 5000');
})