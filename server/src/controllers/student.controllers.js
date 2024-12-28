import { Course } from "../models/course.models.js";

// get all student courses
const getAllStudentCourses = async (req, res) => {
  try {
    const courseList = await Course.find({});
    if (courseList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No course found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: courseList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete course",
    });
  }
};

// get student course details
const getStudentCourseDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "No course found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete course",
    });
  }
};

export { getAllStudentCourses, getStudentCourseDetails };
