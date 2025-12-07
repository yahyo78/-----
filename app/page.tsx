"use client";

import ExchangeRates from "@/components/exchange-rates";
import CurrencyConverter from "@/components/currency-converter";
import RateForecast from "@/components/rate-forecast";
import Image from "next/image";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import imageGasanov2 from "@/public/Aksiya web2 (3).png";
import imageGasanov from "@/public/Container.png";

// images
import imageLogo from "@/public/Link.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import ExchangeRatesTailwind from "@/components/myComponents/exchangeRates";
import Link from "next/link";
import { Wallet } from "lucide-react";

export default function page() {
  return (
    <div className="main-container">
      <section className="m-auto xl:px-0 px-[20px] my-[50px]">
        <Swiper
          spaceBetween={16}
          centeredSlides={false}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper xl:w-[90%]  xl:h-[70vh] w-full"
        >
          <SwiperSlide className="xl:w-[90%]">
            <div className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* LEFT TEXT */}
              <aside className="w-full md:w-1/2 flex flex-col justify-center px-6 py-6 md:px-12 md:py-0">
                <h1 className="font-extrabold text-2xl md:text-[38px] leading-tight text-gray-900">
                  Мгновенная <br /> конвертация валют <br /> онлайн
                </h1>

                <div className="flex justify-center">
                  <p className="mt-3 text-gray-700 text-sm md:text-lg max-w-[340px]">
                    Без комиссии. В любое время. В любом месте.
                  </p>
                </div>

                <div>
                  <Link
                    href="/home"
                    className="mt-5 text-center inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-full text-base md:text-lg font-medium hover:bg-blue-700 transition"
                  >
                    Открыть конвертер
                  </Link>
                </div>
              </aside>

              {/* IMAGE */}
              <aside className="w-full md:w-1/2 h-[240px] md:h-[70vh] relative">
                <Image
                  src={imageGasanov}
                  alt="promo"
                  className="w-full h-full object-cover md:scale-[1.08] md:opacity-[0.92]"
                  priority
                />
                <div className="absolute xl:hidden inset-0 bg-gradient-to-t from-[#1e3a8a55] via-[#ffffff00] to-transparent"></div>
              </aside>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* LEFT TEXT */}
              <aside className="w-full md:w-1/2 flex flex-col justify-center px-6 py-6 md:px-12 md:py-0">
                <h1 className="font-extrabold text-2xl md:text-[40px] leading-tight text-gray-900">
                  Лучший сервис <br /> для обмена валют
                </h1>

                <div className="flex justify-center">
                  <p className="mt-3 text-gray-600 text-sm md:text-lg max-w-[360px]">
                    Быстро. Удобно. В реальном времени. Обновление курсов каждую
                    секунду.
                  </p>
                </div>

                <div>
                  <Link
                    href="/home"
                    className="mt-5 text-center inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-full text-base md:text-lg font-medium hover:bg-blue-700 transition"
                  >
                    Начать конвертацию
                  </Link>
                </div>
              </aside>

              {/* IMAGE */}
              <aside className="w-full md:w-1/2 h-[240px] md:h-[70vh] relative">
                <Image
                  src={imageGasanov2}
                  alt="promo"
                  className="w-full h-full object-cover md:scale-[1.05]"
                />
                <div className="absolute xl:hidden inset-0 bg-gradient-to-t from-[#1e3a8a55] via-[#ffffff00] to-transparent"></div>
              </aside>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <section>
        <ExchangeRatesTailwind />
      </section>

      

      <style jsx>{`
        .main-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: linear-gradient(
            135deg,
            var(--background-light) 0%,
            #f1f5f9 100%
          );
        }

        .app-header {
          // background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
          padding: 3rem 1.5rem;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 80, 200, 0.15);
          position: relative;
          overflow: hidden;
        }

        .app-header::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
              circle at 20% 50%,
              rgba(0, 212, 255, 0.1) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 80%,
              rgba(0, 212, 255, 0.05) 0%,
              transparent 50%
            );
          pointer-events: none;
        }

        .header-content {
          position: relative;
          z-index: 1;
        }

        .header-title {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .bank-emoji {
          font-size: 2.5rem;
          display: inline-block;
        }

        .header-title h1 {
          margin: 0;
          font-size: 2.75rem;
          color: white;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .header-subtitle {
          margin: 0;
          font-size: 1.15rem;
          color: rgba(255, 255, 255, 0.95);
          font-weight: 500;
          letter-spacing: 0.2px;
        }

        .app-main {
          flex: 1;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          padding: 2.5rem 1.5rem;
        }

        .app-footer {
          background: var(--text);
          color: white;
          text-align: center;
          padding: 2rem 1.5rem;
          margin-top: auto;
          font-size: 0.9rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .app-footer p {
          margin: 0;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 0.3px;
        }

        @media (max-width: 768px) {
          .app-header {
            padding: 2rem 1rem;
          }

          .header-title {
            flex-direction: column;
            gap: 0.5rem;
          }

          .bank-emoji {
            font-size: 2rem;
          }

          .header-title h1 {
            font-size: 1.85rem;
          }

          .header-subtitle {
            font-size: 1rem;
          }

          .app-main {
            padding: 1.5rem 1rem;
          }
        }

        @media (max-width: 480px) {
          .header-title h1 {
            font-size: 1.5rem;
          }

          .header-subtitle {
            font-size: 0.9rem;
          }

          .app-main {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
