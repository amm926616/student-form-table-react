export type Gender = "male" | "female" | "other";

export enum Subject {
  MATH = "math",
  ENGLISH = "english",
  SCIENCE = "science",
  HISTORY = "history",
  ART = "art",
  MUSIC = "music",
}

export type StudentDto = Omit<Student, "id">;

export type Students = Student[];

export interface Student {
  id: number;
  name: string;
  dob: Date;
  gender: Gender;
  email: string;
  subjects: Subject[];
}

export const DUMMY_DATA: Students = [
  {
    id: 1,
    name: "Aung Myint Myat",
    dob: new Date(2003, 8, 17),
    gender: "male",
    email: "amm926616@gmail.com",
    subjects: [Subject.MATH, Subject.SCIENCE, Subject.ENGLISH],
  },
  {
    id: 2,
    name: "Khai Khai Wei",
    dob: new Date(1992, 3, 9),
    gender: "female",
    email: "pieceofky@gmail.com",
    subjects: [Subject.MUSIC, Subject.HISTORY, Subject.ART],
  },
  {
    id: 3,
    name: "Phyae Phyo Aung",
    dob: new Date(1988, 11, 20),
    gender: "other",
    email: "phyae.phyo.aung@gmail.com",
    subjects: [Subject.SCIENCE, Subject.ENGLISH, Subject.MUSIC],
  },
];
