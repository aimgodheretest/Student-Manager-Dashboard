import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useStudents } from "../context/StudentContext";

const StudentList = () => {
  const { students, deleteStudent } = useStudents();

  return (
    <Container className="pb-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="fw-bold mb-0">All Students</h2>
        <Badge bg="primary" pill>
          {students.length} Students
        </Badge>
      </div>

      {students.length === 0 ? (
        <Card className="text-center border-0 shadow-sm py-5">
          <Card.Body>
            <h5>No students added yet</h5>
            <p className="text-secondary mb-0">
              Click "Add New Student" to register your first student.
            </p>
          </Card.Body>
        </Card>
      ) : (
        <Row className="g-3">
          {students.map((student) => (
            <Col key={student.id} xs={12} md={6} lg={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <Card.Title className="fw-bold">{student.name}</Card.Title>

                  <Card.Text className="text-secondary mb-2">
                    <strong>Mobile:</strong> {student.mobile}
                  </Card.Text>

                  <Card.Text className="text-secondary">
                    <strong>Address:</strong> {student.address}
                  </Card.Text>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default StudentList;
