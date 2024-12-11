import axiosInstance from "@/api/axiosInstance";

const registerServices = async (formData) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/register",
      {
        ...formData,
        role: "user", // Default role if not provided
      },
      {
        withCredentials: true, // Ensures cookies are sent with the request
      }
    );
    return data; // Return successful response data
  } catch (error) {
    console.log("Error in registerServices:", error);

    // Handle specific server errors
    if (error.response && error.response.data) {
      return error.response.data; // Return backend error response
    } else {
      // Handle generic or network errors
      return {
        success: false,
        message: "An unexpected error occurred. Please try again.",
      };
    }
  }
};

const loginServices = async (formData) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", formData);
    return data;
  } catch (error) {
    console.log("Error in registerServices:", error);

    // Handle specific server errors
    if (error.response && error.response.data) {
      return error.response.data; // Return backend error response
    } else {
      // Handle generic or network errors
      return {
        success: false,
        message: "An unexpected error occurred. Please try again.",
      };
    }
  }
};

const checkAuthServices = async () => {
  try {
    const { data } = await axiosInstance.get("/auth/check-auth");
    // console.log(data);
    return data;
  } catch (error) {
    console.log("Error in registerServices:", error);

    // Handle specific server errors
    if (error.response && error.response.data) {
      return error.response.data; // Return backend error response
    } else {
      // Handle generic or network errors
      return {
        success: false,
        message: "An unexpected error occurred. Please try again.",
      };
    }
  }
};

const cloudinaryUploadServices = async (formData, onProgressCallback) => {
  try {
    const { data } = await axiosInstance.post("/admin-media/upload", formData, {
      onUploadProgress: (ProgressEvent) => {
        const percentCompleted = Math.round(
          (ProgressEvent.loaded / ProgressEvent.total) * 100
        );
        onProgressCallback(percentCompleted);
      },
    });
    return data;
  } catch (error) {
    console.log("Error in cloudinayUploadServices:", error);

    // Handle specific server errors
    if (error.response && error.response.data) {
      return error.response.data; // Return backend error response
    } else {
      // Handle generic or network errors
      return {
        success: false,
        message: "An unexpected error occurred. Please try again.",
      };
    }
  }
};
const cloudinaryDeleteServices = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/admin-media/delete/${id}`);
    return data;
  } catch (error) {
    console.log("Error in cloudinayDeleteServices:", error);

    // Handle specific server errors
    if (error.response && error.response.data) {
      return error.response.data; // Return backend error response
    } else {
      // Handle generic or network errors
      return {
        success: false,
        message: "An unexpected error occurred. Please try again.",
      };
    }
  }
};

export {
  registerServices,
  loginServices,
  checkAuthServices,
  cloudinaryUploadServices,
  cloudinaryDeleteServices,
};
