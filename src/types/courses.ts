export type GetCoursesResponse = Course[];

export interface Course {
  id: string;
  name: string;
}

export interface CreateCoursePayload {
  name: string;
}
