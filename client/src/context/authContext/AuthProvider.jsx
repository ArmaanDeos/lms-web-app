import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthServices, loginServices, registerServices } from "@/services";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppLoader from "../../components/loader/Loader";

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [authInfo, setAuthInfo] = useState({
    authenticate: false,
    user: null,
  });
  const [loading, setLoading] = useState(false); // For global loading state
  const [initialized, setInitialized] = useState(false); // Ensure toast only shows once after login

  // Function to handle user registration
  const handleRegisterUser = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await registerServices(signUpFormData);

        if (response?.success) {
          toast.success("User registered successfully!");
          setSignUpFormData(initialSignUpFormData); // Reset sign-up form data
        } else {
          toast.error(
            `Registration failed: ${response?.message || "Unknown error"}`
          );
        }
      } catch (error) {
        console.error("Error in handleRegisterUser:", error);
        toast.error("An unexpected error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [signUpFormData]
  );

  // Function to handle user login
  const handleLoginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await loginServices(signInFormData);

        if (response?.success) {
          // Store the access token in session storage
          sessionStorage.setItem(
            "accessToken",
            JSON.stringify(response?.data.accessToken)
          );
          toast.success("User logged in successfully!");

          setAuthInfo({
            authenticate: true,
            user: response?.user,
          });

          setInitialized(true); // User logged in, allow toast on first page load
          setSignInFormData(initialSignInFormData); // Reset login form data
        } else {
          toast.error(`Login failed: ${response?.message || "Unknown error"}`);
          setAuthInfo({
            authenticate: false,
            user: null,
          });
        }
      } catch (error) {
        console.error("Error in handleLoginUser:", error);
        toast.error("An unexpected error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [signInFormData]
  );

  // Function to check if the user is authenticated
  const handleCheckAuth = useCallback(async () => {
    setLoading(true);
    try {
      const response = await checkAuthServices();

      if (response?.success) {
        setAuthInfo({
          authenticate: true,
          user: response?.data.user,
        });
        if (!initialized) {
          setInitialized(true);
        }
      } else {
        setAuthInfo({
          authenticate: false,
          user: null,
        });
      }
    } catch (error) {
      console.error("Error in handleCheckAuth:", error);
      if (!error.response?.data.success) {
        setAuthInfo({
          authenticate: false,
          user: null,
        });
      }
    } finally {
      setLoading(false);
    }
  }, [initialized]);

  // Reset Credentials
  const resetCredentials = () => {
    setAuthInfo({
      authenticate: false,
      user: null,
    });
    toast.success("User logged out successfully!");
  };

  useEffect(() => {
    handleCheckAuth();
  }, [handleCheckAuth]);

  return (
    <AuthContext.Provider
      value={{
        authInfo,
        setAuthInfo,
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        loading,
        resetCredentials,
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {loading ? <AppLoader /> : children}
    </AuthContext.Provider>
  );
}
