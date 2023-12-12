import Image from 'next/image'
import React from 'react'

function OriginByGenre(props) {
    return (
        <div className='md:pt-10 pt-10 md:px-8 px-4'>
            <div className='text-2xl md:text-2xl font-semibold pb-4 md:pb-6'>Novels By Genre</div>
            <div className='grid grid-cols-2 md:grid-cols-6 md:gap-10 gap-2'>
                {props?.OriginalsImage?.map((item, index) => {
                    return (
                        // <div key={index} className='flex border shadow-md bg-gray-100 rounded-sm' style={{ boxShadow: "0px 0px 6px 1px #efecec" }}>
                        //     <div className='h-20 md:h-20 w-20'>
                        //         <Image src={item.image} alt='' className='h-full w-full object-cover rounded' />
                        //     </div>
                        //     <div className='pl-3'>
                        //         <div className=''>Drama</div>
                        //         <div className='font-semibold'>comic - {item.name}</div>
                        //         <div className='text-sm'>SOY MEDIA/Hansol</div>
                        //     </div>
                        // </div>
                        <div className='relative h-20 w-44 md:h-28 md:w-[13rem] rounded' style={{ boxShadow: "1px 6px 11px 0px #c9c1c1" }}>
                            <Image src={item.image} alt='' className='h-full w-full object-cover rounded' />
                            <div className='gradientClass absolute bottom-0 w-full text-white font-semibold flex justify-center'>{item.category}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default OriginByGenre