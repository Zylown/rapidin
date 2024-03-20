"use client";
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
  const [skeletonCount, setSkeletonCount] = useState(0);

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout;
    if (loading && searchTerm) {
      // Inicia un intervalo para incrementar skeletonCount cada 3 segundos
      intervalId = setInterval(() => {
        setSkeletonCount((count) => count + 1);
      }, 3000);
    } else {
      clearInterval(intervalId); // Limpia el intervalo una vez que los productos se han cargado
      setSkeletonCount(0); // Resetea el contador de Skeletons
    }
    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
  }, [loading, searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      // setProducts([]); // Limpia el estado de productos

      if (searchTerm) {
        const response = await fetch(`/api/scraping?search=${searchTerm}`);
        setLoading(true);
        const data = await response.json();
        // Combina los productos de ambas tiendas en una sola lista
        let allProducts = [
          ...data.resultPlazaVea,
          ...data.resultMetro,
          ...data.resultTottus,
          ...data.resultTambo,
        ];

        // Ordena los productos por precio de menor a mayor
        allProducts.sort((a, b) => {
          const priceA = parseFloat(a.priceOnline.replace(/[^0-9.-]+/g, "")); // Elimina los caracteres no numéricos del precio
          const priceB = parseFloat(b.priceOnline.replace(/[^0-9.-]+/g, ""));
          return priceA - priceB;
        });

        // Filtra los productos para que solo se muestren aquellos cuyo nombre contiene la palabra de búsqueda
        allProducts = allProducts.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setProducts(allProducts); // Almacena los productos ordenados y filtrados en el estado
        setLoading(false);
      }
      setLoading(false);
    };
    fetchData();
  }, [searchTerm]);

  return (
    <div className="container-home flex flex-col">
      <h1
        className={`${albertSans.className} text-center py-6 text-5xl tracking-wide text-white`}
        translate="no"
      >
        Rapidin
      </h1>
      <div className="wrapper__search--result flex flex-col items-center mx-3">
        <Buscador
          onSearch={setSearchTerm}
          loading={loading}
          setLoading={setLoading}
        />
        <div className="container__products--map w-full flex flex-wrap sm:justify-normal justify-between">
          <div className="flex flex-wrap justify-center w-full">
            {loading &&
              Array.from(
                { length: skeletonCount },
                (
                  _,
                  i // Crea un número de Skeletons igual a skeletonCount
                ) => (
                  <Skeleton key={i} /> // array.from sirve para crear un array de un tamaño determinado y luego se mapea para crear los skeletons
                )
              )}
            {!loading && // !loading es igual al contrario del valor que tiene entonces si loading es false se muestra el contenido y si es true muestra el skeleton
              products.map((producto, index) => (
                <ResultProducts
                  key={index}
                  index={index}
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
