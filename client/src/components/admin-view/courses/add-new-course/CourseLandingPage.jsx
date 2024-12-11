import FormController from "@/components/commonForm/FormController";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courseLandingPageFormControls } from "@/config";
import { AdminContext } from "@/context/adminContext/AdminContext";
import { useContext } from "react";

const CourseLandingPage = () => {
  const { courseLandingFormData, setCourseLandingFormData } =
    useContext(AdminContext);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Landing Page</CardTitle>
      </CardHeader>
      <CardContent>
        <FormController
          formControls={courseLandingPageFormControls}
          formData={courseLandingFormData}
          setFormData={setCourseLandingFormData}
        />
      </CardContent>
    </Card>
  );
};

export default CourseLandingPage;
