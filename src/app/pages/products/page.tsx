"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/scraping")
      .then((response) => {
        console.log(response); // Imprime la respuesta aquí
        return response.json();
      })
      .then((jsonData) => setData(jsonData));
  }, []);

  // Renderiza los datos en tu componente
  return (
    <div className="">
      {data ? (
        <div className="">
          {data.map((item: { name: string; price: string }, index: number) => (
            <ul
              className="flex flex-col gap-6 text-white font-semibold"
              key={index}
            >
              <li>{item.name}</li>
              <li>{item.price}</li>
            </ul>
          ))}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}
