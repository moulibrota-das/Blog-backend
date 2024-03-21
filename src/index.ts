import { Request, Response } from "express";
import { consumeMessage } from "./lib/kafka";
const express = require("express")
const app = express();
const dotenv = require('dotenv')
const PORT = process.env.PORT || 4000;
const pid = process.pid;
const cors = require('cors')

const authRoute = require('./routes/auth.routes')
const blogRoute = require('./routes/blog.routes')
const userRoute = require('./routes/user.routes')

app.listen(PORT, ()=> console.log(`server ${pid} up and running`));

dotenv.config();
app.use(express.json())
app.use(cors({
  origin: 'http://127.0.0.1:3000',
}))
console.log('kafka user :', process.env.KAFKA_USER);

app.get('/', (req:Request, res:Response) => {
  res.send('Express + TypeScript Server');
});
app.use('/auth', authRoute);
app.use('/blog', blogRoute);
app.use('/user', userRoute);

// consumeMessage();

