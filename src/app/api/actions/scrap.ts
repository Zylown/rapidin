import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium-min";
// import puppeteer from "puppeteer-core";
export async function scrapingPlazaVea(search: string) {
  // espera un valor de tipo string que es el valor que se va a buscar
  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      // executablePath: await chromium.executablePath(),
      ignoreHTTPSErrors: true,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath("/opt/chromium"),
      headless: chromium.headless,
      slowMo: 0,
    });
    console.log("path", puppeteer.executablePath());
    console.log("Chromium:", await browser.version());
    const page = await browser.newPage();

    await page.goto(`https://www.plazavea.com.pe/search/?_query=${search}`, {
      timeout: 0,
    });
    await page.waitForSelector(".Showcase__details__text");

    const result = await page.evaluate(() => {
      // const text = document.querySelectorAll(".Showcase__details__text");
      const text = document.querySelectorAll(".Showcase__content");
      console.log("texto", text);
      const data = [...text].map((quote) => {
        const imagen =
          quote.querySelector(".showcase__image").attributes[0].value;
        const name = quote.querySelector(".Showcase__name")?.textContent; // or use innerText
        const priceRegular = quote.querySelector(".price")?.textContent;
        const priceOnline = quote.querySelector("[data-price]")?.textContent;
        const urlVenta =
          quote.querySelector("a.Showcase__name").attributes[1].value;
        const tienda = "PLAZA VEA";
        return {
          imagen,
          name,
          priceRegular,
          priceOnline,
          urlVenta,
          tienda,
        };
      });
      return data;
    });
    // await fs.writeFile("quotesPlazaVea.json", JSON.stringify(result, null, 2));
    await browser.close();
    return { result, search };
  } catch (error: any) {
    console.log("error", error.message);
    return { result: [], search }; // si hay un error retorna un array vacio
  }
}

export async function scrapingMetro(search: string) {
  // espera un valor de tipo string que es el valor que se va a buscar
  try {
    const browser = await puppeteer.launch({
      headless: "shell", // cuando es true no se abre el navegador
      slowMo: 195,
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 7580, deviceScaleFactor: 1 }); // para que agarre el contenido de 1920x1080

    await page.goto(`https://www.metro.pe/${search}`, {
      timeout: 0,
    });

    await page.waitForSelector(".vtex-product-summary-2-x-container");
    await page.click(
      ".vtex-flex-layout-0-x-flexRowContent--row-title-count-category"
    );
    // document.querySelector(".vtex-flex-layout-0-x-flexRowContent--row-title-count-category")

    const result = await page.evaluate(() => {
      const containers = document.querySelectorAll(
        ".vtex-product-summary-2-x-container"
      );

      const data = [...containers].map((container) => {
        const imagesElement = container.querySelector(
          ".vtex-product-summary-2-x-imageNormal.vtex-product-summary-2-x-image"
        );

        const imagen = imagesElement
          ? imagesElement.getAttribute("src") ||
            imagesElement.getAttribute("srcset")
          : "https://www.colombianosune.com/sites/default/files/asociaciones/NO_disponible-43_18.jpg";

        const name = container.querySelector(
          ".vtex-product-summary-2-x-productBrand"
        )?.textContent;

        const priceRegularElement = container.querySelector(
          'div[id^="price-container-"]'
        );

        const priceOnline = priceRegularElement.querySelector(
          "span.vtex-product-price-1-x-currencyContainer"
        )?.textContent;

        const priceRegular =
          priceRegularElement.querySelector(
            ".metroio-store-theme-13-x-span-ref-value"
          )?.textContent || "No disponible";

        const urlVenta_a = container.querySelector(
          "a.vtex-product-summary-2-x-clearLink"
        ).attributes[0].value;
        const urlVenta = `https://www.metro.pe${urlVenta_a}`;

        const tienda = "METRO";

        return {
          imagen,
          name,
          priceRegular,
          priceOnline,
          urlVenta,
          tienda,
        };
      });

      return data;
    });
    await browser.close();
    return { result, search };
  } catch (error: any) {
    console.log("error", error.message);
    return { result: [], search };
  }
}

export async function scrapingTottus(search: string) {
  try {
    const browser = await puppeteer.launch({
      headless: "shell", // cuando es true no se abre el navegador
      slowMo: 0,
    });
    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 7580, deviceScaleFactor: 1 });

    await page.goto(
      `https://tottus.falabella.com.pe/tottus-pe/search?Ntt=${search}`,
      {
        timeout: 0,
      }
    );

    await page.waitForSelector(".jsx-1484439449");

    const result = await page.evaluate(() => {
      const containers = document.querySelectorAll(".jsx-1484439449");

      const data = [...containers].map((container) => {
        const elementImg =
          container.querySelector(".jsx-1996933093 img") ||
          container.querySelector(
            ".jsx-2469003054.layout_grid-view.layout_view_4_GRID>img"
          );
        const imagen = elementImg
          ? elementImg.getAttribute("src") || elementImg.getAttribute("srcset")
          : "https://www.colombianosune.com/sites/default/files/asociaciones/NO_disponible-43_18.jpg";

        const nameElement = container.querySelector(
          "b[id^='testId-pod-displaySubTitle-']"
        );

        const name = nameElement?.textContent;

        const priceRegular =
          container.querySelector("li.prices-1")?.textContent;

        const priceOnline = container.querySelector(
          "li.prices-0 .jsx-280445118"
        )?.textContent;

        const elementVenta =
          container.querySelector("[data-category]") ||
          container.querySelector("[data-gsccategory]");
        const urlVenta = elementVenta
          ? elementVenta.getAttribute("href")
          : "https://www.colombianosune.com/sites/default/files/asociaciones/NO_disponible-43_18.jpg";

        const tienda = "TOTTUS";

        return {
          imagen,
          name,
          priceOnline,
          priceRegular,
          urlVenta,
          tienda,
        };
      });

      return data;
    });
    await browser.close();
    return { result, search };
  } catch (error: any) {
    console.log("error", error.message);
    return { result: [], search };
  }
}

export async function scrapingTambo(search: string) {
  try {
    const browser = await puppeteer.launch({
      headless: "shell", // cuando es true no se abre el navegador
      slowMo: 0,
    });
    const page = await browser.newPage();

    await page.setViewport({
      width: 1920,
      height: 10580,
      deviceScaleFactor: 1,
    });

    await page.goto(`https://www.tambo.pe/pedir?q=${search}`, {
      timeout: 0,
    });

    await page.waitForSelector("._1kZCFobRwQ2tl6XA-sf6Ig.row>div");

    const result = await page.evaluate(() => {
      const containers = document.querySelectorAll(
        "._1kZCFobRwQ2tl6XA-sf6Ig.row>div"
      );

      const data = [...containers].map((container) => {
        const elementVenta = container.querySelector(
          "._2YFsL04WhRxFGT_7VA6bKP"
        );

        const urlVenta = elementVenta
          ? elementVenta.getAttribute("href")
          : "https://www.colombianosune.com/sites/default/files/asociaciones/NO_disponible-43_18.jpg";

        const elementImg = container.querySelector(
          "._3yULoLW9gpjndljUfLfWLN.NmGramNcnIM1VmiTq5UPX>span>img"
        );

        const imagen = elementImg
          ? elementImg.getAttribute("src")
          : "https://www.colombianosune.com/sites/default/files/asociaciones/NO_disponible-43_18.jpg";

        // const nameElement = container.querySelector("._2Wn_Ubr02VMh4x3GDzmf1V>span").textContent

        const name = container.querySelector(
          "._2Wn_Ubr02VMh4x3GDzmf1V>span"
        )?.textContent;

        const priceRegular = container.querySelector(
          "._2TqV8qNT9cykzAlTiYQzpR"
        )?.textContent;

        const priceOnline = container.querySelector(
          "._3cwJgygKLOPOt2029qoP1N.productPrice"
        )?.textContent;

        const tienda = "TAMBO";

        return {
          imagen,
          name,
          priceOnline,
          priceRegular,
          urlVenta,
          tienda,
        };
      });

      return data;
    });
    await browser.close();
    return { result, search };
  } catch (error: any) {
    console.log("error", error.message);
    return { result: [], search };
  }
}
