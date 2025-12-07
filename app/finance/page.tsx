"use client";

import { useState, ChangeEvent } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { useGetTransactionDataQuery } from "@/api/incomeApi";

/* ------------------ TYPES ------------------ */

interface Transaction {
  id: number;
  type: "income" | "expense";
  amount: number;
  category: number;
  category_name: string;
  date: string;
}

interface TransactionResponse {
  transactions: Transaction[];
}

interface QueryParams {
  type?: string;
  category_name?: string;
  date_after?: string;
  date_before?: string;
  amount_min?: string;
  amount_max?: string;
}

/* ------------------ COMPONENT ------------------ */

export default function FinancePage() {
  // FILTER STATES
  const [type, setType] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [dateAfter, setDateAfter] = useState<string>("");
  const [dateBefore, setDateBefore] = useState<string>("");
  const [amountMin, setAmountMin] = useState<string>("");
  const [amountMax, setAmountMax] = useState<string>("");

  // BUILD PARAMS
  const params: QueryParams = {
    ...(type !== "all" && { type }),
    ...(category !== "all" && { category_name: category }),
    ...(dateAfter && { date_after: dateAfter }),
    ...(dateBefore && { date_before: dateBefore }),
    ...(amountMin && { amount_min: amountMin }),
    ...(amountMax && { amount_max: amountMax }),
  };

  // API CALL
  const { data, isFetching } = useGetTransactionDataQuery(params) as {
    data: TransactionResponse;
    isFetching: boolean;
  };

  const transactions: Transaction[] = data?.transactions || [];

  // LIST OF CATEGORIES
  const categoryList = [...new Set(transactions.map((i) => i.category_name))];

  return (
    <div className="px-[5%] py-[50px]">
      <div className="bg-white rounded-[32px] p-10 mx-auto shadow-md border border-gray-100 max-w-[1200px]">

        {/* HEADER */}
        <h2 className="text-4xl font-semibold text-gray-900 mb-8">
          История транзакций
        </h2>

        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* TYPE */}
          <div>
            <label className="block mb-2 text-gray-600 text-sm font-medium">
              Тип операции
            </label>

            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="bg-gray-50 border rounded-xl py-4 h-[52px]">
                <SelectValue placeholder="Тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все</SelectItem>
                <SelectItem value="income">Доход</SelectItem>
                <SelectItem value="expense">Расход</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block mb-2 text-gray-600 text-sm font-medium">
              Категория
            </label>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-gray-50 border rounded-xl py-4 h-[52px]">
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {categoryList.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* AMOUNT RANGE */}
          <div className="flex gap-3">
            <div className="w-full">
              <label htmlFor="min-amount" className="block mb-2 text-gray-600 text-sm">
                Мин сумма
              </label>
              <input
                id="min-amount"
                value={amountMin}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAmountMin(e.target.value)
                }
                type="number"
                placeholder="Мин"
                className="w-full bg-gray-50 border rounded-xl px-3 py-4 h-[52px]"
              />
            </div>

            <div className="w-full">
              <label htmlFor="max-amount" className="block mb-2 text-gray-600 text-sm">
                Макс сумма
              </label>
              <input
                id="max-amount"
                value={amountMax}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAmountMax(e.target.value)
                }
                type="number"
                placeholder="Макс"
                className="w-full bg-gray-50 border rounded-xl px-3 py-4 h-[52px]"
              />
            </div>
          </div>

          {/* DATE AFTER */}
          <div>
            <label htmlFor="date-after" className="block mb-2 text-gray-600 text-sm">
              Дата (с)
            </label>
            <input
              id="date-after"
              type="date"
              value={dateAfter}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDateAfter(e.target.value)
              }
              className="w-full bg-gray-50 border rounded-xl px-3 py-4 h-[52px]"
            />
          </div>

          {/* DATE BEFORE */}
          <div>
            <label htmlFor="date-before" className="block mb-2 text-gray-600 text-sm">
              Дата (до)
            </label>
            <input
              id="date-before"
              type="date"
              value={dateBefore}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDateBefore(e.target.value)
              }
              className="w-full bg-gray-50 border rounded-xl px-3 py-4 h-[52px]"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr className="text-gray-500 text-lg">
                <th className="px-5 py-4">Категория</th>
                <th className="px-5 py-4">Сумма</th>
                <th className="px-5 py-4">Тип</th>
                <th className="px-5 py-4">Дата</th>
              </tr>
            </thead>

            <tbody>
              {isFetching ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-gray-500">
                    Загружается...
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-gray-500">
                    Ничего не найдено
                  </td>
                </tr>
              ) : (
                transactions.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">{item.category_name}</td>

                    <td
                      className={`px-5 ${
                        item.type === "expense"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {item.type === "expense" ? "-" : "+"}
                      {item.amount}
                    </td>

                    <td className="px-5">
                      {item.type === "expense" ? "Расход" : "Доход"}
                    </td>

                    <td className="px-5">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
