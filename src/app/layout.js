import Logo from "@/app/_component/Logo";
import Navigation from "@/app/_component/Navigation";

//hamne yha tailwind css apply kiya
import "@/app/_styles/globals.css";

//hamne yha font style apply kiya
import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" }); // yah ek function h esi liye ese yha call kiya gya
//console.log(josefin);
//hamne yha metadata apply kiya

export const metadata = {
  //title: "The Wild Osis"
  title: { template: "%s / The Wild Osis", default: "Welcome / The Wild Osis" },
  description:
    "Luxurious cabin hotel, located in the heart of Italian Dolomites, surrounded by beautiful mauntains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-50 min-h-screen`}>
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>Copyright By The Wild Osis.</footer>
      </body>
    </html>
  );
}
