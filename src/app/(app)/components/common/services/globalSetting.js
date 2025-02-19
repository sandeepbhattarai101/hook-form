import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const BASE_URL = "https://backend.figsflow.com"; // Replace with your API base URL

const axiosConfig = async () => {
  return {
    headers: {
      tenantId: "7cf20fe8-efda-49c1-bdea-760a630598a6",
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJTOUtWZC0wNjEybTdTM2pMOE9wdEpJcXg5cTFKaTVaN2ZJcjJudW53dlpzIn0.eyJleHAiOjE3NDAwNTE4NDQsImlhdCI6MTczOTk2NTQ0NCwianRpIjoiNGM3MTE5YmUtZTQxYS00ZTkxLThiOTEtODI2MzFkYmVjYWY4IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay50aGVjb21wYW55cmVnaXN0cmF0aW9uLmNvLnVrL3JlYWxtcy9zdGFnZSIsImF1ZCI6WyJhY2NvdW50IiwiNTJiYzE0MjktNDFhMy00MGQxLTg1ODQtNzM0YTNjNzU3MDljIl0sInN1YiI6IjdjMzBhMTFhLWFhMGUtNGNlMy1iOTAxLWJiMTBmMWM2NjJhOSIsInR5cCI6IkJlYXJlciIsImF6cCI6IlBNUyIsInNpZCI6ImI0YmVhOTVkLTg0NDYtNDY0ZC04MWY5LTk1MDU3ZGJlYzY4OCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLXN0YWdlIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6InNhbmRlZXAgQmhhdHRhcmFpIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2FuZGVlcGJoYXR0YXJhaTgyQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJzYW5kZWVwIiwiZmFtaWx5X25hbWUiOiJCaGF0dGFyYWkiLCJlbWFpbCI6InNhbmRlZXBiaGF0dGFyYWk4MkBnbWFpbC5jb20ifQ.fdZZi6cXWjNltFhiIwHWK31dGeowLDWoxkHqSGozC0WnMRsQCdPR6ykt0SNeZtPoURbpcfYT8XvzAEAtGRyJILkgtlCO7E36uisPhysGm_VI_VNTnvttkytN-92m315eTLCY2psjmiKhzbeDxSkM1NSKdJ9b--hqAnxENghWantoHyANMZhwgy57MP1sM0-AF9tYtltv60nA7_5Py_-X8G-jrm9SRO8FFHKXdg5TQy-m0CyqBPhcQdRR77hJasz8kmh9YJSPSaFCLCTiP6JSL0OLunkXShwvvh2hBsz4H0nQPKWutTGwqkxPiNA5lDwoN3MJaDoirG9ToTVikEAiCQ",
    },
  };
};

const fetchData = async (endpoint) => {
  const config = await axiosConfig();
  return axios.get(`${BASE_URL}${endpoint}`, config);
};

const postData = async ({ endpoint, data, header }) => {
  const config = await axiosConfig();
  return axios.post(`${BASE_URL}${endpoint}`, data, {
    ...config,
    headers: { ...config.headers, ...header },
  });
};

const putData = async ({ endpoint, data, header }) => {
  const config = await axiosConfig();
  return axios.put(`${BASE_URL}${endpoint}`, data, {
    ...config,
    headers: { ...config.headers, ...header },
  });
};

const patchData = async ({ endpoint, data, header }) => {
  const config = await axiosConfig();
  return axios.patch(`${BASE_URL}${endpoint}`, data, {
    ...config,
    headers: { ...config.headers, ...header },
  });
};

const deleteData = async (endpoint) => {
  const config = await axiosConfig();
  return axios.delete(`${BASE_URL}${endpoint}`, config);
};

// Fetch Data (Read)
export function useGetRequest(
  endpoint,
  queryKey,
  enable = true,
  staleTime = 0
) {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchData(endpoint),
    onError: (error) => {
      console.error("Fetching Error:", error?.response?.data || error?.message);
    },
    retry: false,
    enabled: enable,
    staleTime: staleTime,
  });
}

// Create Data (Create)
export function usePostRequest(
  endpoint,
  successMessage,
  invalidateQueryKey,
  header,
  errorMessage
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => postData({ endpoint, data, header }),
    onSuccess: (data) => {
      if (invalidateQueryKey)
        queryClient.invalidateQueries([invalidateQueryKey]);
      toast.success(successMessage, { toastId: endpoint });
      return data;
    },
    onError: (error) => {
      toast.error(
        errorMessage || error?.response?.data?.message || error.message,
        { toastId: endpoint }
      );
    },
  });
}

// Update Data (Update - PUT)
export function usePutRequest(endpoint, successMessage, invalidateQueryKey) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => putData({ endpoint, data }),
    onSuccess: (data) => {
      if (invalidateQueryKey)
        queryClient.invalidateQueries([invalidateQueryKey]);
      toast.success(successMessage, { toastId: endpoint });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });
}

// Update Data (Update - PATCH)
export function usePatchRequest(
  endpoint,
  successMessage,
  invalidateQueryKey,
  header
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => patchData({ endpoint, data, header }),
    onSuccess: (data) => {
      if (invalidateQueryKey)
        queryClient.invalidateQueries([invalidateQueryKey]);
      if (successMessage) toast.success(successMessage, { toastId: endpoint });
      return data;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message, {
        toastId: endpoint,
      });
    },
  });
}

// Delete Data (Delete)
export function useDeleteRequest(endpoint, successMessage, invalidateQueryKey) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteData(endpoint),
    onSuccess: () => {
      if (invalidateQueryKey) queryClient.invalidateQueries(invalidateQueryKey);
      toast.success(successMessage, { toastId: endpoint });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });
}

// Dynamic URL-based POST
export function useDynamicUrlPostRequest(
  baseEndpoint,
  successMessage,
  invalidateQueryKey
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dynamicParam, data }) => {
      const endpoint = `${baseEndpoint}/${dynamicParam}`;
      return postData({ endpoint, data });
    },
    onSuccess: (data) => {
      if (invalidateQueryKey)
        queryClient.invalidateQueries([invalidateQueryKey]);
      toast.success(successMessage, { toastId: baseEndpoint });
      return data;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });
}

// Dynamic URL-based PATCH
export function useDynamicUrlPatchRequest(
  baseEndpoint,
  successMessage,
  invalidateQueryKey,
  header
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dynamicParam, data }) => {
      const endpoint = `${baseEndpoint}/${dynamicParam}`;
      return patchData({ endpoint, data, header });
    },
    onSuccess: (data) => {
      if (invalidateQueryKey)
        queryClient.invalidateQueries([invalidateQueryKey]);
      if (successMessage)
        toast.success(successMessage, { toastId: baseEndpoint });
      return data;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });
}

// Custom GET Request
export function useCustomGetRequest(
  endpoint,
  queryKey,
  headers,
  enable = true
) {
  return useQuery({
    queryKey: [queryKey, endpoint],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_URL}${endpoint}`, { headers });
      return data;
    },
    onError: (error) => {
      console.error("Fetching Error:", error?.response?.data || error?.message);
    },
    retry: false,
    enabled: enable,
  });
}

// Custom POST Request
export function useCustomPostRequest(
  endpoint,
  successMessage,
  invalidateQueryKey,
  headers
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => {
      const { data } = await axios.post(`${BASE_URL}${endpoint}`, body, {
        headers,
      });
      return data;
    },
    onSuccess: (data) => {
      if (invalidateQueryKey)
        queryClient.invalidateQueries([invalidateQueryKey]);
      toast.success(successMessage, { toastId: endpoint });
      return data;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });
}
