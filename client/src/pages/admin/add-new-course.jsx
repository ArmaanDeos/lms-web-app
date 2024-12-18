import CourseCurriculum from "@/components/admin-view/courses/add-new-course/CourseCurriculum";
import CourseLandingPage from "@/components/admin-view/courses/add-new-course/CourseLandingPage";
import CourseSetting from "@/components/admin-view/courses/add-new-course/CourseSetting";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { AdminContext } from "@/context/adminContext/AdminContext";
import { AuthContext } from "@/context/authContext/AuthContext";
import {
  addNewCourseServices,
  fetchAdminCourseDetailsServices,
} from "@/services";

import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddNewCourse = () => {
  const {
    courseLandingFormData,
    courseCurriculumFormData,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
    currentEditCourseId,
    setCurrentEditCourseId,
  } = useContext(AdminContext);

  const params = useParams();
  console.log("Params", params);

  const isEmptyFormData = (value) => {
    if (Array.isArray(value)) return value.length === 0;
    return value === "" || value === null || value === undefined;
  };

  const validateFormData = () => {
    for (const key in courseLandingFormData) {
      if (isEmptyFormData(courseLandingFormData[key])) {
        return false; // If any field in courseLandingFormData is empty, form is invalid
      }
    }

    let hasFreePreviewVideo = false;

    for (const item of courseCurriculumFormData) {
      if (
        isEmptyFormData(item.title) || // Check if the title is empty
        isEmptyFormData(item.videoUrl) || // Check if the video URL is empty
        isEmptyFormData(item.public_id) // Check if public_id is empty
      ) {
        return false; // If any field in courseCurriculumFormData is empty, form is invalid
      }
      if (item.freePreview) {
        hasFreePreviewVideo = true; // Track if a free preview video exists
      }
    }

    // Ensure at least one lecture has free preview enabled
    if (!hasFreePreviewVideo) {
      return false;
    }

    return true; // If all checks pass, form is valid
  };

  const { authInfo } = useContext(AuthContext);
  console.log(authInfo);

  const handleCreateCourse = async () => {
    try {
      const courseFormData = {
        instructorId: authInfo?.user?._id,
        instructorName: authInfo?.user?.userName,
        ...courseLandingFormData,
        students: [],
        isPublished: true,
        courseCurriculum: courseCurriculumFormData,
      };

      console.log("CourseFinalFormData :", courseFormData);
      const response = await addNewCourseServices(courseFormData);
      if (response?.success) {
        setCourseLandingFormData(courseLandingInitialFormData);
        setCourseCurriculumFormData(courseCurriculumInitialFormData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCurrentCourseDetails = async () => {
    try {
      const response = await fetchAdminCourseDetailsServices(
        currentEditCourseId
      );
      if (response?.success) {
        const setCourseFormData = Object.keys(
          courseLandingInitialFormData
        ).reduce((acc, key) => {
          acc[key] = response?.data[key] || courseLandingInitialFormData[key];
          return acc;
        }, {});
        console.log("setCourseFormData :", setCourseFormData);
        setCourseLandingFormData(setCourseFormData);
        setCourseCurriculumFormData(response.data.curriculum);
      }
      console.log("Course Response :", response);
    } catch (error) {
      console.error("Unexpected Error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (currentEditCourseId !== null) {
      fetchCurrentCourseDetails();
    }
  }, [currentEditCourseId]);

  useEffect(() => {
    if (params) {
      setCurrentEditCourseId(params?.courseId);
    }
  }, [params]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-extrabold mb-5">Create New Course</h1>
        <Button
          className="text-sm tracking-wider font-bold px-8 "
          disabled={!validateFormData()}
          onClick={handleCreateCourse}
        >
          Submit
        </Button>
      </div>
      <Card>
        <CardContent>
          <div className="container mx-auto p-4">
            <Tabs defaultValue="curriculum" className="space-y-4">
              <TabsList>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="course-landing-page">
                  Course Landing Page
                </TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="curriculum">
                <CourseCurriculum />
              </TabsContent>
              <TabsContent value="course-landing-page">
                <CourseLandingPage />
              </TabsContent>
              <TabsContent value="settings">
                <CourseSetting />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewCourse;
