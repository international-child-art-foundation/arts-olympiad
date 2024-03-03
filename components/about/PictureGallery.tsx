import Image from 'next/image';
import Rectangle from '../../public/about/Rectangle.png';
import Photo1 from '../../public/about/Photo1.png';
import Photo2 from '../../public/about/Photo2.png';
import Photo3 from '../../public/about/Photo3.png';
import Square from '../../public/about/Square.png';
import YellowBlob from '../../public/about/YellowBlob.png';
import YellowLine from '../../public/about/YellowLine.png';
import snowFlakeLeft from '../../public/about/snowFlakeLeft.png';
import snowFlakeRight from '../../public/about/snowFlakeRight.png';

export const PictureGallery = () => {
    return (
        <>
            
            
            
            <Image src={YellowBlob} alt="" className="absolute z-0 mt-20"></Image>
            <div className="grid grid-cols-3 z-20 mt-20 w-full px-20">
                <div className="col-span-3 py-5 px-5 z-20">
                    <Image src={Rectangle} alt="" className='z-20'></Image>
                </div>
                
                <div className="z-20 py-5 px-5">
                    <Image src={YellowLine} alt="" className="absolute z-10 w-20 left-10"></Image>
                    <Image src={snowFlakeLeft} alt="" className="absolute z-10 w-10 left-10 mt-80"></Image>
                    <Image src={Photo1} alt="" className=''></Image>
                </div>
                <div className="z-20 py-5 px-5">
                    <Image src={Photo2} alt="" className=''></Image>
                </div>
                <div className="z-20 py-5 px-5">
                    <Image src={snowFlakeRight} alt="" className="absolute right-0 mt-20 z-10 w-10 right-10 mt-80"></Image>
                    <Image src={Photo3} alt="" className=''></Image>
                </div>
            </div>
        </>
    )
};