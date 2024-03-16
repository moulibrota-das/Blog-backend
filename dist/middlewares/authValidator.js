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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Access Denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        console.log(decoded);
        if (decoded) {
            req.userId = decoded;
            next();
        }
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid Token' });
    }
});
// const verifyAuthentication = (req: Request, res:Response, next:NextFunction)=>{
//   const token = req.header('Authorization');
//   if(!token){
//     return res.status(401).json({error: 'Access Denied'})
//   }
//   console.log("token", token)
//   try {
//     jwt.verify(token, process.env.TOKEN_KEY);
//     next();
//   } catch (error) {
//     res.status(401).json({error: 'Invalid Token'})
//   }
// }
//todo : add verifyAuthor middleware
module.exports = { verifyToken };
