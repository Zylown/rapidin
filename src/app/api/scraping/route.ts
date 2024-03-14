import { scrapingPlazaVea } from "../actions/scrap";

export async function GET(req: Request) {
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
    const resultScraping = await scrapingPlazaVea(search);
    console.log(resultScraping.search.toUpperCase());
    const resultJSON = JSON.stringify({
      result: resultScraping.result,
      search: resultScraping.search.toUpperCase(),
    });
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
