import * as cheerio from "cheerio";

export async function GET(req: Request){
    const respuesta = await fetch("https://www.imdb.com/chart/top/").then((res) => res.text()).catch((err) => console.log(err));
    if (typeof respuesta === 'string') {
        const $ = cheerio.load(respuesta);
        const nombresProductos: string[] = [];
        $("h3.ipc-title__text").each((i, nombre) => {
          const nombreProducto = $(nombre).text();
          nombresProductos.push(nombreProducto);
        });
        console.log(nombresProductos);
        return new Response(JSON.stringify(nombresProductos), {status: 200});
    }
    // return new Response(data, {status: 200});
}

export async function POST(req: Request){
    const body = await req.json();
    console.log(body);
    return new Response(JSON.stringify({message: "Hola broer"}));
}