import "./globals.css";
import { Inter, Epilogue, Nunito, Open_Sans, Montserrat } from "next/font/google";
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

export const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Paris Olympic Games for Kids: My Favorite Sport",
  description: "Calling all young artists! Join the &quot;My Favorite Sport&quot; contest inspired by the Paris Olympic Games. Share your artistic vision and win amazing prizes!"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${epilogue.variable} ${openSans.variable} ${nunito.variable} ${montserrat.variable} bg-neutral-white`}>
      <link
        rel="icon"
        href="/svgs/banner-image.svg"
        type="image/svg+xml"
      />
      <body>
        <Header/>
        <main className={"font-openSans font-base overflow-hidden flex flex-col justify-center align-middle w-full m-auto leading-8"}>
          { children }
        </main>
        <Footer />
      </body>
    </html>
  );
}
