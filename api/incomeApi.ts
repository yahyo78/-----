// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = "http://127.0.0.1:8000/";

export const incomeApi = createApi({
  reducerPath: "incomeApi",
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  endpoints: (builder) => ({
    getTransactionData: builder.query({
      query: (params) => ({
        url: "transactions/transactions/list/",
        params: params, // 🔥 send filters to backend
      }),
    }),
    getPriceToday: builder.query({
      query: (params) => ({
        url: "currency/convert/",
        params: params, 
      }),
    }),
  }),
});

export const { useGetTransactionDataQuery,useGetPriceTodayQuery } = incomeApi;
