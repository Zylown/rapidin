"use server";
import {
  captureScreenshot,
  navigateClickPage,
  openWebPage,
  getDataFromWebPage,
  handleDynamicPage,
  scrapingPlazaVea,
} from "../actions/scrap";

export async function GET() {
  try {
    const resultScraping = await scrapingPlazaVea();
    console.log("resultado scrap", resultScraping);
    const resultJSON = JSON.stringify(resultScraping);
    return new Response(resultJSON, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

// await openWebPage();
// await captureScreenshot();
// navigateClickPage();
// getDataFromWebPage();
// handleDynamicPage();
// scrapingPlazaVea();
