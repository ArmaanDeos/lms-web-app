import express from "express";
import {
  getAllStudentCourses,
  getStudentCourseDetails,
} from "../controllers/student.controllers.js";

const router = express.Router();

router.get("/get-all-courses", getAllStudentCourses);
router.get("/get-all-courses/details/:id", getStudentCourseDetails);

export default router;
