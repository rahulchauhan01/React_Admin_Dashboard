import express from "express";
import cors from 'cors';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import { EntityManager } from './database/dbConnection.js';
// import User from './model/userModel.js';
// dotenv.config();
// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const port = process.env.PORT;
const app = express();

app.use(express.json()); 
import db from "./database/dbConnection.js";
db();
import router from './router.js';

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true, 
}));


// function checkAuth(req, res, next) {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'Unauthorized' });
    
//     jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
//         if (err) return res.status(401).json({ message: err });
//         req.user = decoded;
//         next();
//     });
// }

// app.post('/api/v1/change-password',checkAuth,async (req, res) => {
//     // console.log(req.body);  
//     const { currentPassword, newPassword } = req.body;
//     const userId = req.user.userId;
//     // console.log("dksjdks",req)

//     try {
//         const userRepository = EntityManager.getRepository(User);
//         const user = await userRepository.findOneBy({ id: userId });
        
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
        
//         // return res.status(200).json({ message: currentPassword });
//         const isMatch = await bcrypt.compare(currentPassword, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Current password is incorrect' });
//         }

//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         user.password = hashedPassword;
//         await userRepository.save(user);

//         return res.json({ success: true, message: 'Password changed successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: error });
//     }
// });


router(app);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
