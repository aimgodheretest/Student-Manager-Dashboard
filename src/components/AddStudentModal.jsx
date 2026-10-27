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
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {};
    const name = formData.name.trim();
    const mobile = formData.mobile.trim();
    const address = formData.address.trim();

    if (!name) {
      nextErrors.name = "Student name cannot be empty.";
    }

    if (!/^\d{10}$/.test(mobile)) {
      nextErrors.mobile = "Enter a valid 10-digit mobile number.";
    }

    if (!address) {
      nextErrors.address = "Address cannot be empty.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    addStudent({
      name: formData.name.trim(),
      mobile: formData.mobile.trim(),
      address: formData.address.trim(),
    });

    setFormData(initialForm);
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setFormData(initialForm);
    setErrors({});
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Student</Modal.Title>
      </Modal.Header>

      <Form noValidate onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter student name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={Boolean(errors.name)}
              autoComplete="name"
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
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
                  isInvalid={Boolean(errors.mobile)}
                  maxLength={10}
                  inputMode="numeric"
                  autoComplete="tel"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.mobile}
                </Form.Control.Feedback>
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
              isInvalid={Boolean(errors.address)}
              autoComplete="street-address"
            />
            <Form.Control.Feedback type="invalid">
              {errors.address}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="outline-secondary"
            type="button"
            onClick={handleClose}
          >
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
