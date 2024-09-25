"use client";
import React, { useState } from "react";
import Link from "next/link";
import { LoginIcon } from "./svgs/LoginIcon";
import { DownIcon } from "./svgs/DownIcon";
import { UpIcon } from "./svgs/UpIcon";
import Image from "next/image";
import { useGlobalContext } from "@/app/GlobalContext";
import { useRouter } from "next/navigation";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, signOut } = useGlobalContext();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    router.push("/");
  };

  const links1 = [
    { name: "About", url: "/about" },
    { name: "Contest", url: "/contest" },
    { name: "Sponsor", url: "/sponsor" },
  ];
  const links2 = [
    { name: "Impact", url: "/impact" },
    { name: "FAQ's", url: "/faq" },
  ];

  return (
    <div className="relative md:hidden">
      {/* Burger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-4"
      >
        <Image
          src={isOpen ? "/svgs/close.svg" : "/svgs/burger.svg"}
          alt="Toggle Menu"
          width={30}
          height={30}
        />
      </button>

      {/* Menu */}
      <div
        className={`fixed top-0 right-0 z-40 h-full w-full bg-[#F9FAF6] transform transition-transform duration-700 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          {/* Logo */}
          <div className="logo-bg w-[60px] h-[90px] mx-auto my-2"></div>

          <hr className="my-2 border-new-black border-t-0.5 w-full"></hr>

          {/* First set of links */}
          {links1.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              onClick={() => setIsOpen(false)}
              className="block text-black tracking-widest text-sm px-8 py-4 hover:text-new-blue hover:font-bold hover:bg-gradient-to-b drop-shadow-md from-light-blue to-neutral-white"
            >
              {link.name}
            </Link>
          ))}

          {/* Dropdown menu */}
          <div className="group relative">
            <button className="tracking-widest text-sm w-fit h-fit px-8 py-4 rounded-xl text-neutral-black text-center items-center inline-flex">
              Gallery
              <DownIcon />
              <UpIcon />
            </button>
            <nav
              tabIndex={0}
              className="bg-neutral-white hidden w-full relative left-0 top-full group-hover:block"
            >
              <ul className="py-1">
                <li>
                  <Link
                    href="/gallery"
                    onClick={() => setIsOpen(false)}
                    className="block text-new-blue px-12 py-4 tracking-widest text-sm hover:bg-gradient-to-b drop-shadow-md from-light-blue"
                  >
                    Active Entries to Vote on
                  </Link>
                </li>
                <li>
                  <Link
                    href="/past-entries"
                    onClick={() => setIsOpen(false)}
                    className="block text-new-blue px-12 py-4 tracking-widest text-sm hover:bg-gradient-to-b drop-shadow-md from-light-blue"
                  >
                    Past Entries for Inspiration
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Second set of links */}
          <div className="flex flex-wrap">
            {links2.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                onClick={() => setIsOpen(false)}
                className="block text-black tracking-widest w-full text-sm px-8 py-4 hover:text-new-blue hover:font-bold hover:bg-gradient-to-b from-light-blue to-white"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <hr className="my-4 mx-auto w-5/6 border-new-black border-t-0.5"></hr>

          {/* Donate button */}
          <a
            href="https://icaf.org/donate"
            className="block group mx-auto mb-4 w-5/6 border-neutral-white border rounded text-center py-2 px-4 text-sm cursor-pointer tracking-wide bg-new-blue text-neutral-white"
          >
            Donate
          </a>
          <div className="heart-black me-auto ml-4"></div>

          {/* Upload and Vote buttons */}
          <Link
            href={isAuthenticated ? "/dashboard" : "/login"}
            onClick={() => setIsOpen(false)}
            className="block group mx-auto mb-4 h-fit w-5/6 border-new-blue border rounded text-center py-2 px-3 text-xs cursor-pointer tracking-wide text-new-blue"
          >
            Upload
          </Link>
          <Link
            href="/gallery"
            onClick={() => setIsOpen(false)}
            className="block group mx-auto mb-4 h-fit w-5/6 border-new-blue border rounded text-center py-2 px-3 text-xs cursor-pointer tracking-wide text-new-blue"
          >
            Vote
          </Link>

          {/* Auth buttons */}
          {isAuthenticated ? (
            <button
              onClick={handleSignOut}
              className="block group items-center justify-center flex gap-2 mx-auto mb-4 h-fit w-5/6 border-new-blue border rounded text-center py-2 px-3 text-xs cursor-pointer tracking-wide text-new-blue"
            >
              <p>Logout</p>
              <LoginIcon transform="scale(-0.9, 0.9)" />
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block group flex gap-1 items-center justify-center mx-auto mb-4 h-fit w-5/6 border-new-blue border rounded text-center py-2 px-3 text-xs cursor-pointer tracking-wide text-new-blue"
            >
              <p>Login</p>
              <LoginIcon transform="scale(0.9, 0.9)" />
            </Link>
          )}
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-30" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
    </div>
  );
};

export default MobileNav;
