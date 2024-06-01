"use client";

import "../globals.css";
import { useFormContext, useForm } from "react-hook-form";
import PieChart from "../components/PieChart";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const router = useRouter();

  useEffect(() => {
    sessionStorage.removeItem("registrationStep");
  }, [router]);

  const registrationColors = ["#FFFFDD", "#FFFFDD", "#FFFF11"];
  const data = [
    { name: "確認", value: 1 },
    { name: "完了", value: 1 },
    { name: "登録", value: 1 },
  ];

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useFormContext();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data); // デバッグ用のログ
    sessionStorage.setItem("registrationData", JSON.stringify(data));
    sessionStorage.setItem("registrationStep", "confirm");
    router.push("/register/confirm");
  });

  return (
    <main>
      <div className="relative flex justify-center items-center min-h-screen bg-[register-pattern] text-gray-700">
        <div className="w-full max-w-md px-4 py-8 rounded">
          <PieChart
            className="md:w-64 md:h-64 w-1 h-2 p-5 absolute right:0 md:right-20 top-0 flex justify-end"
            data={data}
            colors={registrationColors}
          />
          <h1 className="text-center text-gray-700 font-bold mb-6 text-2xl">
            会員登録
          </h1>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2 text-xl"
              >
                お名前
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "お名前は必須です",
                  maxLength: {
                    value: 50,
                    message: "名前は50文字以内で入力してください",
                  },
                  pattern: {
                    value: /^[a-zA-Zぁ-んァ-ン一-龥0-9IVXLCDM０-９\s]*$/,
                    message: "顔文字、絵文字、特殊文字を使用しないでください",
                  },
                })}
                name="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="お名前を入力にしてください"
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2 text-xl"
              >
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "メールアドレスは必須です",
                  maxLength: {
                    value: 255,
                    message: "メールアドレスは255文字以内で入力してください",
                  },
                  pattern: {
                    value: /^[a-z0-9\-._@]+$/,
                    message:
                      "メールアドレスに使用できるのは、半角英小文字、数字、ハイフン、ドット、アンダーバーのみです",
                  },
                })}
                name="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="example@gmail.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 text-sm font-bold mb-2 text-xl"
              >
                電話番号
              </label>
              <input
                type="phoneNumber"
                id="phoneNumber"
                {...register("phoneNumber", {
                  maxLength: {
                    value: 11,
                    message: "電話番号は11文字以内で入力してください",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "電話番号は半角数字のみ入力してください",
                  },
                })}
                name="phoneNumber"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="電話番号を入力してください"
              />
              <p>※半角数字で入力してください。</p>
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs italic">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <span className="text-gray-700 text-sm font-bold mb-2 block text-xl">
                性別:
              </span>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  id="sex"
                  {...register("sex", {
                    required: "性別を選択してください",
                  })}
                  value="male"
                  className="form-radio"
                />
                <span className="ml-2">男性</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  id="sex"
                  {...register("sex", {
                    required: "性別を選択してください",
                  })}
                  value="female"
                  className="form-radio"
                />
                <span className="ml-2">女性</span>
              </label>
            </div>
            {errors.sex && (
              <p className="text-red-500 text-xs italic">
                {errors.sex.message}
              </p>
            )}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700  font-bold mb-2 text-xl"
              >
                パスワード
              </label>
              <input
                type={passwordShown ? "text" : "password"}
                id="password"
                {...register("password", {
                  required: "パスワードは必須です",
                  maxLength: {
                    value: 16,
                    message: "パスワードは16文字以内で入力してください",
                  },
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{1,}$/,
                    message: "英字と数字を組み合わせてください",
                  },
                })}
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="パスワードを入力してください"
              />
              <p>※16字以内の英数字で入力してください。</p>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                {passwordShown ? (
                  <VisibilityOffIcon
                    onClick={togglePasswordVisibility}
                    className="cursor-pointer"
                  />
                ) : (
                  <VisibilityIcon
                    onClick={togglePasswordVisibility}
                    className="cursor-pointer"
                  />
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-bold mb-2 text-xl"
              >
                パスワード確認
              </label>
              <input
                type={confirmPasswordShown ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "パスワードの確認は必須です",
                  validate: (value) =>
                    value === getValues("password") ||
                    "パスワードが一致しません",
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="パスワードを再入力してください"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                {confirmPasswordShown ? (
                  <VisibilityOffIcon
                    onClick={toggleConfirmPasswordVisibility}
                    className="cursor-pointer"
                  />
                ) : (
                  <VisibilityIcon
                    onClick={toggleConfirmPasswordVisibility}
                    className="cursor-pointer"
                  />
                )}
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs italic">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-center space-x-4">
              <button
                className="bg-white hover:bg-blue-300 text-black font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline w-56"
                onClick={() => router.push("/")}
              >
                トップページへ
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline w-56"
                type="submit"
              >
                確認画面へ
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
