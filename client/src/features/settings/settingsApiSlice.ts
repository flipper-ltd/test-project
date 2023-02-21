import getConfig from "next/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { Setting } from "@/types/setting.schema";

const { publicRuntimeConfig } = getConfig();

export const settingsApiSlice = createApi({
  reducerPath: "settings-api",
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
  tagTypes: ["Settings"],
  endpoints(builder) {
    return {
      getSettings: builder.query<Setting, void>({
        query: () => ({ url: `/settings` }),
      }),
      createSetting: builder.mutation<Setting, Setting>({
        query: (body) => ({ url: "/settings", method: "POST", body }),
      }),
    };
  },
});

// export hooks for usage in functional components
export const {
  useGetSettingsQuery,
  useCreateSettingMutation,
  util: { getRunningQueriesThunk, getRunningMutationsThunk },
} = settingsApiSlice;

// export endpoints for use in SSR
export const { getSettings, createSetting } = settingsApiSlice.endpoints;
