import Buscador from "@/app/ui/home/Buscador";
import ResultProducts from "@/app/ui/home/ResultProducts";
import React from "react";
import { Risque as letra } from "next/font/google";
const albertSans = letra({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export default function HomePrincipal() {
  return (
    <div className="container-home flex flex-col">
      <h1
        className={`${albertSans.className} text-center py-6 text-5xl tracking-wide text-white`}
      >
        Rapidin
      </h1>
      <div className="wrapper__search--result flex flex-col items-center mx-3">
        <Buscador />
        <div className="my-4 sm:w-auto w-full">
          <ResultProducts />
          <ResultProducts />
        </div>
      </div>
    </div>
  );
}
