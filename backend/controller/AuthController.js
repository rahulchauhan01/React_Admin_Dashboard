import { EntityManager } from "../database/dbConnection.js";
import User from "../model/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const createUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const userRepository = EntityManager.getRepository(User);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = userRepository.create({ ...req.body, password: hashedPassword });
        await userRepository.save(newUser);
       
        const token = jwt.sign({ userId: newUser.id }, JWT_SECRET_KEY, { expiresIn: '1d' });

        res.status(200).json({ message: "User created successfully", data: newUser, token: token });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ error: "DB error", details: err.message });
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userRepository = EntityManager.getRepository(User);
        const user = await userRepository.findOne({ where: { email: email } });
        if (!user) return res.status(401).send('user not exist');
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(404).send("Invalid password");

        const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, { expiresIn: '1d' });
        // console.log(JWT_SECRET_KEY);

        res.status(200).json({ message: "Login successful", data: user, token: token });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message })
    }
}
export const userChangePassword = async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user?.userId; // Safely access userId
  
      // Log the values
      console.log("Current Password:", currentPassword);
      console.log("New Password:", newPassword);
  
      const userRepository = EntityManager.getRepository(User);
      const user = await userRepository.findOneBy({ id: userId });
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Log the user's stored password
      console.log("User's Stored Password:", user.password);
  
      // Ensure passwords are valid before comparing
      if (!currentPassword || !user.password) {
        return res.status(400).json({ message: 'Password data missing' });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
  
      // Hash the new password and save it
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await userRepository.save(user);
  
      return res.json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error changing password:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  



