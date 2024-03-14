"use client"; // o también poner import React from "react"; en lugar de "use client"
import Input from "@/app/components/Input";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function Buscador() {
  const [dataSearch, setDataSearch] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/scraping?search=${dataSearch}`);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDataSearch(value);
  };

  return (
    <div className="wrapper-buscador w-full">
      <form
        onSubmit={handleSubmit}
        className="container-buscador flex justify-center"
      >
        <div className="relative sm:w-[543px] w-full flex items-center">
          <Input placeholder="Inca Kola" onChange={handleInputSearch} />
          <button type="submit" className="absolute right-2">
            <FiSearch className="text-2xl text-white hover:text-black transition-all" />
          </button>
        </div>
      </form>
    </div>
  );
}

// <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2"> centrado también valido
