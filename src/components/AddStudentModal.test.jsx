import { afterEach, describe, it, expect, vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import AddStudentModal from "./AddStudentModal";
import { useStudents } from "../context/useStudents";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

vi.mock("../context/useStudents", () => ({
  useStudents: vi.fn(),
}));

describe("AddStudentModal", () => {
  const setup = (addStudent = vi.fn(() => ({ success: true }))) => {
    useStudents.mockReturnValue({ addStudent });

    render(<AddStudentModal show={true} onClose={vi.fn()} />);

    return { addStudent };
  };

  it("rejects a whitespace-only student name", () => {
    const { addStudent } = setup();

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "   " },
    });

    fireEvent.change(screen.getByLabelText(/mobile number/i), {
      target: { value: "9876543210" },
    });

    fireEvent.change(screen.getByLabelText(/address/i), {
      target: { value: "Mumbai" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add student/i }));

    expect(
      screen.getByText("Student name cannot be empty."),
    ).toBeInTheDocument();

    expect(addStudent).not.toHaveBeenCalled();
  });

  it("rejects an invalid mobile number", () => {
    const { addStudent } = setup();

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "Rahul Kumar" },
    });

    fireEvent.change(screen.getByLabelText(/mobile number/i), {
      target: { value: "12345" },
    });

    fireEvent.change(screen.getByLabelText(/address/i), {
      target: { value: "Mumbai" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add student/i }));

    expect(
      screen.getByText("Enter a valid 10-digit mobile number."),
    ).toBeInTheDocument();

    expect(addStudent).not.toHaveBeenCalled();
  });

  it("displays a duplicate mobile number error", () => {
    const addStudent = vi.fn(() => ({
      success: false,
      field: "mobile",
      message: "A student with this mobile number already exists.",
    }));

    setup(addStudent);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "Rahul Kumar" },
    });

    fireEvent.change(screen.getByLabelText(/mobile number/i), {
      target: { value: "9876543210" },
    });

    fireEvent.change(screen.getByLabelText(/address/i), {
      target: { value: "Mumbai" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add student/i }));

    expect(addStudent).toHaveBeenCalledWith({
      name: "Rahul Kumar",
      mobile: "9876543210",
      address: "Mumbai",
    });

    expect(
      screen.getByText("A student with this mobile number already exists."),
    ).toBeInTheDocument();
  });

  it("adds valid student details successfully", () => {
    const addStudent = vi.fn(() => ({ success: true }));

    setup(addStudent);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: " Rahul Kumar " },
    });

    fireEvent.change(screen.getByLabelText(/mobile number/i), {
      target: { value: "9876543210" },
    });

    fireEvent.change(screen.getByLabelText(/address/i), {
      target: { value: " Mumbai " },
    });

    fireEvent.click(screen.getByRole("button", { name: /add student/i }));

    expect(addStudent).toHaveBeenCalledWith({
      name: "Rahul Kumar",
      mobile: "9876543210",
      address: "Mumbai",
    });
  });
});
