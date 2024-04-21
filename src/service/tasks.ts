import { CreateTaskPayload, GetTasksResponse } from "../types/tasks";
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
