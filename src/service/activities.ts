import {
  CreateActivityPayload,
  GetActivitiesResponse,
} from "../types/activities";
import { api } from "./api";

const URL = `/activities`;

export const getActivities = async () => {
  const { data } = await api.get<GetActivitiesResponse>(URL);

  return data;
};

export const createActivities = async (payload: CreateActivityPayload) => {
  const { data } = await api.post(URL, {
    ...payload,
  });

  return data;
};

export const editActivities = async (payload: CreateActivityPayload) => {
  const { data } = await api.patch(`${URL}/${payload.selectedActivity}`, {
    studentCpf: payload.studentCpf,
    date: payload.date,
    scheduledStart: payload.scheduledStart,
    scheduledEnd: payload.scheduledEnd,
    taskIds: payload.taskIds,
  });

  return data;
};
