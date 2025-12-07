"use client";
import { useState } from "react";
import Image from "next/image";

// images
import imageFlag from "@/public/SVG.svg";
import Link from "next/link";
import { DollarSign } from "lucide-react";

// ---- TYPES ---- //
type CategoryKey = "private" | "business" | "transfers" | "gold";

interface Rate {
  flag: any;
  cur: string;
  buy: string;
  sell: string;
  nbt: string;
}

type RatesData = Record<CategoryKey, Rate[]>;

// ---- COMPONENT ---- //
export default function ExchangeRates() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("transfers");

  const categories: { id: CategoryKey; label: string }[] = [
    { id: "private", label: "Частным лицам" },
    { id: "business", label: "Юридическим лицам" },
    { id: "transfers", label: "Денежные переводы" },
    { id: "gold", label: "Стоимость золотых слитков" },
  ];

  const data: RatesData = {
    private: [
      { flag: imageFlag, cur: "USD", buy: "9.0800", sell: "9.2600", nbt: "9.2505" },
      { flag: imageFlag, cur: "EUR", buy: "10.6200", sell: "10.8300", nbt: "10.8027" },
      { flag: imageFlag, cur: "RUB", buy: "0.1170", sell: "0.1190", nbt: "0.1200" },
    ],
    business: [
      { flag: imageFlag, cur: "USD", buy: "9.0500", sell: "9.3000", nbt: "9.2505" },
      { flag: imageFlag, cur: "EUR", buy: "10.5800", sell: "10.8900", nbt: "10.8027" },
    ],
    transfers: [
      { flag: imageFlag, cur: "USD", buy: "9.0800", sell: "9.2600", nbt: "9.2505" },
      { flag: imageFlag, cur: "EUR", buy: "10.6200", sell: "10.8300", nbt: "10.8027" },
      { flag: imageFlag, cur: "RUB", buy: "0.1195 ▼", sell: "0.1214 ▼", nbt: "0.1200" },
    ],
    gold: [
      { flag: imageFlag, cur: "1г золота", buy: "600.00", sell: "620.00", nbt: "615.00" },
    ],
  };

  return (
    <div className="px-[5%] py-[50px]">
      <div className="bg-[#f5f6f8] rounded-[32px] p-10 mx-auto shadow">

        {/* Header */}
        <div className="flex justify-between xl:flex-row flex-col items-center">
          <div className="mb-6">
            <h2 className="text-4xl font-semibold text-gray-900">Курсы валют</h2>
            <p className="text-gray-500 text-lg mt-1">
              на <span className="font-medium">05.12.2025</span>
            </p>
          </div>
          <Link
            href="/home"
            className="xl:flex hidden items-center gap-2 bg-[#0050c8] text-white p-[15px] rounded-[10px] font-medium text-lg hover:opacity-80 transition-all duration-300"
          >
            Конвертер валют
            <DollarSign size={22} />
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-[20px] mb-10 w-full">
          {categories.map((c) => (
            <button
              key={c.id}
              className={`min-w-max px-6 py-3 rounded-full border text-gray-700 transition ${
                activeCategory === c.id
                  ? "bg-white border-gray-300 shadow-sm"
                  : "hover:bg-gray-200 bg-gray-100"
              }`}
              onClick={() => setActiveCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="w-full">
              <tr className="text-gray-500 text-lg">
                <th className="pb-5 xl:text-start text-center px-4">Валюта</th>
                <th className="pb-5 xl:text-start text-center px-4">Банк покупает</th>
                <th className="pb-5 xl:text-start text-center px-4">Банк продаёт</th>
                <th className="pb-5 xl:text-start text-center px-4">Курс НБТ</th>
              </tr>
            </thead>

            <tbody className="text-xl text-gray-900">
              {data[activeCategory].map((row, i) => (
                <tr key={i} className="border-t border-gray-200">
                  <td className="py-6 px-4 flex items-center gap-3">
                    <Image
                      src={row.flag}
                      alt={row.cur}
                      width={28}
                      height={20}
                      className="rounded-sm"
                    />
                    {row.cur}
                  </td>
                  <td className="px-4">{row.buy}</td>
                  <td className="px-3">{row.sell}</td>
                  <td className="px-4">{row.nbt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link
          href="/home"
          className="flex xl:hidden items-center justify-center my-[10px] gap-2 bg-[#0050c8] text-white p-[15px] rounded-[10px] font-medium text-lg hover:opacity-80 transition-all duration-300"
        >
          Конвертер валют
          <DollarSign size={22} />
        </Link>

        <p className="text-gray-500 text-sm mt-3">
          * курсы действительны на конвертацию в офисах банка и мобильном приложении
        </p>
      </div>
    </div>
  );
}
