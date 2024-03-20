import { useEffect } from "react";
import Input from "@/app/components/Input";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { FaSpinner } from "react-icons/fa";

interface BuscadorProps {
  onSearch: (searchTerm: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export default function Buscador({
  onSearch,
  loading,
  setLoading,
}: BuscadorProps) {
  const [dataSearch, setDataSearch] = useState("");

  const handleClearSearch = () => {
    setDataSearch("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(dataSearch);
    setLoading(true);
  };
  // console.log(loading, "loading");
  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDataSearch(value);
  };

  useEffect(() => {
    if (!loading) {
      // !loading significa que si loading es false (no está cargando) y si es true (está cargando) se ejecuta el setLoading(false)
      setLoading(false);
    }
  }, [loading, setLoading]);

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
            inputSearch={dataSearch}
          />
          <button type="button" className="absolute right-8">
            {dataSearch ? (
              <RxCross2
                onClick={handleClearSearch}
                className="text-2xl hover:scale-105 transition-all mr-1"
              />
            ) : null}
          </button>
          <button type="submit" className="absolute right-2">
            {loading ? (
              <FaSpinner className="animate-spin text-2xl text-white hover:scale-105 transition-all" />
            ) : (
              <FiSearch className="text-2xl text-white hover:text-black hover:scale-105 transition-all" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2"> centrado también valido
