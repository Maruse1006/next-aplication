"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn ,useSession} from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../globals.css";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    criteriaMode: "all",
    shouldFocusError: true,
  });
  const { data: session, status } = useSession();
  if (session) redirect("/");
  // サーバーからのエラーメッセージを保持するためのステート
  const [resError, setResError] = useState("");
  const router = useRouter();
  //ログイン処理を行う非同期関数
  const handleLogin = async (data) => {
    const { email, password } = data; 
    const response = await fetch("/api/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (response.ok) {
      const result = await signIn("credentials", { email, password, redirect: false });  
      {
        // signInが失敗した場合のエラーハンドリング
        setResError("ログインに失敗しました。");
      }
    } else {
      const errorData = await response.json();
      setResError(errorData.message);
    }
  };
  

  return (
    <div className="bg-common-bg bg-no-repeat bg-cover bg-center min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 shadow-md rounded-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          ログイン
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleLogin)}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                メールアドレス
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 mb-5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="メールアドレス"
                {...register("email", {
                  required: "メールアドレスを入力してください",
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: "無効なメールアドレス形式です",
                  },
                  maxLength: {
                    value: 255,
                    message: "メールアドレスは255文字以内で入力してください",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                パスワード
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="パスワード"
                {...register("password", {
                  required: "パスワードを入力してください",
                  maxLength: {
                    value: 16,
                    message: "パスワードは16文字以内で入力してください",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={() => router.push("/top")}
              className="flex-1 mr-2 py-2 px-4 border border-black text-sm font-medium rounded-md text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              トップページへ
            </button>
            <button
              type="submit"
              className="flex-1 ml-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              ログイン
            </button>
          </div>
          {resError && (
            <p className="mt-2 text-center text-sm text-red-600">
              {resError}
            </p>
          )}
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          <Link href="/register" className="text-blue-600">
            新規登録はこちら
          </Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
