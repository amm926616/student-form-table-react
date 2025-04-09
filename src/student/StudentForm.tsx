import { useState, FormEvent } from "react";
import { Gender, StudentDto, Subject } from "../model/model";
import useStudentContext from "../provider/StudentProvider";

interface SubjectOption {
  value: Subject;
  label: string;
}

const subjectOptions: SubjectOption[] = [
  { value: Subject.MATH, label: "Math" },
  { value: Subject.ENGLISH, label: "English" },
  { value: Subject.SCIENCE, label: "Science" },
  { value: Subject.HISTORY, label: "History" },
  { value: Subject.ART, label: "Art" },
  { value: Subject.MUSIC, label: "Music" },
];

export function StudentForm() {
  const { addStudent } = useStudentContext();
  const [formData, setFormData] = useState<StudentDto>({
    name: "",
    email: "",
    dob: new Date(),
    gender: "male",
    subjects: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<StudentDto>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, dob: new Date(e.target.value) }));
  };

  const handleGenderChange = (gender: Gender) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const toggleSubject = (subject: Subject) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<StudentDto> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (formData.subjects.length === 0)
      newErrors.subjects = "Select at least one subject";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await addStudent(formData);
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        dob: new Date(),
        gender: "male",
        subjects: [],
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit student data");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 mx-auto max-w-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">
            Student Registration
          </h1>
          <p className="text-gray-500">Please fill in your details below</p>
        </header>

        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              value={formData.dob.toISOString().split("T")[0]}
              onChange={handleDateChange}
              required
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-700 ${
                errors.dob ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.dob && (
              <p className="mt-1 text-sm text-red-600">{errors.dob?.message}</p>
            )}
          </div>

          {/* Gender */}
          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </legend>
            <div className="flex gap-4 items-center">
              {(["male", "female", "other"] as Gender[]).map((gender) => (
                <label key={gender} className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="gender"
                    checked={formData.gender === gender}
                    onChange={() => handleGenderChange(gender)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2">
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Subjects */}
          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-2">
              Subjects{" "}
              {errors.subjects && (
                <span className="text-red-600 text-xs">
                  ({errors.subjects})
                </span>
              )}
            </legend>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {subjectOptions.map((subject) => (
                <label
                  key={subject.value}
                  className="flex items-center text-sm hover:bg-gray-50 p-1 rounded"
                >
                  <input
                    type="checkbox"
                    checked={formData.subjects.includes(subject.value)}
                    onChange={() => toggleSubject(subject.value)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2">{subject.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-md shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              isSubmitting
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
            }`}
          >
            {isSubmitting ? "Processing..." : "Register Now"}
          </button>
        </div>
      </form>
    </div>
  );
}
