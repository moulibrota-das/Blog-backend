"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController = require('../controllers/user.controllers');
// //get user
router.get('/:id', userController.getUser);
// //get all user
router.get('/', userController.getAllUser);
// //edit user details
router.put('/:id', userController.updateUser);
// //delete one user
router.delete('/:id', userController.deleteUser);
module.exports = router;
