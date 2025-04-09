import { StudentForm } from "./StudentForm";
import StudentTable from "./StudentTable";

export function StudentManagement() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Student Management System
          </h1>
          <p className="text-gray-600 mt-2">Add and manage student records</p>
        </div>

        {/* Form and Table layout */}
        <div className="flex flex-col items-center gap-8">
          {/* Centered Form Section */}
          <div className="w-full max-w-2xl">
            <StudentForm />
          </div>

          {/* Full-width Table Section */}
          <div className="w-full">
            <StudentTable />
          </div>
        </div>
      </div>
    </div>
  );
}
