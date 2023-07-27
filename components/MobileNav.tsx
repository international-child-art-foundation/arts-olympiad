"use client";
import React, {useState} from "react";
import { slide as Menu } from "react-burger-menu";
import Link from "next/link";

const MobileNav = () => {

  const links = [
    { name: "Home", url: "/" },
    { name: "Gallery", url: "/gallery" },
    { name: "Purpose", url: "/purpose" },
    { name: "About ICAF", url: "/about" },
    { name: "Team", url: "/team" }
  ];
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleStateChange = (state : {isOpen: boolean }) => {
    setIsOpen(state.isOpen);
  };

  return (
    <div className="md:hidden">
      <Menu isOpen={isOpen} onStateChange={handleStateChange} right styles={styles} customCrossIcon={ <img src="close.svg" alt="Close menu"/> }>
        <span  className="flex space-x-5">
          <Link onClick={closeMenu} className= "bg-blue-500 bg-main-blue hover:bg-secondary-blue text-white text-xl px-4 py-2 m-3  rounded-full inline-block" href="https://artsolympiad.info/artwok_registration.php">Vote</Link>
          <Link onClick={closeMenu} className= "bg-blue-500 bg-main-blue hover:bg-secondary-blue text-white text-xl px-4 py-2 m-3 rounded-full inline-block" href="https://artsolympiad.info/artwok_select.php">upload</Link>
        </span>
        {links.map(link => (
          <Link key={link.name} href={link.url} onClick={closeMenu} className="block py-1 text-white text-xl no-underline m:2">
            <span className="hover:text-main-blue text-white">{link.name}</span>
          </Link>
        ))}
      </Menu>
    </div>
  );
};

// Custom CSS
const styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    right: "36px",
    top: "36px"
  },
  bmBurgerBars: {
    background: "#373a47"
  },
  bmMenuWrap: {
    position: "fixed",
    height: "50%",
    width: "100%"
  },
  bmMenu: {
    background: "#1E1E1E",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
    overflow: "auto"
  },
  bmMorphShape: {
    fill: "#373a47"
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%"
  },
  bmItem: {
    display: "block",
    color: "white"
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)"
  }
};

export default MobileNav;
