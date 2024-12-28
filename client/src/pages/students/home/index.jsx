import { Button } from "@/components/ui/button";
import { courseCategories } from "@/config";
import { StudentContext } from "@/context/studentContext/StudentContext";
import { fetchStudentCourseListServices } from "@/services";
import { useContext, useEffect } from "react";
// import { toast } from "react-toastify";

const StudentHomePage = () => {
  const { studentCoursesList, setStudentCoursesList } =
    useContext(StudentContext);

  const fetchStudentCourseList = async () => {
    const response = await fetchStudentCourseListServices();
    // console.log(response);
    if (response?.success) {
      setStudentCoursesList(response?.data);
      // toast.success(response?.message);
    }
  };

  useEffect(() => {
    fetchStudentCourseList();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-white">
        <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8">
          <div className="lg:w-1/2 lg:pr-12">
            <h1 className="text-6xl font-bold mb-4">Learning that gets you.</h1>
            <p className="text-xl">
              Skills for your present and future. <br />
              Get started today.
            </p>
          </div>
          <div className="lg:w-full mb-8 lg:mb-0">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="LMS LEARN"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </section>
        <section className="py-8 px-4 lg:px-8 bg-gray-100">
          <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {courseCategories.map((category) => (
              <Button
                className="justify-center"
                variant="outline"
                key={category.id}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </section>

        <section className="py-12 px-4 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Feature Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {studentCoursesList && studentCoursesList.length > 0
              ? studentCoursesList.map((course) => (
                  <div
                    className="border rounded-lg overflow-hidden shadow cursor-pointer"
                    key={course._id}
                  >
                    <img
                      src={course.image}
                      alt="course"
                      width={300}
                      height={150}
                      className="w-full h-40 object-cover "
                    />
                    <div className="p-4">
                      <h3 className="font-bold mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-700 mb-2">
                        {course.instructorName}
                      </p>
                      <p className="font-bold text-[16px]">${course.pricing}</p>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </section>
      </div>
    </>
  );
};

export default StudentHomePage;
