import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credential:true
}))

app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true, limit: '16kb'}));
app.use(express.static('public'));
app.use(cookieParser());

// Routes import
import userRoutes from './routes/user.routes.js';
import modelRoutes from './routes/model.routes.js'





app.use('/api/v1/users', userRoutes);
app.use('/api/v1/model', modelRoutes)


export {app};