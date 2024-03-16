import { Request, Response } from "express"
import prisma from "../lib/prisma.config"

const bcrypt = require("bcrypt")

type User = {
  email: string, 
  name :string,
  password: string
}


//get user by id
const getUser = (async (req:Request, res:Response)=>{
  try {
    const id = req.params.id;
    const user = await prisma.users.findUnique({
      where:{
        id: id
      }
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
})

//get all user
const getAllUser = (async (req:Request, res:Response)=>{
  try {
    const users = await prisma.users.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json(error);
  }
})

//update user details
//todo password update should be a different route
const updateUser = (async (req:Request, res:Response)=>{
  try {
    const user : User = req.body;
    const hashPassword : string = await bcrypt.hash(user.password, 10);
    const id = req.params.id;
    const updatedUser = await prisma.users.update({
      where: {
        id : id
      },
      data: {
        email:user.email,
        name:user.name,
        password : hashPassword
      }
    })
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
})

//delete one user
const deleteUser = (async (req:Request, res:Response)=>{
  try {
    const id = req.params.id;
    const deletedUser = await prisma.users.delete({
      where:{
        id: id
      }
    });
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(401).json(error);
  }
})

module.exports = {getUser, getAllUser, updateUser, deleteUser}