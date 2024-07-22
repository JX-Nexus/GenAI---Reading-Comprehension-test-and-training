import dotenv from 'dotenv'
import connectDB from './db/index.js';
import {app} from './app.js';
dotenv.config({
    path: './.env'
})

connectDB()
    .then(
        app.listen(process.env.PORT, () => {
            console.log(`🚀 Server listening on port ${process.env.PORT} \n Link:http://localhost:/${process.env.PORT}`);
        })
    )
    .catch((err) => console.log(err));
