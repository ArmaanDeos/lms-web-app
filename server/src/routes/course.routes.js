import express from "express";
import {
  addNewCourse,
  deleteCourseById,
  getAllCourse,
  getCourseDetailsById,
  updateCourseById,
} from "../controllers/course.controllers.js";

const router = express.Router();

router.post("/add-new-course", addNewCourse);
router.get("/get-all-courses", getAllCourse);
router.get("/get-course-details/:id", getCourseDetailsById);
router.put("/update-course/:id", updateCourseById);
router.delete("/delete-course/:id", deleteCourseById);

export default router;
