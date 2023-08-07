import Link from "next/link";
import MobileNav from "./MobileNav";
import "../src/app/globals.css"; 

const Header = () => {
  const links = [
    { name: "Home", url: "/" },
    { name: "Gallery", url: "/gallery" },
    { name: "Purpose", url: "/purpose" },
    { name: "About", url: "/about" },
    { name: "Team", url: "/team" }
  ];

  return (
    <header className="z-50 shadow-md w-full h-32 flex items-center justify-center fixed md:relative top-0 left-0">
      <ul className="flex items-center justify-around py-0 px-7 list-none w-full h-full bg-neutral-white max-w-7xl">
        <Link href="/">
          <li className="logo-bg w-32 h-16 flex-shrink-0"></li>
        </Link>

        {links.map(link => (
          <Link key={link.name} href={link.url}>
            <li className="text-lg font-semibold hover:text-main-blue text-neutral-black no-underline hidden md:block">
              {link.name}
            </li>
          </Link>
        ))}

        <Link
          href="https://artsolympiad.info/artwok_registration.php"
          className="btn-primary hidden md:block"
          target="_blank"
        >
          Upload
        </Link>
        <Link
          href="https://artsolympiad.info/artwok_select.php"
          className="btn-primary hidden md:block"
          target="_blank"
        >
          Vote
        </Link>
        <MobileNav /> {/* triple stack mobile component*/}
      </ul>
    </header>
  );
};

export default Header;
