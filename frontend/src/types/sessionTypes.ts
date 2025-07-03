// sessionTypes.ts
export enum EDay {
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
  SUNDAY = "Sunday",
}

// 2. Define the interface using the enum
export interface ISession {
  day: string; // This should ideally be EDay, but if backend expects string, keep it.
  startTime: string;
  endTime: string;
  coursId: string; // These are IDs when sending to backend
  salleId: string; // These are IDs when sending to backend
}

export interface ISessionResponse extends ISession {
  _id: string;
}

export interface ISessionState {
  sessions: ISessionResponse[]; // Changed this from ISessionPop[] to ISessionResponse[]
}

export interface ISessionAction {
  addSession: (data: ISession) => Promise<void>;
  updateSession: (data: ISession, sessionId: string) => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
  getAllSession: () => Promise<void>;
}

export interface ICoursTeacher {
  firstName: string;
  lastName: string;
}

export interface ICoursId {
  _id: string; // Assuming these have an _id
  courName: string;
  teacher: ICoursTeacher;
}

export interface ISalleId {
  _id: string; // Assuming these have an _id
  salleName: string;
  capacity: number;
}

// This interface is for sessions with populated `coursId` and `salleId` fields
// typically what you'd get when fetching sessions for display.
export interface ISessionPop {
  _id: string;
  day: string;
  startTime: string;
  endTime: string;
  coursId: ICoursId; // Now it's the full ICoursId object
  salleId: ISalleId; // Now it's the full ISalleId object
}

// export enum EDay {
//   MONDAY = "Monday",
//   TUESDAY = "Tuesday",
//   WEDNESDAY = "Wednesday",
//   THURSDAY = "Thursday",
//   FRIDAY = "Friday",
//   SATURDAY = "Saturday",
//   SUNDAY = "Sunday",
// }

// // 2. Define the interface using the enum
// export interface ISession {
//   day: string;
//   startTime: string;
//   endTime: string;
//   coursId: string;
//   salleId: string;
// }

// export interface ISessionResponse extends ISession {
//   _id: string;
// }

// export interface ISessionState {
//   sessions: ISessionResponse[];
// }

// export interface ISessionAction {
//   addSession: (data: ISession) => Promise<void>;
//   updateSession: (data: ISession, sessionId: string) => Promise<void>;
//   deleteSession: (sessionId: string) => Promise<void>;
//   getAllSession: () => Promise<void>;
// }

// export interface ICoursTeacher {
//   firstName: string;
//   lastName: string;
// }

// export interface ICoursId {
//   courName: string;
//   teacher: ICoursTeacher;
// }

// export interface ISalleId {
//   salleName: string;
//   capacity: number;
// }

// export interface ISessionPop {
//   _id: string;
//   day: string;
//   startTime: string;
//   endTime: string;
//   coursId: ICoursId;
//   salleId: ISalleId;
// }
