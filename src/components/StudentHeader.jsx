import { Container, Button } from "react-bootstrap";
import { useStudents } from "../context/useStudents";

const StudentHeader = ({ onAddClick }) => {
  const { students } = useStudents();

  return (
    <Container className="text-center py-5">
      <h1 className="fw-bold">Student Manager</h1>

      <p className="text-secondary fs-5">All Students: {students.length}</p>

      <Button variant="primary" onClick={onAddClick}>
        + Add New Student
      </Button>
    </Container>
  );
};

export default StudentHeader;
