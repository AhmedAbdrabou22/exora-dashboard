import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// import { notify } from "../utils/toast";
// import { ApiErrorResponse } from "../types/ApiErrorResponse";

interface UseFetchProps<TData> {
  queryKey: readonly unknown[];
  endpoint: string;
  enabled?: boolean;
  select?: (data: TData) => TData;
  onSuccess?: (data: TData) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
}

interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export function useFetch<TData>({
  queryKey,
  endpoint,
  enabled = true,
  select,
  onSuccess,
  onError,
}: UseFetchProps<TData>): UseQueryResult<TData, AxiosError<ApiErrorResponse>> {
  const navigate = useNavigate();

  const token = Cookies.get("token");

  const baseURL = import.meta.env.VITE_API_BASE_URL as string;

  const query = useQuery<TData, AxiosError<ApiErrorResponse>>({
    queryKey,
    enabled,
    queryFn: async () => {
      const response = await axios.get<TData>(`${baseURL}/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": "en",
        },
      });
      return response.data;
    },
    select,
  });

  // ✅ handle success
  useEffect(() => {
    if (query.isSuccess && query.data && onSuccess) {
      onSuccess(query.data);
    }
  }, [query.isSuccess, query.data, onSuccess]);

  // ✅ handle error
  useEffect(() => {
    if (query.isError && query.error) {
      const message = query.error.response?.data?.message;

      if (message && message !== "Tenant database name missing.") {
        // notify("error", message);
      }

      if (
        message === "Unauthenticated." ||
        message ===
          "Tenant header missing. Please send X-Tenant-Database or X-Tenant-ID." ||
        message === "Tenant database name missing."
      ) {
        Cookies.remove("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
      }

      if (onError) {
        onError(query.error);
      }
    }
  }, [query.isError, query.error, onError, navigate]);

  return query;
}
