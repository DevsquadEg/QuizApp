import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import CookieServices from "./CookieServices";

const BASE_URL = "https://upskilling-egypt.com:3005/api";
const RESULTS_URLS = {
  resultsList: "/quiz/result",
}

export const ResultsApiSlice = createApi({
  reducerPath: "results",
  tagTypes: ["Results"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL, prepareHeaders: (headers) => {
      const token = CookieServices.get('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      } else {
        toast("you must login first");
      }
    },
  }),
  endpoints: (builder) => ({
    quizzesResults: builder.query({
      query: () => ({
        url: RESULTS_URLS.resultsList,
      }),
      providesTags: (result) =>
  result
    ? ['Results', ...result.map(({ _id }: any) => ({ type: 'Results', _id }))]
    : ['Results'],
    }),
  }),
})
export const { useQuizzesResultsQuery } = ResultsApiSlice
