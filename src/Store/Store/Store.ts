import { configureStore } from "@reduxjs/toolkit";
import { quizApi } from "../../pages/Quizzes/quizApi";
import authReducer from "../AuthanticationSlice/AuthSlice";
import QuestionReducer from "../QuestionSlice/QuestionSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ResultsApiSlice } from "../ResultsSlice/ResultsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    Question: QuestionReducer,
    [quizApi.reducerPath]: quizApi.reducer,
    [ResultsApiSlice.reducerPath]: ResultsApiSlice.reducer, // ✅ Add Results reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(quizApi.middleware)
      .concat(ResultsApiSlice.middleware), // ✅ Add Results middleware
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
