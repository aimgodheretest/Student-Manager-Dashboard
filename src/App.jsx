import { useState } from "react";
import { StudentProvider } from "./context/StudentContext";
import StudentHeader from "./components/StudentHeader";
import AddStudentModal from "./components/AddStudentModal";
import StudentList from "./components/StudentList";
import { Container } from "react-bootstrap";
import AIStudentInsights from "./components/AIStudentInsights";
function StudentManager() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <StudentHeader onAddClick={() => setShowModal(true)} />

      <Container>
        <AIStudentInsights />
      </Container>
      <StudentList />

      <AddStudentModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

function App() {
  return (
    <StudentProvider>
      <StudentManager />
    </StudentProvider>
  );
}

export default App;
