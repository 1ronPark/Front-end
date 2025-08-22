import { useApiMutation } from "./apiHooks";

interface UpdateProfileBody {
  activities: {
    name: string;
    startDate: string;
    hasEndDate?: boolean;
    endDate?: string;
  }[];
}

export const useHistoryMutation = () =>
  useApiMutation<UpdateProfileBody, void>({
    method: "PUT",
    endpoint: "/api/v1/members/me/profile",
  });