"use client";
import React, {useState} from "react";
import { slide as Menu } from "react-burger-menu";
import Link from "next/link";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { name: "Home", url: "/" },
    { name: "Gallery", url: "/gallery" },
    { name: "Purpose", url: "/purpose" },
    { name: "About ICAF", url: "/about" },
    { name: "Team", url: "/team" }
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
        customCrossIcon={<img src="/close.svg" alt="Close navigation menu"/>}
        customBurgerIcon={<img src="/burger.svg" alt="Open navigation menu"/>}
      >
        <div className="flex space-x-5">
          <Link 
            href="https://artsolympiad.info/artwok_select.php"
            className="btn-primary mb-3 inline-block"
            target="_blank"
          >
            Upload
          </Link>
          <Link 
            href="https://artsolympiad.info/artwok_registration.php"
            className="btn-primary mb-3 inline-block"
            target="_blank"
          >
            Vote
          </Link>
        </div>
        {links.map(link => (
          <Link 
            key={link.name} 
            href={link.url} 
            onClick={closeMenu} 
            className="text-white text-lg py-2 hover:text-main-blue"
          >
            {link.name}
          </Link>
        ))}
      </Menu>
    </div>
  );
};

// Custom CSS
const styles = {
  bmMenuWrap: {
    position: "absolute",
    top: "8rem",
    width: "100%",
    height: "auto"
  },
  bmMenu: {
    background: "#1E1E1E",
    padding: "5rem 2.5rem 1.5rem 2.5rem",
  },
  bmCrossButton: {
    top: "2rem",
    right: "2rem"
  },
  bmBurgerButton: {
    position: "relative",
  },
  bmOverlay: {
    position: "fixed",
    left: "0",
    bottom: "0",
    background: "rgba(0, 0, 0, 0.3)",
    zIndex: "-1",
  }
};

export default MobileNav;
