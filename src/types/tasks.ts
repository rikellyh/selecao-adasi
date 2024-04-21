export type GetTasksResponse = Task[];

export interface Task {
  id: string;
  name: string;
}

export interface CreateTaskPayload {
  name: string;
}
