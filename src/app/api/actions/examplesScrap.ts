import puppeteer from "puppeteer";
import fs from "fs/promises";

export async function openWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 450,
  });
  const page = await browser.newPage();

  await page.goto("https://example.com");
  await browser.close();
}

export async function captureScreenshot() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 450,
  });
  const page = await browser.newPage();

  await page.goto("https://example.com");
  await page.screenshot({ path: "example.png" });
  await browser.close();
}

export async function navigateClickPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 450,
  });
  const page = await browser.newPage();

  await page.goto("https://quotes.toscrape.com/");
  await page.click("a[href='/login']");
  await new Promise((resolve) => setTimeout(resolve, 5000));
  await browser.close();
}

export async function getDataFromWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 450,
  });
  const page = await browser.newPage();

  await page.goto("https://www.example.com/");
  const result = await page.evaluate(() => {
    const title = document.querySelector("h1")?.innerText;
    const description = document.querySelector("p")?.innerText;
    return {
      title,
      description,
    };
  });
  console.log(result);
  await browser.close();
}

export async function handleDynamicPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 550,
  });
  const page = await browser.newPage();

  await page.goto("https://quotes.toscrape.com/");
  const result = await page.evaluate(() => {
    const text = document.querySelectorAll(".quote");
    const data = [...text].map((quote) => {
      const quoteText = quote.querySelector(".text")?.textContent; // or use innerText
      const author = quote.querySelector(".author")?.textContent;
      const tags = [...quote.querySelectorAll(".tag")].map(
        (tag) => tag.textContent
      );
      return {
        quoteText,
        author,
        tags,
      };
    });
    return data;
  });
  console.log(result);
  await fs.writeFile("quotes.json", JSON.stringify(result, null, 2));
  await browser.close();
}