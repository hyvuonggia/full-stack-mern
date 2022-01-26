import express from 'express'
import mongoose from 'mongoose';

const app = express();

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

app.get('/', (req, res) => {
    res.send('Hello world')
})



app.listen(5000, () => {
    console.log('Server started on port 5000');
})