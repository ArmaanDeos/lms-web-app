import mongoose, { Schema } from "mongoose";

const lectureSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  freePreview: {
    type: Boolean,
    required: true,
  },
});

const courseSchema = new Schema(
  {
    instructorId: {
      type: String,
    },
    instructorName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    primaryLanguage: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    pricing: {
      type: Number,
      required: true,
    },
    objectives: {
      type: String,
      required: true,
    },
    welcomeMessage: {
      type: String,
      required: true,
    },
    students: [
      {
        studentId: {
          type: String,
        },
        studentName: {
          type: String,
          required: true,
        },
        studentEmail: {
          type: String,
          required: true,
        },
      },
    ],
    courseCurriculum: [lectureSchema],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
