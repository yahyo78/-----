"use client";

import { useState } from "react";
import { useGetPriceTodayQuery } from "@/api/incomeApi";

// SHADCN Select
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface ConversionResponse {
  base: string;
  amount: number;
  date: string;
  converted: Record<string, number>;
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("TJS");
  const [toCurrency, setToCurrency] = useState("USD");

  // Backend params
  const params = {
    base: fromCurrency,
    amount: Number(amount) || 1,
  };

  const { data, isFetching, error } = useGetPriceTodayQuery(params);

  const currencies = data ? Object.keys(data.converted) : [];

  const convertedValue =
    data?.converted?.[toCurrency] !== undefined
      ? data.converted[toCurrency]
      : null;

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <div className="rounded-[28px] p-8 md:p-10 bg-white border shadow-lg w-full max-w-[100%] mx-auto mt-10">

      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
        💱 Конвертер валют
      </h2>
      <p className="text-gray-500 mb-10 text-base md:text-lg">
        Конвертация по актуальным курсам с backend API
      </p>

      {/* AMOUNT INPUT */}
      <div className="mb-8">
        <label className="font-semibold text-gray-700 text-lg">Сумма</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="
            w-full px-5 py-4 
            md:px-6 md:py-5 
            border rounded-2xl mt-2 text-lg md:text-xl 
            shadow-sm bg-gray-50 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            transition
          "
          placeholder="Введите сумму"
        />
      </div>

      {/* CURRENCY SELECTORS */}
      <div
        className="
          flex flex-col md:flex-row 
          items-stretch md:items-end 
          gap-4 md:gap-6 mb-10
        "
      >
        {/* FROM */}
        <div className="flex-1">
          <label className="font-semibold text-gray-700 text-lg">
            Из валюты
          </label>

          <Select value={fromCurrency} onValueChange={setFromCurrency}>
            <SelectTrigger
              className="
                w-full border rounded-[10px] p-[25px] px-4 mt-2 text-lg 
                bg-gray-50 shadow-sm
              "
            >
              <SelectValue placeholder="Выбрать валюту" />
            </SelectTrigger>

            <SelectContent className="text-lg">
              {currencies.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* SWAP BUTTON */}
        <div className="flex justify-center md:justify-start">
          <button
            onClick={swapCurrencies}
            className="
              mt-1 md:mt-[26px]
              p-[10px] 
              border rounded-[10px] text-2xl px-[15px]
              hover:bg-gray-100 shadow-sm transition
            "
          >
            ⇅
          </button>
        </div>

        {/* TO */}
        <div className="flex-1">
          <label className="font-semibold text-gray-700 text-lg">
            В валюту
          </label>

          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger
              className="
                w-full border rounded-[10px] py-4 p-[25px] px-4 mt-2 text-lg 
                bg-gray-50 shadow-sm
              "
            >
              <SelectValue placeholder="Выбрать валюту" />
            </SelectTrigger>

            <SelectContent className="text-lg">
              {currencies.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* RESULTS */}
      {isFetching && (
        <p className="text-blue-600 text-lg font-medium">Загрузка...</p>
      )}

      {error && (
        <p className="text-red-600 text-lg font-medium">
          Ошибка загрузки курса
        </p>
      )}

      {convertedValue !== null && !isFetching && (
        <div className="bg-blue-600 text-white rounded-2xl p-6 md:p-7 shadow-md">
          <p className="text-sm opacity-80">Результат:</p>

          <p className="text-2xl md:text-3xl font-bold mt-3">
            {amount} {fromCurrency} = {convertedValue.toFixed(2)} {toCurrency}
          </p>

          <p className="text-lg mt-4 opacity-90">
            1 {fromCurrency} ={" "}
            {(convertedValue / Number(amount)).toFixed(4)} {toCurrency}
          </p>
        </div>
      )}
    </div>
  );
}
