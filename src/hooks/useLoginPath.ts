import { useApiQuery } from "./apiHooks";

interface Credential {
  credentialType: string;
  createdAt: string;
  updatedAt: string;
}

interface LoginPathResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    credentials: Credential[];
  };
  success: boolean;
}

export const useLoginPath = () => {
  return useApiQuery<LoginPathResponse>({
    method: "GET",
    endpoint: "/api/v1/members/login/path",
  });
};