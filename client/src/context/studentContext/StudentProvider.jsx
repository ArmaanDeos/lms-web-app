import { ToastContainer } from "react-toastify";
import { StudentContext } from "./StudentContext";
import AppLoader from "../../components/loader/Loader";
import { useState } from "react";

export default function StudentProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [studentCoursesList, setStudentCoursesList] = useState([]);
  return (
    <StudentContext.Provider
      value={{ loading, setLoading, studentCoursesList, setStudentCoursesList }}
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
    </StudentContext.Provider>
  );
}
