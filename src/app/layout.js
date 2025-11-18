import Logo from "@/app/_component/Logo";
import Navigation from "@/app/_component/Navigation";

import "@/app/_styles/globals.css";

export const metadata = { title: "The Wild Osis" };

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
