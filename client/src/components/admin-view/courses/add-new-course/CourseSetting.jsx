import MediaProgressBar from "@/components/media-progress-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminContext } from "@/context/adminContext/AdminContext";
import { cloudinaryUploadServices } from "@/services";
import { useContext } from "react";

const CourseSetting = () => {
  const {
    courseLandingFormData,
    setCourseLandingFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    uploadPercentage,
    setUploadPercentage,
  } = useContext(AdminContext);

  const handleImageUploadChange = async (e) => {
    const selectedImg = e.target.files[0];
    if (selectedImg) {
      const imgFormData = new FormData();
      imgFormData.append("file", selectedImg);
      try {
        setMediaUploadProgress(true);
        const response = await cloudinaryUploadServices(
          imgFormData,
          setUploadPercentage
        );
        console.log(response);
        if (response.success) {
          setCourseLandingFormData((prev) => ({
            ...prev,
            image: response?.data?.url,
          }));
          setMediaUploadProgress(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(courseLandingFormData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Setting</CardTitle>
      </CardHeader>
      <div className="p-4">
        {mediaUploadProgress && (
          <MediaProgressBar
            isMediaUploading={mediaUploadProgress}
            progress={uploadPercentage}
          />
        )}
      </div>
      <CardContent>
        {courseLandingFormData?.image ? (
          <img src={courseLandingFormData?.image} alt="" />
        ) : (
          <div className="flex flex-col gap-3">
            <Label>Upload Course Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUploadChange}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseSetting;
