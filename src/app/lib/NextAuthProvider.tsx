"use client";
import { SessionProvider } from "next-auth/react";

//全ページでsession取得が出来るようlayout.tsxに取得用Providerでラッピング
export const NextAuthProvider = ({ children }:{ children: React.ReactNode }) => {
  return (
    <SessionProvider> 
      {children}
    </SessionProvider>
  )
};