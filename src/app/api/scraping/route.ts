import {
  scrapingPlazaVea,
  scrapingMetro,
  scrapingTottus,
} from "../actions/scrap";

export async function GET(req: Request) {
  const startTime = performance.now();
  const queryParams = new URLSearchParams(req.url.split("?")[1]);
  // aca se obtiene el query string de la url y se le pasa a URLSearchParams para que lo convierta en un objeto que se
  // pueda manipular
  console.log("queryParams:", queryParams);
  const search = queryParams.get("search"); // search es el nombre del parametro que se le pasa en la url osea que dentro de
  // queryParams se busca el valor que tenga el parametro search
  console.log("search:", search);

  if (!search) {
    return new Response(
      JSON.stringify({ message: "Missing search parameter" }),
      {
        status: 400,
      }
    );
  }

  try {
    const [resultPlazaVea, resultMetro, resultTottus] =
      await Promise.allSettled([
        scrapingPlazaVea(search),
        scrapingMetro(search),
        scrapingTottus(search),
      ]); // aca se hace el llamado a las funciones que se van a ejecutar

    const resultJSON = JSON.stringify({
      resultPlazaVea:
        resultPlazaVea.status === "fulfilled"
          ? resultPlazaVea.value.result
          : null,
      resultMetro:
        resultMetro.status === "fulfilled" ? resultMetro.value.result : null,
      resultTottus:
        resultTottus.status === "fulfilled" ? resultTottus.value.result : null,
      resultSearch: search.toUpperCase(),
    });

    const endTime = performance.now(); // Obtener el tiempo de finalización de la ejecución
    const executionTimeInSeconds = (endTime - startTime) / 1000; // Calcular el tiempo de ejecución en segundos

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
