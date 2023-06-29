'use client'

// saving for now in case we don't like the react-burger-menu and want a custom implementation

// import React, { useState } from 'react';
// import Link from 'next/link';



// const MobileNav = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     const links = [
//         { name: 'Home', url: '/' },
//         { name: 'Gallery', url: '/gallery' },
//         { name: 'Purpose', url: '/purpose' },
//         { name: 'About', url: '/about' },
//         { name: 'Team', url: '/team' }
//     ]

//     const handleClick = (event: React.MouseEvent) => {
//         event.stopPropagation();
//         setIsOpen(!isOpen);
//     };
    
//     const closeMenu = () => {
//         setIsOpen(false);
//     };

//     return(
//         <div onClick={closeMenu} className="flex flex-col justify-center items-center">
//             <button onClick={handleClick} 
//             className="flex flex-col justify-center items-center">
//             <span className={`bg-black block transition-all duration-300 ease-out 
//                             h-0.5 w-6 rounded-sm ${isOpen ? 
//                             'rotate-45 translate-y-1' : '-translate-y-0.5'
//                             }`} >
//             </span>
//             <span className={`bg-black block transition-all duration-300 ease-out 
//                             h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 
//                             'opacity-0' : 'opacity-100'
//                             }`} >
//             </span>
//             <span className={`bg-black block transition-all duration-300 ease-out 
//                             h-0.5 w-6 rounded-sm ${isOpen ? 
//                             '-rotate-45 -translate-y-1' : 'translate-y-0.5'
//                             }`} >
//             </span>    
//             </button>

//             {isOpen && 
//                 <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
//                     <div className="bg-black p-4 w-full h-1/2">
//                         <button onClick={closeMenu} className="top-0 right-0 m-2">
//                             <img src="close.svg" alt="Close" className="h-6 w-6" />
//                         </button>
//                         {links.map(link => (
//                             <Link key={link.name} href={link.url}
//                                 className="block py-1 text-white no-underline">{link.name}
//                             </Link>
//                         ))}
//                     </div>
//                 </div>
//             }

//         </div>

//     );
// };

// export default MobileNav;


import React, {useState, useEffect} from 'react';
import { slide as Menu } from 'react-burger-menu'
import Link from 'next/link';

const MobileNav = () => {

    const links = [
        { name: 'Home', url: '/' },
        { name: 'Gallery', url: '/gallery' },
        { name: 'Purpose', url: '/purpose' },
        { name: 'About', url: '/about' },
        { name: 'Team', url: '/team' }
    ]
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleStateChange = (state : {isOpen: boolean }) => {
        setIsOpen(state.isOpen);
    };

    // due to conflicting state implementing the feature where clicking outside the menu closes the menu it interferes with the built in state
    // for closing using the cross icon TBD which is important or if there is an easy fix  

    // useEffect(() => {
    //     const closeMenuIfClickedOutside = (event: MouseEvent) => {
    //         const target = event.target as HTMLElement;
    //         if (
    //             isOpen && 
    //             !target.closest('.bm-menu') && 
    //             !target.closest('.bm-burger-button')
    //         ) {
    //             closeMenu();
    //         }
    //     };
    //     document.addEventListener('click', closeMenuIfClickedOutside);
        
    //     return () => document.removeEventListener('click', closeMenuIfClickedOutside);
    // }, [isOpen]); // Re-run the effect when isOpen changes


    return (
        <div className='md:hidden'>
            <Menu isOpen={isOpen} onStateChange={handleStateChange} right styles={styles} customCrossIcon={ <img src="close.svg"/> }>
                <span  className='flex space-x-5'>
                    <Link onClick={closeMenu} className= "bg-blue-500 text-white text-xl px-4 py-2 m-3  rounded-full inline-block" href="/vote">Vote</Link>
                    <Link onClick={closeMenu} className= "bg-blue-500 text-white text-xl px-4 py-2 m-3 rounded-full inline-block" href="/upload">upload</Link>
                </span>
                {links.map(link => (
                    <Link key={link.name} href={link.url} onClick={closeMenu} className="block py-1 text-white text-xl no-underline m:2">{link.name}</Link>
                ))}
            </Menu>
        </div>
    );
};

// Custom CSS
const styles = {
    bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        right: '36px',
        top: '36px'
    },
    bmBurgerBars: {
        background: '#373a47'
    },
    bmMenuWrap: {
        position: 'fixed',
        height: '50%',
        width: '100%'
    },
    bmMenu: {
        background: '#1E1E1E',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em',
        overflow: 'auto'
    },
    bmMorphShape: {
        fill: '#373a47'
    },
    bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%'
    },
    bmItem: {
        display: 'block',
        color: 'white'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    }
}

export default MobileNav;
