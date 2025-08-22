import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient.ts";
import { useApiMutation } from "./apiHooks";

interface UploadPortfolioLinkPayload {
  name: string;
  fileUrl: string;
}

interface UploadPortfolioResult {
  id: number;
  name: string;
  fileUrl: string;
}


export const useUploadPortfolioFile = (options?: {
  onSuccess?: (data: UploadPortfolioResult) => void;
  onError?: (error: unknown) => void;
}) =>
  useApiMutation<FormData, UploadPortfolioResult>({
    method: "POST",
    endpoint: import.meta.env.VITE_API_UPLOAD_PORTFOLIO_FILE,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

export const useUploadPortfolioLink = () =>
  useApiMutation<UploadPortfolioLinkPayload, UploadPortfolioResult>({
    method: "POST",
    endpoint: import.meta.env.VITE_API_UPLOAD_PORTFOLIO_LINK,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPortfolio"] });
    },
  });


export const useUploadPortfolioFileDirect = () =>
  useMutation({
    mutationFn: async (formData: FormData): Promise<UploadPortfolioResult> => {
      const res = await fetch(import.meta.env.VITE_API_UPLOAD_PORTFOLIO_FILE, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload portfolio file");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPortfolio"] });
    },
  });