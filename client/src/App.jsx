import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/authPage";
import ProtectedRoutes from "./components/protected-routes";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import AdminDashboardPage from "./pages/admin";
import CommonStudentLayout from "./components/student-view/CommonStudentLayout";
import StudentHomePage from "./pages/students/home";
import PageNotFound from "./pages/page-not-found";
import AddNewCourse from "./pages/admin/add-new-course";

const App = () => {
  const { authInfo } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <ProtectedRoutes
              authenticate={authInfo?.authenticate}
              user={authInfo?.user}
              element={<AuthPage />}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoutes
              authenticate={authInfo?.authenticate}
              user={authInfo?.user}
              element={<AdminDashboardPage />}
            />
          }
        />
        <Route
          path="/admin/add-new-course"
          element={
            <AddNewCourse
              authenticate={authInfo?.authenticate}
              user={authInfo?.user}
              element={<AdminDashboardPage />}
            />
          }
        />
        <Route
          path="/admin/edit-course/:courseId"
          element={
            <AddNewCourse
              authenticate={authInfo?.authenticate}
              user={authInfo?.user}
              element={<AdminDashboardPage />}
            />
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoutes
              authenticate={authInfo?.authenticate}
              user={authInfo?.user}
              element={<CommonStudentLayout />}
            />
          }
        >
          <Route path="home" element={<StudentHomePage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
