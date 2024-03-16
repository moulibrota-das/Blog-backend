"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_config_1 = __importDefault(require("../db/prisma.config"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//register
const register = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const hashPassword = yield bcrypt.hash(userData.password, 10);
        //todo: add email validator
        const createUser = yield prisma_config_1.default.users.create({
            data: {
                username: userData.username,
                email: userData.email,
                name: userData.name,
                password: hashPassword
            },
        });
        const token = jwt.sign({ username: userData.username }, process.env.TOKEN_KEY);
        res.status(200).json(token);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}));
//login
const login = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield prisma_config_1.default.users.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email' });
        }
        const matchPassword = yield bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(401).json({ error: 'Wrong Password' });
        }
        const token = jwt.sign({ username: user.username }, process.env.TOKEN_KEY);
        res.status(200).json(token);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
module.exports = { register, login };
