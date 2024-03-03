import Image from 'next/image';
import Photo1 from '../../public/about/Photo1.png';
import Photo2 from '../../public/about/Photo2.png';
import Photo3 from '../../public/about/Photo3.png';
import Square from '../../public/about/Square.png';
import Reactangle from '../../public/about/Reactangle.png';
import YellowBlob from '../../public/about/YellowBlob.png';
import YellowLine from '../../public/about/YellowLine.png';
import snowFlakeLeft from '../../public/about/snowFlakeLeft.png';
import snowFlakeRight from '../../public/about/snowFlakeRight.png';

const ImageCarousel = () => {
    return (
        <>
            <Image src={YellowLine} alt="" className="absolute z-40 w-8"></Image>
            <Image src={snowFlakeLeft} alt="" className="absolute mt-40 z-10 w-8"></Image>
            <Image src={snowFlakeRight} alt="" className="absolute right-0 mt-20 z-10 w-8"></Image>
            <Image src={YellowBlob} alt="" className="absolute z-0 h-40 mt-20"></Image>
            <div className="z-20 flex flex-row overflow-x-auto whitespace-nowrap px-4 mt-10">
                <Image src={Square} alt="" className="px-2 w-42 h-40 z-20"/>
                <Image src={Photo1} alt="" className="px-2 w-42 h-40 z-20"/>
                <Image src={Photo2} alt="" className="px-2 w-42 h-40 z-20"/>
                <Image src={Photo3} alt="" className="px-2 w-42 h-40 z-20"/>
            </div>
        </>

    )
};
export default ImageCarousel;

