import React, { useEffect, useState } from "react";
import Buscador from "@/app/ui/home/Buscador";
import ResultProducts from "@/app/ui/home/ResultProducts";
import { Risque as letra } from "next/font/google";
import Skeleton from "@/app/components/Skeleton";

const albertSans = letra({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export default function HomePrincipal() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (searchTerm) {
        const response = await fetch(`/api/scraping?search=${searchTerm}`);
        const data = await response.json();
        // Combina los productos de ambas tiendas en una sola lista
        const allProducts = [
          ...data.resultPlazaVea,
          ...data.resultMetro,
          ...data.resultTottus,
          ...data.resultTambo,
        ];
        setProducts(allProducts); // Almacena los productos combinados en el estado
      }
      setLoading(false);
    };
    fetchData();
  }, [searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="container-home flex flex-col">
      <h1
        className={`${albertSans.className} text-center py-6 text-5xl tracking-wide text-white`}
      >
        Rapidin
      </h1>
      <div className="wrapper__search--result flex flex-col items-center mx-3">
        <Buscador onSearch={handleSearch} />
        <div className="container__products--map w-full flex flex-wrap sm:justify-normal justify-between">
          <div className="flex flex-wrap justify-center">
            {loading && <Skeleton />} {/* Mostrar Skeleton mientras se carga */}
            {!loading && // !loading es igual a loading === false entonces cuando loading sea false se mostrará el contenido de skeleton 
              products.map((producto, index) => (
                <ResultProducts
                  key={index}
                  imagen={producto.imagen}
                  nombre={producto.name}
                  priceRegular={producto.priceRegular}
                  priceOnline={producto.priceOnline}
                  urlVenta={producto.urlVenta}
                  tienda={producto.tienda}
                  resultSearch={searchTerm.toUpperCase()}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
