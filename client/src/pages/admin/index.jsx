import Courses from "@/components/admin-view/courses/Courses";
import Dashboard from "@/components/admin-view/dashboard/Dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/context/authContext/AuthContext";
import { BarChart, Book, LogOut } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

const AdminDashboardPage = () => {
  const { resetCredentials } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("dashboard");

  const menuItem = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <Dashboard />,
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <Courses />,
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null,
    },
  ];

  const handleLogout = () => {
    resetCredentials();
    sessionStorage.clear();
  };

  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Admin View</h2>
          <nav>
            {menuItem.map((item) => (
              <Button
                key={item.value}
                className="w-full justify-start mb-2"
                variant={activeTab === item.value ? "secondary" : "ghost"}
                onClick={() =>
                  item.value === "logout"
                    ? handleLogout()
                    : setActiveTab(item.value)
                }
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItem.map((item) => (
              <TabsContent value={item.value} key={item.value}>
                {item.component}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
