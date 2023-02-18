import getConfig from "next/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "@/lib/store";

const { publicRuntimeConfig } = getConfig();

export const filesApiSlice = createApi({
  reducerPath: "files-api",
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  baseQuery: fetchBaseQuery({
    baseUrl: publicRuntimeConfig.API_PATH,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.auth?.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Files"],
  endpoints(builder) {
    return {
      getFiles: builder.query<any[], void>({
        query: () => ({ url: `/files` }),
      }),
      createFile: builder.mutation<any, Partial<any>>({
        query: (body) => ({ url: "/files", method: "POST", body }),
      }),
    };
  },
});

// export hooks for usage in functional components
export const {
  useGetFilesQuery,
  useCreateFileMutation,
  util: { getRunningQueriesThunk, getRunningMutationsThunk },
} = filesApiSlice;

// export endpoints for use in SSR
export const { getFiles, createFile } = filesApiSlice.endpoints;
