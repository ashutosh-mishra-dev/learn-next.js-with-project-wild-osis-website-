import Logo from "@/app/_component/Logo";
import Navigation from "@/app/_component/Navigation";

export const metadata = { title: "The Wild Osis" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
