import React from 'react'
import { StaticImageData } from 'next/image'
import Image from 'next/image'
import { Pm } from '../common/texts/Pm'
import { H2m } from '../common/texts/H2m'


interface AccordionCardProps {
  heading:string
  description: string
  number: number
  textColor: string
  borderColor: string
  image: string | StaticImageData
  isMobile: boolean
}

function AccordionCard({heading, description, number, textColor, borderColor, image, isMobile}: AccordionCardProps) {
  if(isMobile) {
      return (
        <div className='flex flex-col justify-center'>
          <div className={`box-header flex flex-row justify-between p-6 items-center `} >
            <h1 className={`font-bold text-center text-3xl md:text-5xl lg:text-6xl ${textColor}`}>0{`${number}`}</h1>
            <h3
              className="border-header text-2xl font-semibold font-montserrat whitespace-nowrap"
            >
              {heading}
            </h3>
          </div>
          <div className={`border-2 ${borderColor}`}></div>
          <div className="relative flex flex-col pl-8 py-8 w-full z-20">
            <div className="text relative px-16 z-20">
              <Pm className='font-openSans font-light py-4 z-20 '> 
                {description}
              </Pm>
            </div>
          </div>
          <div className='box-image absolute self-center py-32 -bottom-32 z-0 w-1/2 '>
              <Image src={image} alt="" className='relative z-0'></Image>
          </div>
        </div>
      )
  }
  return (
    <div className='flex flex-row justify-between'>
          <div className="relative flex flex-col pl-8 py-8 w-full z-20">
            <div className="box-header text relative px-16 z-20">
              <H2m className='font-montserrat font-semibold'>{heading}</H2m>
              <Pm className='font-openSans font-light py-4 z-20 '> 
                {description}
              </Pm>
            </div>
          </div>
          <div className={`flex flex-col justify-between min-w-[80px] p-6 items-center `} >
            <h1 className={`font-bold text-center md:text-4xl md:mr-6 lg:mr-0 lg:text-6xl ${textColor}`}>0{`${number}`}</h1>
            <h3
              className="border-header text-2xl font-semibold font-montserrat rotate-90 whitespace-nowrap mt-36"
            >
              {heading}
            </h3>
          </div>
          <div className='box-image absolute py-32 right-0 -bottom-32 z-0 w-1/2 '>
              <Image src={image} alt="" className='relative z-0'></Image>
          </div>
    </div>
  )
}

export default AccordionCard
