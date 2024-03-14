// api/search/route.ts
import { scrapingPlazaVea } from "../actions/scrap";

export async function GET(req: any) {
  const search = req.query ? req.query.search : null;
  if (!search) {
    return new Response(
      JSON.stringify({ message: "No search query provided" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  try {
    const resultScraping = await scrapingPlazaVea(search);
    return new Response(JSON.stringify(resultScraping), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
