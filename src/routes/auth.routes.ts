import express from "express";
const router = express.Router();

const auth = require('../controllers/auth.controllers')
//add user
router.post('/', auth.register);
router.post('/login', auth.login);


module.exports = router