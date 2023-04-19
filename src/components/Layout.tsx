import React from "react";
import { redirect } from "react-router-dom";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  console.log(window.location.pathname);

  if (
    (window.location.pathname === "/signup" ||
      window.location.pathname === "/signin") &&
    localStorage.getItem("access_token")
  ) {
    console.log("redirect!!");

    redirect("/todo");
    return <>투두 이동</>;
  }

  if (
    window.location.pathname === "/todo" &&
    !localStorage.getItem("access_token")
  ) {
    redirect("signin");
    return <>로그인 페이지로 이동</>;
  }
  return <>{children}</>;
}
