import { Course } from "../models/course.models.js";

const addNewCourse = async (req, res) => {
  try {
    const courseData = req.body;

    const course = await Course.create(courseData);

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Failed to add new course",
      });
    }

    const savedCourse = await course.save();

    res.status(201).json({
      success: true,
      message: "Course added successfully",
      data: savedCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to add new course",
    });
  }
};

const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find({});

    if (!courses) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong while fetching courses",
      });
    }

    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch course",
    });
  }
};

const getCourseDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong while fetching course details",
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
      message: "Failed to fetch course details",
    });
  }
};

const updateCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const courseData = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(id, courseData, {
      new: true,
    });

    if (!updatedCourse) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong while updating course details",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course details updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to add new course",
    });
  }
};

export { addNewCourse, getAllCourse, getCourseDetailsById, updateCourseById };
