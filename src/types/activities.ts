import { Student } from "./students";
import { Task } from "./tasks";

export type GetActivitiesResponse = Activity[];

export interface Activity {
  id: string;
  date: string;
  scheduledEnd: string;
  scheduledStart: string;
  actualEnd: string;
  actualStart: string;
  student: Student;
  tasks: Task[];
}

export interface CreateActivityPayload {
  studentCpf: string;
  date: string;
  scheduledStart: string;
  scheduledEnd: string;
  taskIds: string[];
}
