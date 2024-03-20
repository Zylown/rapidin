"use client";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import { ProductsTypes } from "@/app/types/ProductsTypes";

export default function ResultProducts({
  imagen,
  nombre,
  priceRegular,
  priceOnline,
  urlVenta,
  tienda,
  resultSearch,
  index,
}: ProductsTypes) {
  return (
    <div className="wrapper-products my-6 sm:px-5 px-1 sm:max-w-full max-w-[50%]">
      <div className="container-products flex sm:h-[450px] h-[300px] bg-slate-200 sm:p-4 p-2 rounded-xl sm:gap-12 gap-4 flex-col items-center sm:w-[230px]">
        <div className="rounded-xl overflow-hidden aspect-square min-w-20 sm:w-48 w-2/3">
          <Image
            loading={index < 10 ? "eager" : "lazy"} // Si el index es menor a 4 carga la imagen de manera inmediata, si no carga la imagen de manera diferida
            src={imagen}
            alt={imagen}
            width={300} // Establece el ancho deseado
            height={300} // Establece la altura deseada
          />
        </div>
        <div className="products__description sm:max-w-52 flex flex-col justify-between w-full">
          <div className="flex flex-col justify-between">
            <div className="flex justify-between">
              <h3 className="text-xs uppercase">{resultSearch}</h3>
              <h3 className="text-xs uppercase font-semibold">{tienda}</h3>
            </div>
            <p className="font-semibold sm:text-base text-sm text-wrap">
              {nombre}
            </p>
          </div>
          <hr className="w-full h-0.5 bg-gray-600 opacity-20 rounded my-2"></hr>
          <div className="description__bottom flex flex-col gap-1">
            <p className="text-xs flex justify-between">
              Precio Regular{" "}
              <span className="line-through opacity-40">{priceRegular}</span>
            </p>
            <p className="text-sm flex justify-between">
              Precio Online{" "}
              <span className="font-semibold text-red-600">{priceOnline}</span>{" "}
            </p>
            <a
              href={urlVenta}
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
