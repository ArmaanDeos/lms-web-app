import { AuthContext } from "@/context/authContext/AuthContext";
import { useContext } from "react";

const Loader = () => {
  const { loading } = useContext(AuthContext);

  return loading ? (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
    </div>
  ) : null;
};

export default Loader;
