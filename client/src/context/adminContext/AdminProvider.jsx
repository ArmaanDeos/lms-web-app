import { useState } from "react";
import { AdminContext } from "./AdminContext";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";

export default function AdminProvider({ children }) {
  const [courseLandingFormData, setCourseLandingFormData] = useState(
    courseLandingInitialFormData
  );
  const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(
    courseCurriculumInitialFormData
  );

  const [mediaUploadProgress, setMediaUploadProgress] = useState(false);

  const [uploadPercentage, setUploadPercentage] = useState(0);

  return (
    <AdminContext.Provider
      value={{
        courseLandingFormData,
        setCourseLandingFormData,
        courseCurriculumFormData,
        setCourseCurriculumFormData,
        mediaUploadProgress,
        setMediaUploadProgress,
        uploadPercentage,
        setUploadPercentage,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
