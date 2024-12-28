import { GraduationCap, TvMinimalPlay } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { AuthContext } from "@/context/authContext/AuthContext";
import { useContext } from "react";

const StudentHeader = () => {
  const navigate = useNavigate();
  const { resetCredentials } = useContext(AuthContext);
  const handleLogout = () => {
    resetCredentials();
    sessionStorage.clear();
  };

  return (
    <header className="flex items-center justify-between p-4 border-b relative">
      <div className="flex items-center space-x-4">
        <Link to="/home" className="flex items-center">
          <GraduationCap className="h-8 w-8 mr-2 text-blue-700 hover:text-blue-600 " />
          <span className="font-extrabold md:text-xl text-[14px] text-blue-700 hover:text-blue-600 ">
            LMS LEARN
          </span>
        </Link>
        <div className="flex items-center space-x-1">
          <Button
            className="text-[14px] md:text-[16px] font-medium bg-blue-700 hover:bg-blue-600 text-white hover:text-white "
            variant="ghost"
            onClick={() => navigate("/courses")}
          >
            Explore Courses
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex gap-4 items-center">
          <div className="flex gap-3 items-center">
            <span className="font-bold md:text-xl tex-[14px]">My Courses</span>
            <TvMinimalPlay className="w-8 h-8 cursor-pointer text-blue-700" />
          </div>
          <Button
            className="bg-blue-700 hover:bg-blue-600 text-white hover:text-white"
            onClick={handleLogout}
          >
            Sing Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
