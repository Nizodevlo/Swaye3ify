// src/types/tutorTypes.ts
export interface ITutor {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  experience: string;
  status: "Active" | "Inactive" | "Pending";
  verified: boolean;
  topRated: boolean;
  image?: string;
}

export interface ITutorResponse extends ITutor {
  _id: string;
  joinDate: string;
  studentsCount: number;
  coursesCount: number;
  rating: number;
}

// State
export interface ITutorState {
  tutors: ITutorResponse[];
}

export interface ITutorActions {
  addTutor: (data: ITutor) => Promise<void>;
  editTutor: (data: ITutor, tutorId: string) => Promise<void>;
  removeTutor: (tutorId: string) => Promise<void>;
  getAllTutors: () => Promise<void>;
}
