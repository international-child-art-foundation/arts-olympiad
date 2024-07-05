"use client";
import Link from "next/link";
import MobileNav from "./MobileNav";
import "../src/app/globals.css"; 
// import { HeartIconWhite } from "./svgs/HeartIconWhite";
import { UploadIcon } from "./svgs/UploadIcon";
import { UserIcon } from "./svgs/UserIcon";
import { VoteIcon } from "./svgs/VoteIcon";
import { LoginIcon } from "./svgs/LoginIcon";
import { DownIcon } from "./svgs/DownIcon";
import { UpIcon } from "./svgs/UpIcon";
import { useGlobalContext } from "@/app/GlobalContext";
import {useRouter} from "next/navigation";
import { useState } from "react";

const Header = () => {
  const {isAuthenticated, signOut} = useGlobalContext();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const router = useRouter();

  async function handleSignOut() {
    setLogoutLoading(true);
    await signOut();
    router.push("/");
    setLogoutLoading(false);
  }

  const links1 = [
    { name: "About", url: "/about" },
    { name: "Contest", url: "/contest" },
    { name: "Sponsor", url: "/sponsor" }
  ];
  const links2 = [
    { name: "Impact", url: "/impact" },
    { name: "FAQ's", url: "/faq" }
  ];

  return (
    <header className="px-6 gap-6 mt-6 m-auto sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl font-body z-20 md:flex h-fit relative top-0 left-0">
      
      <div className="w-full md:w-fit">
        <Link href="/">
          <div className="logo-bg mx-auto w-[60px] h-[90px] md:w-[90px] md:h-[137px]"></div>
        </Link>
      </div>
      
      <div className="flex flex-wrap w-full">

        <Link href={isAuthenticated ? "/dashboard" : "/auth/login"} className="active:scale-95 group my-2 h-fit w-fit border-new-blue border rounded text-center py-2 px-3 text-xs cursor-pointer tracking-wide text-new-blue hidden md:block">
          <UploadIcon />
          Upload
        </Link>

        <Link href="/gallery" className="active:scale-95 group my-2 ml-2 h-fit w-fit border-new-blue border rounded text-center py-2 px-3 text-xs cursor-pointer tracking-wide text-new-blue hidden md:block">
          <VoteIcon />
          Vote
        </Link>

        {isAuthenticated === true ? (
          <>
            <div className="group ml-auto flex">
              <Link href="/dashboard" className={`active:scale-95 group my-2 h-fit w-fit border-new-blue border rounded text-center py-2 px-3 text-xs cursor-pointer tracking-wide text-new-blue hidden md:inline-flex items-center ${logoutLoading ? "opacity-50 pointer-events-none" : ""}`}>
                <UserIcon />
                Dashboard
              </Link>

              <a
                onClick={logoutLoading ? undefined : handleSignOut}
                className={`active:scale-95 group gap-2 my-2 ml-2 h-fit w-fit border-new-blue border rounded text-center py-2 px-3 text-xs cursor-pointer tracking-wide text-new-blue hidden md:inline-flex items-center ${logoutLoading ? "opacity-50 pointer-events-none" : ""}`}
              >
                <p>Logout</p>
                <LoginIcon
                  transform="scale(-0.9, 0.9)"
                />
              </a>
            </div>
          </>
        ) : (
          <Link href="/auth/login" className=" flex flex-row gap-2 my-2 ml-auto h-fit w-fit text-center py-2 px-3 text-xs cursor-pointer tracking-wide text-new-blue hidden md:block active:scale-95">
            <LoginIcon transform="scale(0.9, 0.9)" />
            <p>Login</p>
          </Link>
        )}

        <hr className="my-2 border-new-black border-t-0.5 w-full hidden md:block"></hr>

        <div className="flex flex-wrap items-center gap-x-3 w-full py-2 h-1/2">
          
          {links1.map(link => (
            <Link key={link.name} href={link.url}>
              <li className="tracking-widest text-sm w-fit h-fit py-3 pr-2 rounded-xl un text-neutral-black hidden md:block">
                {link.name}
              </li>
            </Link>
          ))}
          
          <div className="group relative">
            <button className="tracking-widest text-sm w-fit h-fit py-3 pr-2 text-neutral-black hidden md:inline-flex">
              Gallery
              <DownIcon />
              <UpIcon />
            </button>
            <nav tabIndex={0} className="bg-neutral-white invisible rounded-b-xl w-max absolute left-0 top-full transition-all opacity-0 group-hover:visible group-hover:opacity-100 group-hover:translate-x-1 group-hover:duration-500 group-hover:ease-in-out">
              <ul className="py-1">
                <li>
                  <Link href="/gallery" className="text-new-blue block px-4 py-2 w-fit h-fit tracking-widest text-sm un focus-within:text-new-blue focus-within:font-bold">
                    Active Entries to Vote on
                  </Link>
                </li>
                <li>
                  <Link href="/past-entries" className="text-new-blue block px-4 py-2 w-fit h-fit tracking-widest text-sm un focus-within:text-new-blue focus-within:font-bold">
                    Past Entries for Inspiration
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {links2.map(link => (
            <Link key={link.name} href={link.url}>
              <li className="tracking-widest text-sm w-fit h-fit py-3 pr-2 rounded-xl un text-neutral-black hidden md:block">
                {link.name}
              </li>
            </Link>
          ))}
          
          {/* <a href="https://icaf.org/donate" className="group w-fit h-fit border-neutral-white border rounded text-center py-3 px-4 text-sm cursor-pointer tracking-wide bg-new-blue text-neutral-white ml-auto hidden md:block">
            <HeartIconWhite />
            Donate
          </a> */}
          
          <div className="ml-auto flex">
            <div className="heart-black me-auto my-4 hidden md:block"></div>
            <a href="https://icaf.org/donate" className="w-fit h-fit border-neutral-white border rounded text-center py-3 px-4 text-sm cursor-pointer tracking-wide bg-new-blue text-neutral-white ml-auto hidden md:block">
              Donate
            </a>
          </div>
          

        </div>

        <MobileNav /> {/* triple stack mobile component*/}
      </div>
    </header>
  );
};

export default Header;