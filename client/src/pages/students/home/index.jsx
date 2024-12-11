import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/authContext/AuthContext";
import { useContext } from "react";

const StudentHomePage = () => {
  const { resetCredentials } = useContext(AuthContext);
  const handleLogout = () => {
    resetCredentials();
    sessionStorage.clear();
  };
  return (
    <>
      <div>StudentHomePage</div>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default StudentHomePage;
