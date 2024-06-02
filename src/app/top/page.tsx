// Home.js
"use client";
import Image from "next/image";
import RegisterHeader from "../components/RegisterHeader";
import Slider from "../components/Swiper";
// import "swiper/css";
import React from 'react';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MtSystem {
  id: number;
  wordingValue: string;
  isDelete: boolean;
}

export default function Top() {
  const router = useRouter();
  //システムマスタから取得したデータの状態変数を定義。
  const [data, setData] = useState<MtSystem[]>([]);

    async function fetchData() {
      try {
        const response = await fetch("/api/top");
        if (!response.ok) {
          throw new Error("Bad response");
        }
        const newData = await response.json();
        setData(newData);
      } catch (error) {
        console.error("Failed:", error);
      }
    }

    fetchData();
 

  return (
    <>
      <RegisterHeader />
      <main className="bg-home-bg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-between p-4 sm:p-8 md:p-24 min-h-screen"> 
        <div className="text-center mb-4 max-w-4xl">
          <h1 className="mt-20 md:mt-0 text-white text-2xl sm:text-5xl md:text-6xl  lg:text-4xl font-bold text-shadow-lg mb-4">
            敵を倒そう
          </h1>
          {data.map(item => (
            <p className="text-white text-lg sm:text-xl md:text-2xl text-shadow-md mt-8 mb-16 mx-auto w-64 sm:w-2/3 md:w-4/5" key={item.id}>
              {item.wordingValue}
            </p>
          ))}
         
        </div>
        <div className="flex flex-col items-center justify-center mb-4 h-64 w-2/3 md:w-4/5 lg:w-2/5"> 
          <Slider />
          <button
            className="mt-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 sm:px-8 md:px-10 rounded focus:outline-none focus:shadow-outline w-48 sm:w-56"
            onClick={() => router.push("/register")}
          >
            筋トレを始めよう
          </button>
        </div>
      </main>
    </>
  );
}