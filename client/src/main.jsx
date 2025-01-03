import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/authContext/AuthProvider";
import AdminProvider from "./context/adminContext/AdminProvider";
import StudentProvider from "./context/studentContext/StudentProvider";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AdminProvider>
      <StudentProvider>
        <App />
      </StudentProvider>
    </AdminProvider>
  </AuthProvider>
);
