import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";

import { AdminContext } from "@/context/adminContext/AdminContext";
import { DeleteIcon, Edit } from "lucide-react";
import { useContext } from "react";

import { useNavigate } from "react-router-dom";

const Courses = ({ listOfCourses }) => {
  const navigate = useNavigate();

  const {
    setCurrentEditCourseId,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  } = useContext(AdminContext);

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold">All Courses</CardTitle>
        <Button
          className="p-6"
          onClick={() => {
            setCurrentEditCourseId(null);
            setCourseLandingFormData(courseLandingInitialFormData);
            setCourseCurriculumFormData(courseCurriculumInitialFormData);
            navigate("/admin/add-new-course");
          }}
        >
          Create New Course
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listOfCourses &&
                listOfCourses.length > 0 &&
                listOfCourses.map((course) => (
                  <TableRow key={course._id}>
                    <TableCell className="font-medium">
                      {course.title}
                    </TableCell>
                    <TableCell>
                      {course.students && course.students.length}
                    </TableCell>
                    <TableCell>${course.pricing}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          navigate(`/admin/edit-course/${course?._id}`);
                        }}
                      >
                        <Edit className="h-6 w-6 cursor-pointer text-green-600" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <DeleteIcon className="h-6 w-6 cursor-pointer text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Courses;
