import React from "react";
import imageLogo from "@/public/sdf.svg";
import Image from "next/image";



const Footer = () => {
  return (
    <div className="w-full bg-gradient-to-br from-[#2a2d44] via-[#2f3552] to-[#1e3a8a] text-white rounded-t-[36px] px-6 md:px-12 lg:px-20 py-14 ">
      {/* TOP AREA */}
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        {/* LEFT SIDE – LOGO + SOCIAL + MOBILE APPS */}
        <div className="flex flex-col gap-6 max-w-[300px]">
          {/* LOGO PLACEHOLDER */}
          <div className="w-[140px] h-[40px]  rounded-xl flex items-center justify-center text-sm text-white/70">
            <Image src={imageLogo} alt="" />
          </div>

          {/* Social Icons */}
          <div className="flex flex-col gap-2">
            <p className="text-white/70 text-sm">
              Мы в соцсетях и мессенджерах
            </p>

            <div className="flex items-center gap-3 text-xl opacity-80">
              <i className="ri-facebook-fill"></i>
              <i className="ri-instagram-fill"></i>
              <i className="ri-youtube-fill"></i>
              <i className="ri-telegram-fill"></i>
              <i className="ri-linkedin-fill"></i>
            </div>
          </div>

          {/* Mobile apps */}
          <div className="flex flex-col gap-2">
            <p className="text-white/70 text-sm">Мобильное приложение</p>
            <div className="flex gap-3">
              <div className="w-[120px] h-[40px] bg-white/10 rounded-xl flex items-center justify-center text-xs">
                App Store
              </div>
              <div className="w-[120px] h-[40px] bg-white/10 rounded-xl flex items-center justify-center text-xs">
                Google Play
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – CONTACT CARD */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-5 max-w-[260px] text-sm flex flex-col gap-3">
          <p className="text-white/70">Контакт-центр</p>

          <div className="flex flex-col text-lg font-medium">
            <span>808</span>
            <span className="text-xl">+992 44-600-0-600</span>
          </div>

          <p className="text-white/70 mt-2">Телефон доверия НБТ</p>
          <span className="text-lg font-medium">+992 44-600-1-520</span>

          <div className="flex flex-col gap-2 text-sm mt-3">
            <span className="opacity-80 cursor-pointer">Для приема жалоб</span>
            <span className="opacity-80 cursor-pointer">Чат Бот</span>
            <span className="opacity-80 cursor-pointer">Написать письмо</span>
          </div>
        </div>
      </div>

      {/* NAVIGATION STRIP */}
      <div className="w-full border-t border-white/10 mt-12 pt-6 text-sm flex flex-wrap gap-6">
        <span className="cursor-pointer opacity-80 hover:opacity-100">
          О банке
        </span>
        <span className="cursor-pointer opacity-80 hover:opacity-100">
          Корпоративное управление
        </span>
        <span className="cursor-pointer opacity-80 hover:opacity-100">
          Лента событий
        </span>
        <span className="cursor-pointer opacity-80 hover:opacity-100">
          Вакансии
        </span>
        <span className="cursor-pointer opacity-80 hover:opacity-100">
          Офисы и банкоматы
        </span>
      </div>

      {/* BIG MENU GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 text-sm opacity-90">
        {/* Column 1 */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">ЧАСТНЫМ ЛИЦАМ</h3>
          <span>Переводы и платежи</span>
          <span>Депозиты</span>
          <span>Срочный депозит</span>
          <span>Сберегательный счет</span>
          <span>Кредиты</span>
          <span>Ипотека</span>
          <span>Тарифы</span>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">ПРЕДПРИНИМАТЕЛЯМ</h3>
          <span>Кредиты</span>
          <span>Микрокредиты</span>
          <span>Экспресс-кредит</span>
          <span>Агрокредиты</span>
          <span>Таскини Сабз</span>
          <span>Рушди деҳот</span>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">КОМПАНИЯМ</h3>
          <span>Банковское обслуживание</span>
          <span>Срочный депозит</span>
          <span>Расчетно-кассовое обслуживание</span>
          <span>Кредитование бизнеса</span>
          <span>Торговое финансирование</span>
          <span>Тарифы</span>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/10 mt-10 pt-4 text-white/50 text-xs text-center">
        © 2025 Все права защищены.
      </div>
    </div>
  );
};

export default Footer;
