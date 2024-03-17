import Input from "@/app/components/Input";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface BuscadorProps {
  onSearch: (searchTerm: string) => void;
}

export default function Buscador({ onSearch }: BuscadorProps) {
  const [dataSearch, setDataSearch] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(dataSearch);
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
          <Input
            placeholder="Ingrese algún producto"
            onChange={handleInputSearch}
          />
          <button type="submit" className="absolute right-2">
            <FiSearch className="text-2xl text-white hover:text-black transition-all" />
          </button>
        </div>
      </form>
    </div>
  );
}

// <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2"> centrado también valido
