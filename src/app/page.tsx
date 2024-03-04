import Buscador from "./ui/home/Buscador";
import { Risque as letra } from "next/font/google";
const albertSans = letra({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="wrapper-home">
      <div className="container-home flex flex-col">
        <h1
          className={`${albertSans.className} text-center py-6 text-5xl tracking-wide text-white`}
        >
          Rapidin
        </h1>
        <Buscador />
      </div>
    </div>
  );
}
