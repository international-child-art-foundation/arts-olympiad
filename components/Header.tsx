import Link from 'next/link';
import Button from './ui/Button';
import '../src/app/globals.css'; 
import MobileNav from './MobileNav';

const Header = () => {
  const links = [
    { name: 'Home', url: '/' },
    { name: 'Gallery', url: '/gallery' },
    { name: 'Purpose', url: '/purpose' },
    { name: 'About', url: '/about' },
    { name: 'Team', url: '/team' }
  ]

  return (
    <header className="w-full h-32 bg-neutral-white shadow-sm flex items-center justify-center">
      <ul className="flex items-center justify-around py-0 px-7 list-none w-full">
        <Link href="/">
            <li className="logo-bg w-32 h-16 flex-shrink-0"></li>
        </Link>

        
        {links.map(link => (
          <Link key={link.name} href={link.url}>
            <li className="text-neutral-black no-underline hidden md:block">{link.name}</li>
          </Link>
        ))}

        <Button link="/upload" mainButton>Upload</Button>
        <Button link="/vote" mainButton>Vote</Button>
        <MobileNav></MobileNav> {/* triple stack mobile component*/}
      </ul>
    </header>
  )
}

export default Header
