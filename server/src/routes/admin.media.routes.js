import express from "express";
import multer from "multer";
import {
  uploadMediaCloudinary,
  deleteMediaCloudinary,
} from "../helpers/cloudinary.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadMediaCloudinary(req.file.path);

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to upload file",
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        success: false,
        message: "File ID is required",
      });
    }

    await deleteMediaCloudinary(id);

    res.status(200).json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete file",
    });
  }
});

// bulk upload feature

router.post("/bulk-upload", upload.array("files", 10), async (req, res) => {
  try {
    const uploadPromises = req.files.map((file) =>
      uploadMediaCloudinary(file.path)
    );

    const results = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      message: "Files uploaded successfully",
      data: results,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to upload multiple file",
    });
  }
});

export default router;
