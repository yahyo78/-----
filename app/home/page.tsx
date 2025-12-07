"use client";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Image from "next/image";
import { Banknote, ArrowLeftRight, LineChart } from "lucide-react";
import imageLogo from "@/public/Link.svg";

import ExchangeRates from "@/components/exchange-rates";
import CurrencyConverter from "@/components/currency-converter";
import RateForecast from "@/components/rate-forecast";
import { Menu } from "lucide-react";
import { useEffect } from "react";

async function getTransactions() {
  try {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/transactions/report/`
    );
    console.log(data);
  } catch (error) {
    console.error();
  }
}

export default function Page() {
  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] dark:from-gray-900 dark:to-gray-800">
      

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Удобный обмен валют <span className="text-[#0050c8]">онлайн</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Актуальные курсы валют, мгновенная конвертация и точные прогнозы от
            Эсхата Bank
          </p>
        </section>

        <div className="space-y-16">
          <section id="rates" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
              <Banknote className="w-6 h-6 mr-2 text-cyan-600" />
              Текущие курсы валют
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <ExchangeRates />
            </div>
          </section>

          <section id="converter" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
              <ArrowLeftRight className="w-6 h-6 mr-2 text-cyan-600" />
              Конвертер валют
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <CurrencyConverter />
            </div>
          </section>

          <section id="forecast" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
              <LineChart className="w-6 h-6 mr-2 text-cyan-600" />
              Прогноз курсов
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <RateForecast />
            </div>
          </section>
        </div>
      </main>

    
      
    </div>
  );
}
