import Image from 'next/image'
import React from 'react'

function Ranking(data) {
    console.log(data);
    return (
        <div className='mt-10 px-4 md:px-8 pt-4 pb-20 bg-gray-800 text-white'>
            <div className='rankingHeading text-2xl md:text-2xl font-semibold text-center'>Ranking</div>
            <div className='md:px-20 px-0'>
                <div className='hidden md:grid grid-cols-7 items-center mt-8'>
                    <div className='font-semibold px-4 pt-6'>Ranking By Coins</div>
                    {data?.NewReleaseData?.map((item) => {
                        return (
                            <div className='relative flex items-center justify-center group cursor-pointer'>
                                <div className='h-24 w-32 mb-6 z-10'>
                                    <Image src={item?.image} alt="" className='object-cover rounded-md group-hover:-translate-y-2 group-hover:duration-300' />
                                </div>
                                <div className='group-hover:border-[#DC2A74] w-36 text-xs group-hover:border absolute -bottom-14 pt-20 pb-2 text-center px-1 rounded-md bg-gray-900'>
                                    <div className='text-gray-500'>{item?.category}</div>
                                    <div className='font-semibold'>{item?.name.slice(0, 18)}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className='hidden md:grid grid-cols-7 items-center mt-24'>
                    <div className='font-semibold pt-6 px-4'>Ranking By Views</div>
                    {data?.NewReleaseData?.map((item) => {
                        return (
                            <div className='relative flex items-center justify-center group cursor-pointer'>
                                <div className='h-24 w-32 mb-6 z-10'>
                                    <Image src={item?.image} alt="" className='object-cover rounded-md group-hover:-translate-y-2 group-hover:duration-300' />
                                </div>
                                <div className='group-hover:border-[#DC2A74] w-36 text-xs group-hover:border absolute -bottom-14 pt-20 pb-2 text-center px-1 rounded-md bg-gray-900'>
                                    <div className='text-gray-500'>{item?.category}</div>
                                    <div className='font-semibold'>{item?.name.slice(0, 18)}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className='font-semibold md:hidden block pt-3 px-2'>Ranking By Coins</div>
                <div className='grid  md:hidden md:grid-cols-7 grid-cols-3 items-center mt-4'>
                    <div className='relative flex items-center justify-center group cursor-pointer'>
                        <div className='h-16 w-20 mb-6 z-10'>
                            <Image src={data?.NewReleaseData[0]?.image} alt="" className='object-cover rounded-md group-hover:-translate-y-2 group-hover:duration-300' />
                        </div>
                        <div className='group-hover:border-[#DC2A74] w-24 text-xs group-hover:border absolute -bottom-14 pt-14 pb-2 text-center px-1 rounded-md bg-gray-900'>
                            <div className='text-gray-500'>{data?.NewReleaseData[0]?.category}</div>
                            <div className='font-semibold'>{data?.NewReleaseData[0]?.name.slice(0, 18)}</div>
                        </div>
                    </div>
                    <div className='relative flex items-center justify-center group cursor-pointer'>
                        <div className='h-16 w-20 mb-6 z-10'>
                            <Image src={data?.NewReleaseData[0]?.image} alt="" className='object-cover rounded-md group-hover:-translate-y-2 group-hover:duration-300' />
                        </div>
                        <div className='group-hover:border-[#DC2A74] w-24 text-xs group-hover:border absolute -bottom-14 pt-14 pb-2 text-center px-1 rounded-md bg-gray-900'>
                            <div className='text-gray-500'>{data?.NewReleaseData[0]?.category}</div>
                            <div className='font-semibold'>{data?.NewReleaseData[0]?.name.slice(0, 18)}</div>
                        </div>
                    </div>
                    <div className='relative flex items-center justify-center group cursor-pointer'>
                        <div className='h-16 w-20 mb-6 z-10'>
                            <Image src={data?.NewReleaseData[0]?.image} alt="" className='object-cover rounded-md group-hover:-translate-y-2 group-hover:duration-300' />
                        </div>
                        <div className='group-hover:border-[#DC2A74] w-24 text-xs group-hover:border absolute -bottom-14 pt-14 pb-2 text-center px-1 rounded-md bg-gray-900'>
                            <div className='text-gray-500'>{data?.NewReleaseData[0]?.category}</div>
                            <div className='font-semibold'>{data?.NewReleaseData[0]?.name.slice(0, 18)}</div>
                        </div>
                    </div>                    
                </div>

                <div className='mt-16 md:hidden block font-semibold pt-6 pb-2'>Ranking By Views</div>
                <div className='grid  md:hidden md:grid-cols-7 grid-cols-3 items-center mt-4'>
                    <div className='relative flex items-center justify-center group cursor-pointer'>
                        <div className='h-16 w-20 mb-6 z-10'>
                            <Image src={data?.NewReleaseData[0]?.image} alt="" className='object-cover rounded-md group-hover:-translate-y-2 group-hover:duration-300' />
                        </div>
                        <div className='group-hover:border-[#DC2A74] w-24 text-xs group-hover:border absolute -bottom-14 pt-14 pb-2 text-center px-1 rounded-md bg-gray-900'>
                            <div className='text-gray-500'>{data?.NewReleaseData[0]?.category}</div>
                            <div className='font-semibold'>{data?.NewReleaseData[0]?.name.slice(0, 18)}</div>
                        </div>
                    </div>
                    <div className='relative flex items-center justify-center group cursor-pointer'>
                        <div className='h-16 w-20 mb-6 z-10'>
                            <Image src={data?.NewReleaseData[0]?.image} alt="" className='object-cover rounded-md group-hover:-translate-y-2 group-hover:duration-300' />
                        </div>
                        <div className='group-hover:border-[#DC2A74] w-24 text-xs group-hover:border absolute -bottom-14 pt-14 pb-2 text-center px-1 rounded-md bg-gray-900'>
                            <div className='text-gray-500'>{data?.NewReleaseData[0]?.category}</div>
                            <div className='font-semibold'>{data?.NewReleaseData[0]?.name.slice(0, 18)}</div>
                        </div>
                    </div>
                    <div className='relative flex items-center justify-center group cursor-pointer'>
                        <div className='h-16 w-20 mb-6 z-10'>
                            <Image src={data?.NewReleaseData[0]?.image} alt="" className='object-cover rounded-md group-hover:-translate-y-2 group-hover:duration-300' />
                        </div>
                        <div className='group-hover:border-[#DC2A74] w-24 text-xs group-hover:border absolute -bottom-14 pt-14 pb-2 text-center px-1 rounded-md bg-gray-900'>
                            <div className='text-gray-500'>{data?.NewReleaseData[0]?.category}</div>
                            <div className='font-semibold'>{data?.NewReleaseData[0]?.name.slice(0, 18)}</div>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default Ranking