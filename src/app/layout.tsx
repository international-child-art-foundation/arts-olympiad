import "./globals.css";
import { Inter, Epilogue, Nunito, Open_Sans } from "next/font/google";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Metadata } from "next";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  display: "swap",
});

export const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const open_sans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});


export const metadata: Metadata = {
  title: "My Favorite Sport",
  description: "Schoolchildren everywhere can participate in a global art contest on the theme, My Favorite Sport, and rally the votes to win the gold!"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${epilogue.variable} ${open_sans.variable} ${nunito.variable} bg-neutral-white`}>
      <link
        rel="icon"
        href="/svgs/banner-image.svg"
        type="image/svg+xml"
      />
      <body>
        <Header/>
        <main className={"font-inter overflow-hidden flex flex-col justify-center align-middle w-full m-auto"}>
          { children }
        </main>
        <Footer />
      </body>
    </html>
  );
}
