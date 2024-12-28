import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { filterOptions, sortOptions } from "@/config";
import { StudentContext } from "@/context/studentContext/StudentContext";
import { fetchStudentCourseListServices } from "@/services";

import { ArrowUpDownIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";

const StudentCoursesListPage = () => {
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});

  const { studentCoursesList, setStudentCoursesList } =
    useContext(StudentContext);

  const fetchStudentCourseList = async () => {
    const response = await fetchStudentCourseListServices();
    console.log(response);
    if (response?.success) {
      setStudentCoursesList(response?.data);
      // toast.success(response?.message);
    }
  };

  useEffect(() => {
    fetchStudentCourseList();
  }, []);

  const handleFiltersOnChange = (getSectionId, getCurrentOption) => {
    let copyFilters = { ...filters };
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getSectionId);
    // console.log(indexOfCurrentSection, getSectionId);
    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOption.id],
      };
      console.log(copyFilters);
    } else {
      const indexOfCurrentOption = copyFilters[getSectionId].indexOf(
        getCurrentOption.id
      );
      if (indexOfCurrentOption === -1) {
        copyFilters[getSectionId].push(getCurrentOption.id);
      } else {
        copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }

    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  };

  console.log(filters);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Courses</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-64 space-y-4">
          <div className="p-4 space-y-4">
            {Object.keys(filterOptions).map((key) => (
              <div className="p-4 space-y-4" key={key.id}>
                <h3 className="font-bold mb-3">{key.toUpperCase()}</h3>
                <div className="grid gap-2 mt-2">
                  {filterOptions[key].map((option) => (
                    <Label
                      className="flex font-medium items-center gap-3"
                      key={option.id}
                    >
                      <Checkbox
                        checked={
                          filters &&
                          Object.keys(filters).length > 0 &&
                          filters[key] &&
                          filters[key].indexOf(option.id) > -1
                        }
                        onCheckedChange={() => {
                          handleFiltersOnChange(key, option);
                        }}
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
        <main className="flex-1">
          <div className="flex justify-end items-center mb-4 gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="felx items-center gap-2 p-5 bg-blue-700 hover:bg-blue-600"
                  size="sm"
                >
                  <ArrowUpDownIcon className="w-4 h-4" />
                  <span className="text-[16px] font-medium">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => setSort(value)}
                >
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem value={option.id} key={option.id}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm text-gray-600 font-bold">10 Results</span>
          </div>
          <div className="space-y-4">
            {studentCoursesList && studentCoursesList.length > 0 ? (
              studentCoursesList.map((course) => (
                <Card key={course.id}>
                  <CardContent className="p-4 flex gap-4">
                    <div className="w-48 h-32 flex-shrink-0">
                      <img
                        src={course?.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {course?.title}
                      </CardTitle>
                      <p className="text-gray-600 text-sm mb-2">
                        Created By :{" "}
                        <span className="font-bold">
                          {course?.instructorName}
                        </span>
                      </p>
                      <p className="text-[18px] text-gray-500 mb-2">
                        {`
                          ${course?.courseCurriculum?.length} ${
                          course?.courseCurriculum?.length >= 2
                            ? "Lectures"
                            : "Lecture"
                        } -  ${
                          course?.level.charAt(0).toUpperCase() +
                          course?.level.slice(1)
                        } - Level`}
                      </p>
                      <p className="text-lg font-medium ">${course?.pricing}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <h2>No Courses Found</h2>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentCoursesListPage;
