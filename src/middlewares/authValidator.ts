import { Request, Response, NextFunction } from "express"
export interface CustomRequest extends Request {
  userId ?: string;
}
const jwt = require('jsonwebtoken')

const verifyToken = async (req: Request, res:Response, next:NextFunction)=>{
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]
  const id = req.params.id;
  if(!token){
    return res.status(401).json({error: 'Access Denied'})
  }
  try {
    const decoded = await jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decoded)
    if(decoded && id === decoded.userId){
      (req as CustomRequest).userId = decoded.userId;
      next();
    }
    else{
      res.status(400).send("User authentication failed")
    }
  } catch (error) {
    res.status(401).json({error: 'Invalid Token'})
  }
}

const verifyAuthor = (req: CustomRequest, res:Response, next:NextFunction)=>{
  verifyToken(req, res, ()=>{
    const id = req.userId;
    const authorId = req.body.authorId;

    if(authorId === id){
      console.log("author match pass")
      next();
    }
    else{
      res.status(400).send("Author mismatched")
    }
  })
}

//done : add verifyAuthor middleware

module.exports = {verifyToken, verifyAuthor};