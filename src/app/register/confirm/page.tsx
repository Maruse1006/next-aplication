"use client";
import "../../globals.css";
import Chart from "../../components/PieChart";
import React, { useState } from "react"; 
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

const Confirm = () => {
  const router = useRouter();
  const { getValues, handleSubmit } = useFormContext();

  const [errorMessage, setErrorMessage] = useState("");

  const values = getValues();
  console.log("Form values at load:", values); // フォームの値を読み込み時にログ出力

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form:", values); // フォーム送信時にログ出力

    try {
      const response = await fetch("/api/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json(); // レスポンスのJSONを解析
      console.log("Response data:", data); // レスポンスデータをログ出力

      if (!response.ok) {
        console.log("Response not ok, error message:", data.message); // 応答が正常でない場合のログ
        setErrorMessage(data.message);
        return; // ここで処理を中断
      }

      console.log("Registration successful:", data); // 登録成功時のログ
      router.push("./complete"); // 完了ページに遷移
    } catch (error) {
      console.error("Registration failed:", error); // 登録失敗時のエラーログ
      setErrorMessage("登録に失敗しました。エラーを確認してください。");
    }
  };

  return (
    <main>
      <div className="w-64 h-64 p-5 absolute right-0 top-0">
        <Chart />
      </div>
      <div className="flex justify-center items-center min-h-screen bg-[register-pattern] text-gray-700">
        <div className="w-full max-w-md px-4 py-8 rounded">
          <h1 className="text-center text-gray-700 font-bold mb-6">
            会員登録ページ確認画面
          </h1>
          <a className="text-center text-gray-700 font-bold mb-6 py-8">
            下記の内容でよろしいでしょうか。よろしければ、登録を押してください。
          </a>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                お名前
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="名前を入力"
                name="name"
                value={values.name}
                //読み取り専用に設定
                readOnly
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                メールアドレス
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="メールアドレスを入力"
                name="email"
                value={values.email}
                //読み取り専用に設定
                readOnly
              />
            </div>
            <div className="mb-4">
              <span className="text-gray-700 text-sm font-bold mb-2 block">
                性別:
              </span>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="sex"
                  value="male"
                  checked={values.sex === "male"}
                  onChange={() => {}}
                  className="form-radio"
                />
                <span className="ml-2">男性</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="sex"
                  value="female"
                  checked={values.sex === "female"}
                  onChange={() => {}}
                  className="form-radio"
                />
                <span className="ml-2">女性</span>
              </label>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                パスワード
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="パスワードを入力"
                name="password"
                value={values.password}
                //読み取り専用に設定
                readOnly
              />
            </div>
            <div className="flex items-center justify-center space-x-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-64">
                登録
              </button>

              <button
                type="button" 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline w-64"
                onClick={() => router.back()} // onClickでrouter.backを呼び出し
              >
                前のページへ
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Confirm;