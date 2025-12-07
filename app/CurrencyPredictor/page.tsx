"use client";

import { useState } from "react";
import { useGet7DaysPredictionMutation } from "@/api/predictionApi";

// SHADCN UI
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CurrencyPredictor() {
  const [trigger, { data, isLoading, error }] =
    useGet7DaysPredictionMutation();

  const [currency, setCurrency] = useState<"USD" | "EUR" | "RUB">("USD");
  const [type, setType] = useState<"buy" | "sell">("sell");
  const [rate, setRate] = useState<number>(9.3275);

  const handlePredict = () => {
    trigger({
      currency,
      type,
      current_rate: rate,
    });
  };

  return (
    <div className="max-w-[700px] mx-auto mt-10 p-8 bg-white shadow-xl rounded-3xl border">
      <h2 className="text-4xl font-bold mb-5 text-gray-900">
        📈 Прогноз курса на 7 дней
      </h2>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        
        {/* Currency */}
        <div>
          <label className="text-gray-700 font-medium">Валюта</label>
          <Select value={currency} onValueChange={(v) => setCurrency(v as any)}>
            <SelectTrigger className="mt-2 rounded-xl h-[55px] text-lg bg-gray-50">
              <SelectValue placeholder="Валюта" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="RUB">RUB</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Type */}
        <div>
          <label className="text-gray-700 font-medium">Тип операции</label>
          <Select value={type} onValueChange={(v) => setType(v as any)}>
            <SelectTrigger className="mt-2 rounded-xl h-[55px] text-lg bg-gray-50">
              <SelectValue placeholder="Тип" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sell">Продажа</SelectItem>
              <SelectItem value="buy">Покупка</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rate */}
        <div>
          <label className="text-gray-700 font-medium">Текущий курс</label>
          <Input
            type="number"
            step="0.0001"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-2 h-[55px] text-lg rounded-xl bg-gray-50"
          />
        </div>
      </div>

      {/* Button */}
      <Button
        onClick={handlePredict}
        disabled={isLoading}
        className="w-full h-[55px] text-lg rounded-xl bg-blue-600 hover:bg-blue-700"
      >
        {isLoading ? "Загрузка..." : "Спрогнозировать"}
      </Button>

      {/* Error */}
      {error && (
        <p className="text-red-600 mt-4">
          Ошибка: {(error as any)?.data?.error || "Неизвестная ошибка"}
        </p>
      )}

      {/* Result */}
      {data && (
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Прогноз {data.currency} ({data.type === "sell" ? "продажа" : "покупка"})
          </h3>

          <table className="w-full border-collapse rounded-xl overflow-hidden shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-lg">Дата</th>
                <th className="border p-3 text-lg">Курс</th>
              </tr>
            </thead>
            <tbody>
              {data.predictions.map((p) => (
                <tr key={p.date}>
                  <td className="border p-3 text-center">
                    {new Date(p.date).toLocaleDateString("ru-RU")}
                  </td>
                  <td className="border p-3 text-center font-medium">
                    {p.rate.toFixed(4)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-gray-500 text-sm mt-4">{data.model}</p>
        </div>
      )}
    </div>
  );
}
