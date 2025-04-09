import { DUMMY_DATA, Student, StudentDto } from "../model/model";

class StudentService {
  private static instance: StudentService;
  private students: Student[] = [...DUMMY_DATA]; // Initialize as array

  private constructor() {}

  public static getInstance(): StudentService {
    if (!StudentService.instance) {
      StudentService.instance = new StudentService();
    }
    return StudentService.instance;
  }

  async save(data: StudentDto): Promise<Student | undefined> {
    try {
      if (data.id) {
        return this.update(data.id, data);
      } else {
        return this.create(data);
      }
    } catch (error) {
      console.error("Error saving student:", error);
      throw error;
    }
  }

  private async create(value: StudentDto): Promise<Student> {
    const newStudent: Student = {
      id: this.getNextId(),
      ...value,
    };
    this.students.push(newStudent);
    return newStudent;
  }

  private async update(id: number, value: StudentDto): Promise<Student> {
    const index = this.students.findIndex((student) => student.id === id);

    if (index === -1) {
      throw new Error(`Student with ID ${id} not found`);
    }

    const updatedStudent = {
      ...this.students[index],
      ...value,
      id, // Preserve the original ID
    };

    this.students[index] = updatedStudent;
    return updatedStudent;
  }

  async getAll(): Promise<Student[]> {
    return [...this.students]; // Return a copy to avoid direct manipulation
  }

  async getById(id: number): Promise<Student | undefined> {
    return this.students.find((student) => student.id === id);
  }

  async delete(id: number): Promise<boolean> {
    const initialLength = this.students.length;
    this.students = this.students.filter((student) => student.id !== id);
    return this.students.length !== initialLength;
  }

  private getNextId(): number {
    return this.students.length > 0
      ? Math.max(...this.students.map((s) => s.id)) + 1
      : 1;
  }
}

export const getStudentService = () => StudentService.getInstance();
