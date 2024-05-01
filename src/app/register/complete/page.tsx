"use client";
import React from "react";
import "../../globals.css";
import Chart from "../../components/PieChart";
import { useRouter } from "next/navigation";

const Confirm = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    router.push("/");
  };

  

  return (
    <main className="">
      <div className="w-64 h-64 p-5 absolute right-0 top-0">
        <Chart />
      </div>
      <div className="flex justify-center items-center min-h-screen bg-[register-pattern] text-gray-700">
        <div className="w-full max-w-md px-4 py-8 rounded">
          <h1 className="text-center text-gray-700 font-bold mb-6">
            新規会員登録完了
          </h1>
          <p className="text-center">この度は会員登録ありがとうございます</p>
          <div className="flex justify-center"> 
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none" type="button" onClick={onSubmit}>
              トップページへ
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Confirm;
