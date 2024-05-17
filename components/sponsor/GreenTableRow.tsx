import React from 'react'
import check from '../../public/sponsor/check.png'
import Image from 'next/image'

interface IProps extends React.HTMLProps<HTMLDivElement>{
    td:string
    td1:string
    td2:string
}

function GreenTableRow({td, td1, td2}:IProps) {
  return (
        <tr className='border-2'>
            <td className='px-12 py-4 border-2'>{td}</td>
            <td className='px-12 py-4 border-2'><Image src={check} alt="" className='w-6 h-6 mx-auto'></Image></td>          
            <td className='px-12 py-4 border-2'><Image src={check} alt="" className={`w-6 h-6 mx-auto ${td1 == "true" ? 'block' : 'hidden'}`}></Image></td>
            <td className='px-12 py-4 border-2'><Image src={check} alt="" className={`w-6 h-6 mx-auto ${td2 == "true" ? 'block' : 'hidden'}`}></Image></td>
        </tr>
  )
}

export default GreenTableRow
