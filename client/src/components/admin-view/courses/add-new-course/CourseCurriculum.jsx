import MediaProgressBar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import VideoPlayer from "@/components/video-player";
import { courseCurriculumInitialFormData } from "@/config";
import { AdminContext } from "@/context/adminContext/AdminContext";
import { cloudinaryDeleteServices, cloudinaryUploadServices } from "@/services";
import { useContext } from "react";
import { toast } from "react-toastify";

const CourseCurriculum = () => {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    uploadPercentage,
    setUploadPercentage,
  } = useContext(AdminContext);

  const handleAddNewLecture = () => {
    setCourseCurriculumFormData((prev) => [
      ...prev,
      { ...courseCurriculumInitialFormData[0] },
    ]);
  };

  const handleCourseTitleChange = (e, currentIndex) => {
    setCourseCurriculumFormData((prev) => {
      const newFormData = [...prev];
      newFormData[currentIndex].title = e.target.value;
      return newFormData;
    });
  };

  const handleFreePreviewChange = (currentValue, currentIndex) => {
    console.log(currentValue, currentIndex);
    setCourseCurriculumFormData((prev) => {
      const newFormData = [...prev];
      newFormData[currentIndex].freePreview = currentValue;
      return newFormData;
    });
  };

  const handleLectureUpload = async (event, currentIndex) => {
    const selectedFiles = event.target.files[0];
    if (selectedFiles) {
      const formData = new FormData();
      formData.append("file", selectedFiles);

      try {
        setMediaUploadProgress(true); // Indicate upload is in progress
        const response = await cloudinaryUploadServices(
          formData,
          setUploadPercentage
        );

        if (response.success) {
          toast.success("Lecture uploaded successfully!");

          // Update the specific lecture with the new video data
          setCourseCurriculumFormData((prev) => {
            const updatedData = [...prev];
            updatedData[currentIndex] = {
              ...updatedData[currentIndex],
              videoUrl: response?.data?.url,
              public_id: response?.data?.public_id,
            };
            return updatedData;
          });

          setMediaUploadProgress(false); // Reset progress indicator
        } else {
          toast.error("Failed to upload the video.");
          setMediaUploadProgress(false);
        }
      } catch (error) {
        console.error("Error during video upload:", error);
        toast.error("An error occurred during the video upload.");
        setMediaUploadProgress(false); // Ensure progress indicator is reset on error
      }
    }
  };

  const isCourseCurriculumFormValid = () => {
    return courseCurriculumFormData.every((item) => {
      return item.title.trim() !== "" && item.videoUrl.trim() !== "";
    });
  };

  const handleReplaceVideo = async (currentIndex) => {
    const newFormData = [...courseCurriculumFormData];
    const getCurrentPublicId = newFormData[currentIndex].public_id;

    try {
      const deleteCurrentMediaResponse = await cloudinaryDeleteServices(
        getCurrentPublicId
      );
      if (deleteCurrentMediaResponse.success) {
        newFormData[currentIndex] = {
          ...newFormData[currentIndex],
          videoUrl: "",
          public_id: "",
        };
        setCourseCurriculumFormData(newFormData);
        toast.success("Current video deleted successfully.Choose a new video.");
      } else {
        toast.error("Failed to delete the current video.");
      }
    } catch (error) {
      console.error("Error while deleting video:", error);
      toast.error("An error occurred while replacing the video.");
    }
  };

  console.log(courseCurriculumFormData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleAddNewLecture}
          disabled={!isCourseCurriculumFormValid() || mediaUploadProgress}
        >
          Add Lecture
        </Button>
        {mediaUploadProgress && (
          <MediaProgressBar
            className="mt-4"
            isMediaUploading={mediaUploadProgress}
            progress={uploadPercentage}
          />
        )}
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div className="border p-5 rounded-md" key={index}>
              <div className="flex items-center gap-5">
                <h3 className="font-semibold">Lecture {index + 1}.</h3>
                <Input
                  className="max-w-96"
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture title"
                  onChange={(e) => {
                    handleCourseTitleChange(e, index);
                  }}
                  value={courseCurriculumFormData[index].title}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={(value) => {
                      handleFreePreviewChange(value, index);
                    }}
                    checked={courseCurriculumFormData[index].freePreview}
                    id={`freePreview-${index + 1}`}
                  />
                  <Label htmlform={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="mt-6">
                {courseCurriculumFormData[index].videoUrl ? (
                  <div className="flex gap-3">
                    <VideoPlayer
                      url={courseCurriculumFormData[index].videoUrl}
                      width="750px"
                      height="450px"
                    />

                    <Button
                      onClick={() => {
                        handleReplaceVideo(index);
                      }}
                    >
                      Replace Video
                    </Button>
                    <Button className="bg-red-500">Delete Lecture</Button>
                  </div>
                ) : (
                  <Input
                    type="file"
                    accept="video/*"
                    className="mb-4"
                    onChange={(e) => {
                      handleLectureUpload(e, index);
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCurriculum;
