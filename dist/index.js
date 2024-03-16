"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const dotenv = require('dotenv');
const PORT = process.env.PORT || 4000;
const authRoute = require('./routes/auth.routes');
const blogRoute = require('./routes/blog.routes');
const userRoute = require('./routes/user.routes');
app.listen(PORT, () => console.log("server up and running"));
dotenv.config();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.use('/auth', authRoute);
app.use('/blog', blogRoute);
app.use('/user', userRoute);
