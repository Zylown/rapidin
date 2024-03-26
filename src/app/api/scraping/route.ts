import {
  scrapingPlazaVea,
  scrapingMetro,
  scrapingTottus,
  scrapingTambo,
} from "../actions/scrap";

function getResult(result: any) {
  return result.status === "fulfilled" ? result.value.result : null;
}

const cache = new Map<string, any>(); // Mapa para almacenar los resultados de las búsquedas en caché

export async function GET(req: Request) {
  const startTime = performance.now();
  const queryParams = new URLSearchParams(req.url.split("?")[1]);
  console.log("queryParams:", queryParams);
  const search = queryParams.get("search");
  console.log("search:", search);

  if (!search) {
    return new Response(
      JSON.stringify({ message: "Recibido, pero sin parámetros" }),
      {
        status: 400,
      }
    );
  }

  try {
    if (cache.has(search)) {
      console.log("Datos en caché", search); // Si el resultado de la búsqueda está en caché, se imprime en consola
      const cachedResult = cache.get(search); // Se obtiene el resultado de la búsqueda en caché y se almacena en una variable
      const resultJSON = JSON.stringify({
        ...cachedResult,
        resultSearch: search.toUpperCase(),
      }); // Se convierte el resultado de la búsqueda en caché a un JSON
      return new Response(resultJSON, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }); // Se retorna el resultado de la búsqueda en caché
    }
    // Si los datos no están en caché, realiza el scraping
    const [resultPlazaVea, resultMetro, resultTottus, resultTambo] =
      await Promise.allSettled([
        scrapingPlazaVea(search),
        scrapingMetro(search),
        scrapingTottus(search),
        scrapingTambo(search),
      ]);

    const successfulResults = [
      getResult(resultPlazaVea),
      getResult(resultMetro),
      getResult(resultTottus),
      getResult(resultTambo),
    ];

    // Almacena los resultados en caché
    const combinedResult = {
      resultPlazaVea: successfulResults[0],
      resultMetro: successfulResults[1],
      resultTottus: successfulResults[2],
      resultTambo: successfulResults[3],
    };

    cache.set(search, combinedResult); // Se almacena el resultado de la búsqueda en caché para futuras consultas

    const resultJSON = JSON.stringify({
      ...combinedResult,
      resultSearch: search.toUpperCase(),
    });

    const endTime = performance.now();
    const executionTimeInSeconds = (endTime - startTime) / 1000;

    console.log(
      `Execution time: ${executionTimeInSeconds.toPrecision(5)} seconds`
    );

    return new Response(resultJSON, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.log("Error:", error.message);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
