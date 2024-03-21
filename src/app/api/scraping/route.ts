import {
  scrapingPlazaVea,
  scrapingMetro,
  scrapingTottus,
  scrapingTambo,
} from "../actions/scrap";

function getResult(result: any) {
  return result.status === "fulfilled" ? result.value.result : null;
}

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

    const resultJSON = JSON.stringify({
      resultPlazaVea: successfulResults[0],
      resultMetro: successfulResults[1],
      resultTottus: successfulResults[2],
      resultTambo: successfulResults[3],
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
