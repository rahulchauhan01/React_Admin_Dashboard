// import { response } from "express";
import { EntityManager } from "../database/dbConnection.js";
import Student from "../model/studentModel.js";
import { Like } from 'typeorm';
// import User from "../model/userModel.js"

export const storeDetails = async (req, res) => {
    try {
        const { name, email, phone, subject } = req.body;
        // console.log("Request Body:", req.body); 
        const userRepository = EntityManager.getRepository(Student)
        const newStudent = userRepository.create({ name, email, phone, subject });
        // console.log("New Student Object:", newStudent); 
        await userRepository.save(newStudent);
        // console.log("Saved Student:", newStudent);  
        res.status(200).json({ message: "Student Created Successfully!", data: newStudent });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ error: "DB error", details: err.message });
    }
}
export const getAllData = async (req, res) => {
    try {
        const defaultPage = 1;
        const defaultSize = 5;

        const pageQuery = parseInt(req.query.page, 10);
        const sizeQuery = parseInt(req.query.size, 10);
        const searchQuery = req.query.search || ""; 

        //current page and size
        const page = isNaN(pageQuery) ? defaultPage : Math.max(1, pageQuery);
        const size = isNaN(sizeQuery) ? defaultSize : Math.max(1, sizeQuery);
        // console.log(size);
        let skip = (page - 1) * size;
        if (searchQuery != "") {
            skip = 0; 
        }
        // console.log(skip);
        // console.log(size);
        const userRepository = EntityManager.getRepository(Student);

        // Add search logic 
        const queryOptions = {skip: skip,take: size, where: { name: Like(`%${searchQuery}%`), //Searching by name
         },
        };
        // Fetch data search and pagination
        const data = await userRepository.find(queryOptions);
        // console.log(data);

        // Count total records
        const totalRecords = await userRepository.count({
            where: {
                name: Like(`%${searchQuery}%`),
            },
        });

        return res.status(200).send({message: "Student data fetched successfully",data: data, page: page, size: size, totalRecords: totalRecords,});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const editStudentDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await EntityManager.getRepository(Student).findOne({ where: { id } });
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        return res.status(200).json(student);
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ error: "Failed to fetch student data" });
    }
};

export const updateStudentDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;
        const userRepository = EntityManager.getRepository(Student);
        const student = await userRepository.findOne({ where: { id } });
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        student.name = name || student.name;
        student.email = email || student.email;
        student.phone = phone || student.phone;

        await userRepository.save(student);
        return res.status(200).json({ message: "Student updated successfully", data: student });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ error: "Failed to update student" });
    }
};

export const deleteStudentDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const userRepository = EntityManager.getRepository(Student);
        const student = await userRepository.findOne({ where: { id } });
        // console.log(student);    

        await userRepository.delete(id);
        return res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ error: "Failed to delete student" });
    }
}

