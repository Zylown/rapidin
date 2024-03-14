"use client";
import HomePrincipal from "./pages/home/page";
// import { useEffect } from "react";
export default function Home() {
  // useEffect(() => {
  //   fetch("/api/search")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // });
  return (
    <div className="wrapper-home">
      <HomePrincipal />
    </div>
  );
}
