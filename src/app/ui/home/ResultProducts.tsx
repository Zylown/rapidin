"use client"
import React from "react";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function ResultProducts() {
  return (
    <div className="wrapper-products my-6">
      <div className="container-products flex bg-slate-200 p-4 rounded-xl sm:gap-12 gap-4 sm:flex-row flex-col items-center sm:items-stretch">
        <div className="rounded-xl overflow-hidden aspect-square min-w-20 sm:w-28 w-2/3">
          <Image
            src="https://plazavea.vteximg.com.br/arquivos/ids/28516733-1000-1000/20111231.jpg"
            alt="producto"
            width={300} // Establece el ancho deseado
            height={300} // Establece la altura deseada
            priority
          />
        </div>
        <div className="products__description flex flex-col justify-between sm:w-auto w-full">
          <div className="flex flex-col justify-between">
            <div className="flex justify-between">
              <h3 className="text-xs uppercase">Inca Kola</h3>
              <h3 className="text-xs uppercase">Plaza vea</h3>
            </div>
            <p className="font-semibold sm:text-base text-sm">
              Gaseosa INCA KOLA Sabor Original Botella 1L
            </p>
          </div>
          <hr className="w-full h-0.5 bg-gray-600 opacity-20 rounded my-2"></hr>
          <div className="flex flex-col gap-1">
            <p className="text-xs flex justify-between">
              Precio Regular{" "}
              <span className="line-through opacity-40">S/ 5.00</span>
            </p>
            <p className="text-sm flex justify-between">
              Precio Online{" "}
              <span className="font-semibold text-red-600">S/ 4.50</span>{" "}
            </p>
            <a
              href="https://www.plazavea.com.pe/gaseosa-inca-kola-sabor-original-botella-1l/p"
              target="_blank"
              className="text-sm font-semibold flex items-center justify-between"
            >
              Link donde se vende{" "}
              <span className="hover:scale-105 transition-all">
                <FaExternalLinkAlt />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
