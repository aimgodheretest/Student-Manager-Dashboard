import { useState } from "react";
import { StudentContext } from "./StudentContextValue";

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  const addStudent = (student) => {
    const name = typeof student?.name === "string" ? student.name.trim() : "";
    const mobile =
      typeof student?.mobile === "string" ? student.mobile.trim() : "";
    const address =
      typeof student?.address === "string" ? student.address.trim() : "";

    if (!name) {
      return {
        success: false,
        field: "name",
        message: "Student name cannot be empty.",
      };
    }

    if (!/^\d{10}$/.test(mobile)) {
      return {
        success: false,
        field: "mobile",
        message: "Enter a valid 10-digit mobile number.",
      };
    }

    if (!address) {
      return {
        success: false,
        field: "address",
        message: "Address cannot be empty.",
      };
    }

    const isDuplicate = students.some(
      (existingStudent) => existingStudent.mobile === mobile,
    );

    if (isDuplicate) {
      return {
        success: false,
        field: "mobile",
        message: "A student with this mobile number already exists.",
      };
    }

    const newStudent = {
      id: crypto.randomUUID(),
      name,
      mobile,
      address,
    };

    setStudents((prevStudents) => [...prevStudents, newStudent]);

    return { success: true, student: newStudent };
  };

  const deleteStudent = (id) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id),
    );
  };

  const value = {
    students,
    addStudent,
    deleteStudent,
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};
