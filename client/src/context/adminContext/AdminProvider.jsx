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

  const [adminCoursesList, setAdminCoursesList] = useState([]);

  const [currentEditCourseId, setCurrentEditCourseId] = useState(null);

  const [listOfCourses, setListOfCourses] = useState([]);

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
        adminCoursesList,
        setAdminCoursesList,
        currentEditCourseId,
        setCurrentEditCourseId,
        listOfCourses,
        setListOfCourses,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
