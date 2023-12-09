import Image from 'next/image'
import React from 'react'

function OriginByGenre(props) {
    return (
        <div className='md:pt-10 pt-10 px-8'>
            <div className='text-2xl md:text-3xl font-semibold pb-4 md:pb-6'>Originals By Genre</div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {props.OriginalsImage.map((item, index) => {
                    return (
                        <div key={index} className='flex border shadow-md bg-gray-100 rounded-sm' style={{ boxShadow: "0px 0px 6px 1px #efecec" }}>
                            <div className='h-20 md:h-20 w-20'>
                                <Image src={item.image} alt='' className='h-full w-full object-cover rounded' />
                            </div>
                            <div className='pl-3'>
                                <div className=''>Drama</div>
                                <div className='font-semibold'>comic - {item.name}</div>
                                <div className='text-sm'>SOY MEDIA/Hansol</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default OriginByGenre