    // src/services/predictionApi.ts
    import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

    export interface PredictionRequest {
    currency: 'USD' | 'EUR' | 'RUB';
    type: 'buy' | 'sell';
    current_rate: number;
    }

    export interface PredictionResponse {
    currency: string;
    type: string;
    current_rate_used: number;
    predictions: {
        date: string;   // "2025-11-29"
        rate: number;
    }[];
    model: string;
    }

    export const predictionApi = createApi({
    reducerPath: 'predictionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/',   // ← поменяй на свой бэк при деплое
    }),
    endpoints: (builder) => ({
        get7DaysPrediction: builder.mutation<PredictionResponse, PredictionRequest>({
        query: (body) => ({
            url: 'currency/predict/7days/',
            method: 'POST',
            body,
        }),
        }),
    }),
    });

    // Экспортируем хук (он самогенерируется!)
    export const { useGet7DaysPredictionMutation } = predictionApi;