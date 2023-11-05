"use client";
import React, {useState} from "react";
import { slide as Menu } from "react-burger-menu";
import Link from "next/link";
// import { HeartIconWhite } from "./svgs/HeartIconWhite";
import { LoginIcon } from "./svgs/LoginIcon";
import { DownIcon } from "./svgs/DownIcon";
import { UpIcon } from "./svgs/UpIcon";


const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links1 = [
    { name: "About", url: "/about" },
    { name: "Contest", url: "/" },
    { name: "Sponsors", url: "/" }
  ];
  const links2 = [
    { name: "Resources", url: "/" },
    { name: "FAQ's", url: "/" }
  ];
  
  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleStateChange = (state : {isOpen: boolean }) => {
    setIsOpen(state.isOpen);
  };

  return (
    <div className="md:hidden">
      <Menu 
        isOpen={isOpen} 
        onStateChange={handleStateChange} 
        right 
        styles={styles} 
        customCrossIcon={<img src="/svgs/close.svg" alt="Close navigation menu"/>}
        customBurgerIcon={<img src="/svgs/burger.svg" alt="Open navigation menu"/>}
      >

        <div className="logo-bg w-16 h-16 mx-auto my-2"></div>

        <hr className="my-2 border-gray-600 border-1 w-full"></hr>

        {links1.map(link => (
          <Link 
            key={link.name} 
            href={link.url} 
            onClick={closeMenu} 
            className="text-black tracking-widest text-sm px-8 py-4 hover:text-new-blue hover:font-bold hover:bg-gradient-to-b drop-shadow-md from-light-blue to-neutral-white"
          >
            {link.name}
          </Link>
        ))}

        <div className="group relative">
          <button className="tracking-widest text-sm w-fit h-fit px-8 py-4 rounded-xl text-neutral-black text-center items-center inline-flex">
            Gallery
            <DownIcon />
            <UpIcon />
          </button>
          <nav tabIndex={0} className="bg-neutral-white hidden w-full relative left-0 top-full group-hover:block">
            <ul className="py-1">
              <li>
                <a href="#" className="text-new-blue block px-12 py-4 w-full h-fit tracking-widest text-sm hover:bg-gradient-to-b drop-shadow-md from-light-blue focus-within:text-new-blue focus-within:font-bold">
                  Past Entries
                </a>
              </li>
              <li>
                <a href="#" className="text-new-blue block px-12 py-4 w-full h-fit tracking-widest text-sm hover:bg-gradient-to-b drop-shadow-md from-light-blue focus-within:text-new-blue focus-within:font-bold">
                  Active Entries to Voting
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex flex-wrap">
            {links2.map(link => (
              <Link 
                key={link.name} 
                href={link.url} 
                onClick={closeMenu} 
                className="text-black tracking-widest w-full text-sm px-8 py-4 hover:text-new-blue hover:font-bold hover:bg-gradient-to-b from-light-blue to-white"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <hr className="my-4 mx-auto w-5/6 border-gray-600 border-1"></hr>

        {/* <a href="https://icaf.org/donate" className="group mx-auto mb-4 w-5/6 h-fit border-neutral-white border rounded text-center py-2 px-4 text-sm cursor-pointer tracking-wide bg-new-blue text-neutral-white">
          <HeartIconWhite />
          Donate
        </a> */}
        <a href="https://icaf.org/donate" className="group mx-auto mb-4 w-5/6 h-fit border-neutral-white border rounded text-center py-2 px-4 text-sm cursor-pointer tracking-wide bg-new-blue text-neutral-white">
          Donate
        </a>
        <div className="heart-black me-auto ml-4"></div>
        
        <a href="https://artsolympiad.info/artwok_registration.php" className="group mx-auto mb-4 h-fit w-5/6 border-new-blue border rounded text-center py-2 px-3 text-xs cursor-pointer tracking-wide text-new-blue hidden md:block">
          Upload
        </a>

        <a href="https://artsolympiad.info/artwok_select.php" className="group mx-auto mb-4 h-fit w-5/6 border-new-blue border rounded text-center py-2 px-3 text-xs cursor-pointer tracking-wide text-new-blue hidden md:block">
          Vote
        </a>

        <a href="#" className="group mx-auto mb-2 h-fit w-5/6 text-center py-2 px-3 text-xs cursor-pointer tracking-wide text-new-blue hidden md:block">
          Login
          <LoginIcon />
        </a>

      </Menu>
    </div>
  );
};

// Custom CSS
const styles = {
  bmMenuWrap: {
    position: "absolute",
    top: "0px",
    width: "100%",
    height: "auto"
  },
  bmMenu: {
    background: "#F9FAF6",
  },
  bmCrossButton: {
    top: "1.5rem"
  },
  bmBurgerButton: {
    position: "absolute",
    top: "20px",
    right:"10px",
  },
  bmOverlay: {
    position: "fixed",
    left: "0",
    bottom: "0",
    background: "#F9FAF6",
    zIndex: "20",
  }
};

export default MobileNav;