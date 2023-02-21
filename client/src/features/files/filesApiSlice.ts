import getConfig from "next/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { FileElement } from "@/types/file.schema";
import { StreamPipeOptions } from "stream/web";

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
      return headers;
    },
  }),
  tagTypes: ["Files"],
  endpoints(builder) {
    return {
      createFile: builder.mutation<FileElement[], FormData>({
        query: (body) => ({ url: "/files", method: "POST", body }),
      }),
      getFiles: builder.query<FileElement[], void>({
        query: () => ({ url: `/files` }),
      }),
      getFile: builder.query<FileElement, string>({
        query: (publicKey) => ({
          url: `/files/${encodeURIComponent(publicKey)}`,
        }),
      }),
      deleteFile: builder.mutation<FileElement, string>({
        query: (privateKey) => ({
          url: `/files/${encodeURIComponent(privateKey)}`,
          method: "DELETE",
        }),
      }),
      getDownloadFile: builder.query<StreamPipeOptions, string>({
        query: (publicKey) => ({
          url: `/files/download/${encodeURIComponent(publicKey)}`,
        }),
      }),
    };
  },
});

// export hooks for usage in functional components
export const {
  useGetFilesQuery,
  useCreateFileMutation,
  useLazyGetFileQuery,
  useLazyGetDownloadFileQuery,
  useDeleteFileMutation,
  util: { getRunningQueriesThunk, getRunningMutationsThunk },
} = filesApiSlice;

// export endpoints for use in SSR
export const { getFiles, createFile, getFile, deleteFile, getDownloadFile } =
  filesApiSlice.endpoints;
