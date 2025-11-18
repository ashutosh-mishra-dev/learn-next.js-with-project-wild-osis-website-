import Logo from "@/app/_component/Logo";
import Navigation from "@/app/_component/Navigation";

import "@/app/_styles/globals.css";

export const metadata = {
  //title: "The Wild Osis"
  title: { template: "%s / The Wild Osis", default: "Welcome / The Wild Osis" },
  description:
    "Luxurious cabin hotel, located in the heart of Italian Dolomites, surrounded by beautiful mauntains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary-950 text-primary-50 min-h-screen">
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
