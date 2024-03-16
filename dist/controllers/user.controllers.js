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
const bcrypt = require("bcrypt");
//get user by id
const getUser = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield prisma_config_1.default.users.findUnique({
            where: {
                id: id
            }
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(401).json(error);
    }
}));
//get all user
const getAllUser = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_config_1.default.users.findMany();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(401).json(error);
    }
}));
//update user details
//todo password update should be a different route
const updateUser = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const hashPassword = yield bcrypt.hash(user.password, 10);
        const id = req.params.id;
        const updatedUser = yield prisma_config_1.default.users.update({
            where: {
                id: id
            },
            data: {
                username: user.username,
                email: user.email,
                name: user.name,
                password: hashPassword
            }
        });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
//delete one user
const deleteUser = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deletedUser = yield prisma_config_1.default.users.delete({
            where: {
                id: id
            }
        });
        res.status(200).json(deletedUser);
    }
    catch (error) {
        res.status(401).json(error);
    }
}));
module.exports = { getUser, getAllUser, updateUser, deleteUser };
