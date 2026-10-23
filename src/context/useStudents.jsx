import { useContext } from "react";
import { StudentContext } from "./StudentContextValue";

export const useStudents = () => {
  return useContext(StudentContext);
};
