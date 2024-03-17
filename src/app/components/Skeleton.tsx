import React from "react";
import Image from "next/image";
import noImage from "../assets/loading-spinner-svgrepo-com.svg";

export default function Skeleton() {
  return (
    <div className="wrapper-products my-6 sm:px-5 px-1 sm:max-w-full max-w-[50%]">
      <div className="container-products flex sm:h-[450px] h-[300px] bg-slate-200 sm:p-4 p-2 rounded-xl sm:gap-12 gap-4 flex-col items-center sm:w-[230px]">
        <div
          className="loading-spinner rounded-xl overflow-hidden aspect-square min-w-20 sm:w-48 w-2/3 flex
        justify-center"
        >
          <Image
            src={noImage}
            alt="no imagen"
            width={50} // Establece el ancho deseado
            height={50} // Establece la altura deseada
            priority
          />
        </div>
        <div className="products__description sm:max-w-52 flex flex-col justify-between w-full">
          <div className="flex flex-col justify-between">
            <div className="flex justify-between">
              <h3 className="h-4 bg-gray-300 w-full rounded-full mb-2"></h3>
            </div>
            <p className="h-4 bg-gray-300 w-full rounded-full"></p>
          </div>
          <hr className="w-full h-0.5 bg-gray-600 opacity-20 rounded my-2"></hr>
          <div className="flex flex-col gap-1">
            <h3 className="h-3 bg-gray-300 w-full rounded-full mb-2"></h3>
            <h3 className="h-3 bg-gray-300 w-full rounded-full mb-2"></h3>
            <h3 className="h-3 bg-gray-300 w-full rounded-full"></h3>
          </div>
        </div>
      </div>
    </div>
  );
}
