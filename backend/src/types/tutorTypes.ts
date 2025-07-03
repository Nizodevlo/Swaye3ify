// Define the interface for a Tutor
export interface ITutor {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string; // Optional as it wasn't explicitly in the image, but good to have
  subject: string;
  experience?: string; // Optional field, derived from the image
  rating?: number; // Optional field, derived from the image
  students?: number; // Optional field, derived from the image
  courses?: number; // Optional field, derived from the image
  joinedDate?: Date; // Optional field, derived from the image
}
