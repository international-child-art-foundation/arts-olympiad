import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { H2m } from '../common/texts/H2m';
import { Pm } from '../common/texts/Pm';

interface Iprops {
    src : string | StaticImageData
    heading:string
    description:string
    color:string
    star: string | StaticImageData
}


function PrizesCards({src, heading, description, color, star}:Iprops) {
  return (
    <div className={`relative z-20 m-4 col-span-1 h-auto flex flex-col justify-center bg-white items-center border border-2 rounded-md ${color} `}>
      <Image src={src} width = {56} height = {56} className="mt-12 mb-6 sm:ml-0 lg:ml-0" alt="photo" />
      <Image src={star}  alt="" className='absolute z-0 top-10'></Image>
      <H2m className='font-montserrat font-semibold text-dark-blue my-4'>{heading}</H2m>
      <Pm className='font-openSans font-light mt-4 mb-16 px-6'>{description}</Pm>
    </div>
  )
}

export default PrizesCards
