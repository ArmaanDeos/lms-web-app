import { Outlet } from "react-router-dom";
import StudentHeader from "./StudentHeader";

const CommonStudentLayout = () => {
  return (
    <div>
      <StudentHeader />
      <Outlet />
    </div>
  );
};

export default CommonStudentLayout;
