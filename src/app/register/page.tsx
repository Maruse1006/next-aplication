"use client";

import "../globals.css";
import { useFormContext } from "react-hook-form";
// import PieChart from '../components/PieChart';

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const router = useRouter();
  // パスワード表示制御用のstate (trueで表示、falseで非表示)
  const [passwordShown, setPasswordShown] = useState(false);

  // パスワードの表示・非表示を切り替える
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  //親コンポーネントで定義されているFormProviderに値を渡す。
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useFormContext();

  //確認画面へ遷移。
  const onSubmit = handleSubmit(async () => {
    router.push("/register/confirm");
  });

  return (
    <main className="">
      <div className="w-64 h-64 p-5 absolute right-0 top-0">
        {/* <PieChart  /> */}
      </div>
      <div className="flex justify-center items-center min-h-screen bg-[register-pattern] text-gray-700">
        <div className="w-full max-w-md px-4 py-8 rounded">
          <h1 className="text-center text-gray-700 font-bold mb-6">
            会員登録ページ
          </h1>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                お名前
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "お名前は必須です",
                })}
                name="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="ここにテキストを入力"
              />
              {/*バリデーションエラーを表示*/}
              {errors.name && (
                <p className="text-black-500 text-xs italic">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "メールアドレスは必須です",
                })}
                name="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="ここにテキストを入力"
              />
               {/*バリデーションエラーを表示*/}
              {errors.email && (
                <p className="text-black-500 text-xs italic">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <span className="text-gray-700 text-sm font-bold mb-2 block">
                性別:
              </span>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  id="sex"
                  {...register("sex")}
                  value="male"
                  className="form-radio"
                />
                <span className="ml-2">男性</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  id="sex"
                  {...register("sex")}
                  name="sex"
                  value="female"
                  className="form-radio"
                />
                <span className="ml-2">女性</span>
              </label>
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                パスワード
              </label>
              <input
                type={passwordShown ? "text" : "password"}
                id="password"
                {...register("password", {
                  required: "パスワードは必須です",
                  minLength: {
                    value: 8,
                    message: "パスワードは8文字以上で入力してください",
                  },
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message: "英字と数字を組み合わせてください",
                  },
                })}
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="ここにテキストを入力"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                {/*パスワードの表示、非表示の切り替え*/}
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
            {/*バリデーションエラーを表示*/}
              {errors.password && (
                <p className="text-black-500 text-xs italic">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirm"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                パスワード確認
              </label>
              <input
                type="password"
                id="passwordConfirm"
                {...register("passwordConfirm", {
                  required: "パスワードの確認は必須です",
                  validate: (value) =>
                    value === getValues("password") ||
                    "パスワードが一致しません",
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="ここにテキストを入力"
              />
              {/*バリデーションエラーを表示*/}
              {errors.password && (
                <p className="text-black-500 text-xs italic">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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