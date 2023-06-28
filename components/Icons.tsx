import instagram from '../public/social/instagram.svg'
import facebook from '../public/social/facebook.svg'
import twitter from '../public/social/twitter.svg'
import youtube from '../public/social/youtube.svg'
import tiktok from '../public/social/tiktok.svg'
import linkedin from '../public/social/linkedin.svg'
import pinterest from '../public/social/pinterest.svg'
import Image from 'next/image'

const svgIcons = [
    { name: 'instagram', link: 'https://www.instagram.com', src: instagram },
    { name: 'facebook', link: 'https://www.facebook.com', src: facebook },
    { name: 'twitter', link: 'https://www.twitter.com', src: twitter },
    { name: 'youtube', link: 'https://www.youtube.com', src: youtube },
    { name: 'tiktok', link: 'https://www.tiktok.com', src: tiktok },
    { name: 'linkedin', link: 'https://www.linkedin.com', src: linkedin },
    { name: 'pinterest', link: 'https://www.pinterest.com', src: pinterest },
];

const Icons = () => {
    return (
        <>
            {svgIcons.map((icon) => (
                <a className='inline-block px-3' key={icon.name} href={icon.link} target="_blank" rel="noopener noreferrer">
                    <Image src={icon.src} alt={icon.name} />
                </a>
            ))}
        </>
    )
}
export default Icons