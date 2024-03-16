import { Request, Response, NextFunction } from "express";
import express from "express"
const router = express.Router();
const userController = require('../controllers/user.controllers')

// //get user
router.get('/:id', userController.getUser)

// //get all user
router.get('/', userController.getAllUser)

// //edit user details
router.put('/:id', userController.updateUser)

// //delete one user
router.delete('/:id', userController.deleteUser)

module.exports = router