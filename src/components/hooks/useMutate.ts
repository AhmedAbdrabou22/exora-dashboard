import { useMutation } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import type { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import type { CError_TP } from "../../types";

type useMutateProps_TP<response_T, request_T = unknown> = {
  endpoint: string;
  mutationKey: [string];
  onSuccess?: (data: response_T, variables: request_T) => void;
  onError?: (err: CError_TP) => void;
  formData?: boolean;
  onMutate?: (err?: unknown) => void;
  method?: "post" | "delete" | "put" | "patch";
};

export function useMutate<response_T, request_T = unknown>({
  endpoint,
  mutationKey,
  onError,
  onSuccess,
  formData,
  onMutate,
  method = "post",
}: useMutateProps_TP<response_T, request_T>): UseMutationResult<
  AxiosResponse<response_T>,
  CError_TP,
  request_T,
  unknown
> & {
  isLoading: boolean;
} {
  const user_token = Cookies.get("token");
  const token = user_token;
  const authorizationHeader = `Bearer ${token}`;
   const baseURL = import.meta.env.VITE_API_BASE_URL as string;

  const mutation = useMutation({
    mutationKey,
    mutationFn: (values: request_T) => {
      const requestConfig = {
        method: method.toUpperCase(),
        url: `${baseURL}/${endpoint}`,
        data: values,
        headers: formData
          ? {
              "Content-Type": "multipart/form-data",
              Authorization: authorizationHeader,
              // 'Accept-Language': isRTL ? 'ar' : 'en',
            }
          : {
              "Content-Type": "application/json; charset=utf-8",
              Authorization: authorizationHeader,
              // 'Accept-Language': isRTL ? 'ar' : 'en',
            },
      };

      return axios(requestConfig);
    },
    // onSuccess: (data: AxiosResponse<response_T>) => {
    //   onSuccess?.(data.data);
    // },
    onSuccess: (
      data: AxiosResponse<response_T>,
      variables: request_T,
      context: unknown
    ) => {
      onSuccess?.(data.data, variables);
    },
    onError,
    onMutate,
  });

  return {
    ...mutation,
    isLoading: mutation.status === "pending",
  };
}
