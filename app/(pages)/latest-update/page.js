import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';
import useApiService from '@/services/ApiService';

function LatestUpdate(props) {
    const { getLatesUpdateNovels } = useApiService()
    const [latestUpdateData, setLatestUpdateData] = useState([])

    useEffect(() => {
        getLatesUpdateNovels().then((res) => {
            if (res.status == 200) {
                setLatestUpdateData(res?.data?.data)
            }
        }).catch((er) => {
            console.log(er, "latest update Error");
        })
    }, [])
    return (
        <div className='pt-10 px-4 md:px-8'>
            <div className='text-start pb-5'>
                <div className='text-2xl md:text-2xl font-semibold'>Latest Update</div>
            </div>
            <div className='grid md:grid-cols-3 lg:grid-cols-4 grid-cols-3 md:gap-1 gap-4'>
                {latestUpdateData?.map((item, index) => {
                    return (
                        <div key={index} className='latestCard md:m-3 flex flex-col md:flex-row items-center bg-gray-200 rounded-md'
                            style={{ boxShadow: "0px 0px 4px 1px #d9d1d1" }}>
                            <div className='md:h-32 h-24 w-40'>
                                <Image width={100} height={100} src={item?.coverImg !== null && item?.coverImg} alt='updateImg' className='rounded-l-md h-full w-full object-cover' />
                            </div>
                            <div className='md:pl-5'>
                                <div className='text-lg font-semibold hidden md:block'>{item?.title}</div>
                                <div className='md:py-2 py-[2px] text-gray-600'>{item?.genre}</div>
                                <Rating size='small' name="read-only" value="4" readOnly />
                            </div>
                            <div className="go-corner">
                                <div className="go-arrow text-2xl">
                                    →
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LatestUpdate