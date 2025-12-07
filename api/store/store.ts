import { configureStore } from "@reduxjs/toolkit";
import { predictionApi } from "../predictionApi";
import { incomeApi } from "../incomeApi";

export const store = configureStore({
  reducer: {
    [incomeApi.reducerPath]: incomeApi.reducer,
    [predictionApi.reducerPath]: predictionApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      incomeApi.middleware,
      predictionApi.middleware
    ),
});

// TYPES
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
