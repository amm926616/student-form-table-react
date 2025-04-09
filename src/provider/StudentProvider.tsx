import { createContext, useContext, useEffect, useState } from "react";
import { Student, StudentDto } from "../model/model";
import { getStudentService } from "../service/student.service";

type StudentContextType = {
  students: Student[];
  addStudent: (student: StudentDto) => Promise<void>;
  updateStudent: (id: string, student: Student) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
  fetchStudents: () => Promise<void>;
};

const defaultValue: StudentContextType = {
  students: [],
  addStudent: async () => {},
  updateStudent: async () => {},
  deleteStudent: async () => {},
  fetchStudents: async () => {},
};

const StudentContext = createContext<StudentContextType>(defaultValue);

export const StudentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const studentService = getStudentService();
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentList = await studentService.getAll();
        setStudents(studentList);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, [studentService]);

  const addStudent = async (student: StudentDto) => {
    try {
      const newStudent = await studentService.save(student);
      if (newStudent) {
        setStudents((prev) => [...prev, newStudent]);
      }
    } catch (error) {
      console.error("Error adding student:", error);
      throw error;
    }
  };

  const updateStudent = async (id: string, student: Student) => {
    try {
      const updatedStudent = await studentService.save(student);
      if (updatedStudent) {
        setStudents((prev) =>
          prev.map((s) => (s.id === id ? updatedStudent : s)),
        );
      }
    } catch (error) {
      console.error("Error updating student:", error);
      throw error;
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      const success = await studentService.delete(Number(id));
      if (success) {
        setStudents((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      throw error;
    }
  };

  const fetchStudents = async () => {
    try {
      const studentList = await studentService.getAll();
      setStudents(studentList);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const value = {
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    fetchStudents,
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};

export default function useStudentContext() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudentContext must be used within a StudentProvider");
  }
  return context;
}
