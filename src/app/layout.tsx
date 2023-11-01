import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "Schoolchildren everywhere can participate in a global art contest on the theme, My Favorite Sport, and rally the votes to win the gold!"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="/svgs/banner-image.svg"
        type="image/svg+xml"
      />
      <body className={`${inter.className} bg-neutral-white pt-32`}>
        {/*<Header/>*/}
        <main className="flex flex-col justify-center align-middle w-full m-auto">
          { children }
        </main>
        <Footer />
      </body>
    </html>
  );
}
