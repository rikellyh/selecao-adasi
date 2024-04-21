import { GetActivitiesResponse } from "../types/activities";
import { api } from "./api";

const URL = `/activities`;

export const getActivities = async () => {
  const { data } = await api.get<GetActivitiesResponse>(URL);

  return data;
};
