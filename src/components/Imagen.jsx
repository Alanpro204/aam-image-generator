import React from 'react'
import { useState } from 'react'
import { BiSolidDownload } from 'react-icons/bi'
import { BsDownload } from 'react-icons/bs'

function Imagen({ className, src, prompt }) {
    const [hovered, setHovered] = useState(false)
    return (
        <div className='relative'>
            {prompt &&
                <a href={src} target='_blank' download={true} className='absolute top-0 right-0 m-2 p-1 bg-white rounded-md'>
                    <BiSolidDownload />
                </a>
            }
            <img onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={`${className}`} src={`${src}`} alt="" />
            {hovered && prompt ?
                <div className={`top-52 bg-white text-sm absolute w-full z-10 p-2 rounded-md shadow-sm shadow-black`}>
                    "{prompt}"
                </div>
                : <></>
            }
        </div>
    )
}

export default Imagen