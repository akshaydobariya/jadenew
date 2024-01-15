'use client'
import Image from 'next/image'

function Ranking(props) { 
    return (
        <div className='mt-10 px-4 md:px-8 pt-4 pb-20 bg-gray-800 dark:bg-gray-900 text-white'>
            <div className='hidden md:block rankingParentHeading text-2xl md:text-2xl font-semibold text-center'>Ranking</div>
            <div className='hidden md:grid grid-cols-3 gap-14 md:px-2 px-0'>
                <div className='dark:bg-gray-800 pb-20 px-3 rounded-xl mt-3' style={{ boxShadow: "0px 0px 3px 1px #1c1c1c" }}>
                    <div className='flex items-center justify-between pt-6'>
                        <div className='rankingHeading font-semibold text-center px-1'>Ranking By Coins</div>
                        <div className='underline text-[13px] pr-2'>More</div>
                    </div>
                    <div className='hidden md:grid grid-cols-2 gap-y-20 gap-x-8 items-center mt-4'>
                        {props?.rankingByCoinData?.data?.slice(0, 4)?.map((item, index) => {
                            return (
                                <div key={index} className='relative flex items-center justify-center group cursor-pointer'>
                                    <div className='h-36 w-36 -mb-2 z-10'>
                                        <Image height={200} width={200} src={item?.coverImg !== null && item?.coverImg} alt=""
                                            className='h-full w-full rounded-md group-hover:-translate-y-5 group-hover:duration-300' />
                                    </div>
                                    <div className='group-hover:border-[#DC2A74] w-40 text-xs group-hover:border absolute -bottom-14 pt-20 pb-[12px] text-center px-1 rounded-md bg-gray-900'>
                                        <div className='py-[2px] px-[6px] mb-[4px] border rounded-full w-max m-auto'>{index + 1}</div>
                                        <div className='text-gray-500'>{item?.genre}</div>
                                        <div className='font-semibold'>{item?.title?.length > 20 ? item?.title.slice(0, 20) : item?.title}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className='dark:bg-gray-800 pb-20 px-3 rounded-xl mt-3' style={{ boxShadow: "0px 0px 3px 1px #1c1c1c" }}>
                    <div className='flex items-center justify-between pt-6'>
                        <div className='rankingHeading font-semibold text-center px-1'>Ranking By Views</div>
                        <div className='underline text-[13px] pr-2'>More</div>
                    </div>
                    <div className='hidden md:grid grid-cols-2 gap-y-20 gap-x-8 items-center mt-4'>
                        {props?.rankingByViewData?.data?.slice(6, 10)?.map((item, index) => {
                            return (
                                <div key={index} className='relative flex items-center justify-center group cursor-pointer'>
                                    <div className='h-36 w-36 -mb-2 z-10'>
                                        <Image height={200} width={200} src={item?.coverImg !== null && item?.coverImg} alt=""
                                            className='h-full w-full rounded-md group-hover:-translate-y-5 group-hover:duration-300' />
                                    </div>
                                    <div className='group-hover:border-[#DC2A74] w-40 text-xs group-hover:border absolute -bottom-14 pt-20 pb-[12px] text-center px-1 rounded-md bg-gray-900'>
                                        <div className='py-[2px] px-[6px] mb-[4px] border rounded-full w-max m-auto'>{index + 1}</div>
                                        <div className='text-gray-500'>{item?.genre}</div>
                                        <div className='font-semibold'>{item?.title?.length > 20 ? item?.title.slice(0, 20) : item?.title}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className='dark:bg-gray-800 pb-20 px-3 rounded-xl mt-3' style={{ boxShadow: "0px 0px 3px 1px #1c1c1c" }}>
                    <div className='pt-6 flex items-center justify-between'>
                        <div className='rankingHeading font-semibold text-center px-1'>Ranking By Bookmark</div>
                        <div className='underline text-[13px] pr-2'>More</div>
                    </div>
                    <div className='hidden md:grid grid-cols-2 gap-y-20 gap-x-8 items-center mt-4'>
                        {props?.rankingByBookmarkData?.data?.slice(6, 10)?.map((item, index) => {
                            return (
                                <div className='relative flex items-center justify-center group cursor-pointer'>
                                    <div className='h-36 w-36 -mb-2 z-10'>
                                        <Image height={200} width={200} src={item?.coverImg !== null && item?.coverImg} alt=""
                                            className='h-full w-full rounded-md group-hover:-translate-y-5 group-hover:duration-300' />
                                    </div>
                                    <div className='group-hover:border-[#DC2A74] w-40 text-xs group-hover:border absolute -bottom-14 pt-20 pb-[12px] text-center px-1 rounded-md bg-gray-900'>
                                        <div className='py-[2px] px-[6px] mb-[4px] border rounded-full w-max m-auto'>{index + 1}</div>
                                        <div className='text-gray-500'>{item?.genre}</div>
                                        <div className='font-semibold'>{item?.title?.length > 20 ? item?.title.slice(0, 20) : item?.title}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>


            <div className='block md:hidden'>
                <div className='text-center font-semibold pb-2'>Ranking</div>
                <div className='flex justify-center gap-5'>
                    {props?.rankingByBookmarkData?.data?.map((item) => {
                        return (
                            <div className='relative flex items-center justify-center group cursor-pointer'>
                                <div className='h-16 w-24 mb-6 z-10'>
                                    <Image height={100} width={100} src={item?.image} alt="" className='object-cover rounded-md group-hover:-translate-y-2 group-hover:duration-300' />
                                </div>
                                <div className='group-hover:border-[#DC2A74] w-28 text-xs group-hover:border absolute -bottom-14 pt-20 pb-2 text-center px-1 rounded-md bg-gray-900'>
                                    <div className='text-gray-500'>{item?.genre}</div>
                                    <div className='font-semibold'>{item?.title}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Ranking