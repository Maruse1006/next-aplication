"use client";

import "../../globals.css";
import PieChart from "../../components/PieChart";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormContext, FormProvider, useForm } from "react-hook-form";
import { RiLoaderFill } from "react-icons/ri";

const Confirm = () => {
  const router = useRouter();
  const methods = useForm();

  const confirmationColors = ["#FFFF11", "#FFFFDD", "#FFFF11"];
  const data = [
    { name: "確認", value: 1 },
    { name: "完了", value: 1 },
    { name: "登録", value: 1 },
  ];

  const [formData, setFormData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const step = sessionStorage.getItem("registrationStep");

    if (step !== "confirm") {
      router.push("/error");
      return;
    }

    const storedValues = JSON.parse(sessionStorage.getItem("registrationData"));
    if (storedValues) {
      setFormData(storedValues);
      setIsLoaded(true);
    }
  }, [router]);

  if (!isLoaded) {
    return (
      <div className="relative flex flex-col justify-center items-center min-h-screen bg-[register-pattern] text-gray-700">
        <div className="flex flex-col items-center justify-center">
          <div>Loading</div>
          <div className="mt-4">
            <RiLoaderFill className="w-32 h-32 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.message);
        return;
      }
      sessionStorage.removeItem("registrationStep");
      sessionStorage.setItem("registrationComplete", "true");
      router.push("/register/complete");
    } catch (error) {
      setErrorMessage("登録に失敗しました。エラーを確認してください。");
    }
  };

  const handleBack = () => {
    sessionStorage.removeItem("registrationStep");
    router.push("/register");
  };

  return (
    <FormProvider {...methods}>
      <main>
        <div className="relative flex justify-center items-center min-h-screen bg-[register-pattern] text-gray-700">
          <div className="w-full max-w-md px-4 py-8 rounded ">
            <PieChart
              className="w-64 h-64 p-5 absolute right-0 top-0"
              data={data}
              colors={["#FFFF11", "#FFFFDD", "#FFFF11"]}
            />
            <h1 className="text-center text-gray-700 font-bold mb-6 text-2xl">
              会員登録ページ確認画面
            </h1>
            <a className="text-center text-gray-700 font-bold mb-6 py-8 text-xl">
              下記の内容でよろしいでしょうか。よろしければ、登録を押してください。
            </a>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2 "
                  htmlFor="name"
                >
                  お名前
                </label>
                <p>{formData.name}</p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700  font-bold mb-2 text-xl"
                  htmlFor="email"
                >
                  メールアドレス
                </label>
                <p>{formData.email}</p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2 text-xl"
                  htmlFor="phoneNumber"
                >
                  電話番号
                </label>
                <p>{formData.phoneNumber}</p>
              </div>
              <div className="mb-4">
                <span className="text-gray-700 font-bold mb-2 block text-xl">
                  性別
                </span>
                <span className="ml-2">
                  {formData.sex === "male" ? "男性" : "女性"}
                </span>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700  font-bold mb-2 text-xl"
                  htmlFor="password"
                >
                  パスワード
                </label>
                <p>********</p>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <button
                  className="bg-white hover:bg-blue-300 text-black font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline w-64"
                  onClick={handleBack}
                >
                  前ページへ
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-64">
                  登録
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </FormProvider>
  );
};

export default Confirm;
