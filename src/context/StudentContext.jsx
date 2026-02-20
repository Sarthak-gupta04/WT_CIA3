import { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as api from "../api/students";

const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.fetchStudents();
      // Map MongoDB fields to frontend fields
      setStudents(
        data.map((s) => ({
          id: s.studentId,
          name: s.name,
          email: s.email,
          department: s.department,
          phone: s.phone,
          attendance: s.attendance ?? 0,
        }))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const addStudent = async (student) => {
    await api.createStudent(student);
    await loadStudents();
  };

  const updateStudent = async (updatedStudent) => {
    await api.updateStudent(updatedStudent.id, updatedStudent);
    await loadStudents();
  };

  const deleteStudent = async (id) => {
    await api.deleteStudent(id);
    await loadStudents();
  };

  const getStudent = (id) => {
    return students.find((s) => s.id === id);
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        loading,
        error,
        addStudent,
        updateStudent,
        deleteStudent,
        getStudent,
        refresh: loadStudents,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudents must be used within a StudentProvider");
  }
  return context;
}
