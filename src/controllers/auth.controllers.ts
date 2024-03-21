import { Request, Response } from "express"
import prisma from "../lib/prisma.config"

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

type User = {
  email: string, 
  name :string,
  password: string
}

//register
const register = (async (req: Request, res: Response)=>{
  try {
    const userData : User = req.body;
    const hashPassword : string = await bcrypt.hash(userData.password, 10);
    //todo: add email validator

    const user = await prisma.users.create({
      data: {
        email : userData.email,
        name: userData.name,
        password : hashPassword
      },
    })

    const token = jwt.sign({userId: user.id}, process.env.TOKEN_KEY);
    res.status(200).send({...user, token: token});
  } catch (error) {
    console.log(error);
    res.status(400).send(error)
  }
})

//login
const login = (async (req: Request, res: Response)=>{
  console.log("login req received")
  try {
    const {email, password} = req.body;
    const user = await prisma.users.findUnique({
      where:{
        email: email
      }
    });

    if(!user){
      return res.status(401).json({error:'Invalid email'})
    }

    const matchPassword = await bcrypt.compare(password, user.password)
    if(!matchPassword){
      return res.status(401).json({error:'Wrong Password'})
    }

    const token = jwt.sign({userId: user.id}, process.env.TOKEN_KEY);
    res.status(200).send({...user, token: token});
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = {register, login}