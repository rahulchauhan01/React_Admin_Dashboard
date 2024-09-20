import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const generateToken=(payload)=>{
return jwt.sign(payload,JWT_SECRET_KEY);
}
export const verifyToken=(req,res,next)=>{
    // const authorizationHeader=req.authorization.header
    const token=req.headers.authorization.split(' ')[1];
    console.log(token);
    
    if(!token){
        return res.status("404").json({error:"token not found"})
    }
    try{
const decoded=jwt.verify(token,JWT_SECRET_KEY);
req.user=decoded;
next();
    }
    catch(err){
        // next(err);
        return res.send(err)
    }
}