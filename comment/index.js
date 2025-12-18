import express from 'express';
import router from './router/router.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use("/api/v1/snippet", router);



app.listen(8001, ()=>{
 console.log("Server started on port 8001")
})