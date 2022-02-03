import express from "express";
import reservationsRouter from "./mvc/router";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
const allowedOrigins = ['http://localhost:3000', 'https://tejeoner34.github.io/front-sushiran/', 'https://tejeoner34.github.io'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));
app.use(express.urlencoded({extended:false}));

const PORT = process.env.PORT || 3001

app.use('/reservations', reservationsRouter)

app.listen(PORT, ()=>{
    console.log('server on')
})