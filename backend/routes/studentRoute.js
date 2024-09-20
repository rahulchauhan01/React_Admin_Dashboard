import express from "express";
import {deleteStudentDetails, editStudentDetails, getAllData, storeDetails, updateStudentDetails} from "../controller/studentController.js";
const router =express.Router();



router.get("/getStudentDetails",getAllData);
router.post("/submitStudentDetails",storeDetails)
router.get("/students/:id", editStudentDetails);
router.put("/students/:id", updateStudentDetails); 
router.delete("/students/:id",deleteStudentDetails);



// router.route("/contact")
// .get(getAllData)
// .post(storeDetails)

export default router;

