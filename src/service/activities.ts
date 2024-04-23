import {
  CreateActivityPayload,
  EndActivity,
  GetActivitiesResponse,
  StartActivity,
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

export const deleteActivities = async (id: string) => {
  const { data } = await api.delete(`${URL}/${id}`);

  return data;
};

export const startActivities = async (payload: StartActivity) => {
  const { data } = await api.post(`${URL}/start/${payload.selectedActivity}`, {
    start: payload.start,
  });

  return data;
};

export const endActivities = async (payload: EndActivity) => {
  const { data } = await api.post(`${URL}/end/${payload.selectedActivity}`, {
    end: payload.end,
  });

  return data;
};
