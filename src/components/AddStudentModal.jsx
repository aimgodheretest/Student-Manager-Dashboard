import { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { useStudents } from "../context/StudentContext";

const initialForm = {
  name: "",
  mobile: "",
  address: "",
};

const AddStudentModal = ({ show, onClose }) => {
  const { addStudent } = useStudents();
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    addStudent(formData);

    setFormData(initialForm);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Student</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter student name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="mobile"
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  maxLength={10}
                  required
                />
                <Form.Text muted>Enter a 10-digit mobile number.</Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="address"
              placeholder="Enter student address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" type="button" onClick={onClose}>
            Close
          </Button>

          <Button variant="primary" type="submit">
            Add Student
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddStudentModal;
