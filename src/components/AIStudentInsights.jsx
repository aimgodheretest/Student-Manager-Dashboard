import { useState } from "react";
import { Alert, Button, Card, Spinner } from "react-bootstrap";
import { useStudents } from "../context/useStudents";
import { generateStudentInsights } from "../services/gemini";

const AIStudentInsights = () => {
  const { students } = useStudents();

  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateInsights = async () => {
    setLoading(true);
    setError("");
    setInsights("");

    const metrics = {
      totalStudents: students.length,
      missingMobile: students.filter((student) => !student.mobile?.trim())
        .length,
      missingAddress: students.filter((student) => !student.address?.trim())
        .length,
    };

    try {
      const result = await generateStudentInsights(metrics);
      setInsights(result);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body className="p-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div>
            <h4 className="fw-bold mb-1">AI Student Insights</h4>
            <p className="text-secondary mb-0">
              Get AI-generated suggestions for managing your records.
            </p>
          </div>

          <Button
            variant="primary"
            onClick={handleGenerateInsights}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" className="me-2" animation="border" />
                Analyzing...
              </>
            ) : (
              "Generate Insights"
            )}
          </Button>
        </div>

        {error && (
          <Alert
            variant="danger"
            className="mt-3 mb-0"
            dismissible
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        )}

        {insights && (
          <Alert variant="success" className="mt-4 mb-0">
            <h6 className="fw-bold">Your AI recommendations</h6>
            <div className="insight-text">{insights}</div>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default AIStudentInsights;
