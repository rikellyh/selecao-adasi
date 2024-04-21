import { CreateTaskPayload, GetTasksResponse, Task } from "../types/tasks";
import { api } from "./api";

const URL = `/tasks`;

export const getTasks = async () => {
  const { data } = await api.get<GetTasksResponse>(URL);

  return data;
};

export const createTasks = async (payload: CreateTaskPayload) => {
  const { data } = await api.post(URL, {
    ...payload,
  });

  return data;
};

export const editTasks = async (payload: Task) => {
  const { data } = await api.patch(`${URL}/${payload.id}`, {
    name: payload.name,
  });

  return data;
};

export const deleteTasks = async (id: string) => {
  const { data } = await api.delete(`${URL}/${id}`);

  return data;
};
