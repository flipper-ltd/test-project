import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import {
  persistCombineReducers,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import autoMergeLevel1 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1";
import logger from "redux-logger";
import navigationReducer from "@/features/navigation/navigationSlice";
import { filesApiSlice } from "@/features/files/filesApiSlice";
import { settingsApiSlice } from "@/features/settings/settingsApiSlice";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel1,
  whitelist: ["navigation"], // only navigation will be persisted
};

const _persistedReducer = persistCombineReducers(persistConfig, {
  navigation: navigationReducer,
  [filesApiSlice.reducerPath]: filesApiSlice.reducer,
  [settingsApiSlice.reducerPath]: settingsApiSlice.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: _persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          /* ignore persistance actions */
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          // ignoredActionPaths: ["navigation/setNavigation"],
        },
      }).concat(filesApiSlice.middleware, settingsApiSlice.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });
