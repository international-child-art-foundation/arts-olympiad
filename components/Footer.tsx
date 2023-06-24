const Footer = () => {
    const socialMedia = [
        { name: 'instagram', link: 'https://www.instagram.com' },
        { name: 'facebook', link: 'https://www.facebook.com' },
        { name: 'twitter', link: 'https://www.twitter.com' },
        { name: 'youtube', link: 'https://www.youtube.com' },
        { name: 'tiktok', link: 'https://www.tiktok.com' },
        { name: 'linkedin', link: 'https://www.linkedin.com' },
        { name: 'pinterest', link: 'https://www.pinterest.com' },
    ]
    return (
        <div className='grid py-20 grid-col-1 lg:grid-cols-2  justify-center px-2 bg-neutral-100'>
            {/* logo and address */}
            <div className='flex justify-center items-center  '>
                <div className="flex-none w-fit pr-2 lg:pr-12">
                    <img src='/ICAF_logo_transparent.png'></img>
                </div>
                <div className="w-fit">
                    <ul className='font-normal text-md md:font-medium lg:text-lg'>
                        <li className=''>International Child Art Foundation</li>
                        <li>2549 Virginia Avenue NW,
                            <span className="block lg:inline">Washington, DC 20038</span>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Social media */}
            <div className="flex justify-center items-center mt-3 lg:mt-0">
                {socialMedia.map((icon, idx) => (
                    <a className='' key={icon.name} href={icon.link} target="_blank" rel="noopener noreferrer">
                        <img className={idx === socialMedia.length - 1 ? 'inline-block px-3' : 'inline-block px-3'} src={`social/${icon.name}.png`} alt={`${icon.name}`} />
                    </a>
                ))}
            </div>
        </div>

    )
}
export default Footer