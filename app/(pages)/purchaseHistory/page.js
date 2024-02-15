'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';
import popularComicTwo from '../../../public/assets/Images/PopularComics/comicsTwo.jpg'
import { useRouter } from 'next/navigation';
import useApiService from '@/services/ApiService';

function purchaseHistory() {
    const router = useRouter()
    const [transactionData, setTransactionData] = useState([])
    const { getTransaction } = useApiService()

    useEffect(() => {
        getTransaction().then((res) => {
            console.log(res?.data?.data, "--res--");
            setTransactionData(res?.data?.data)
        }).catch((er) => {
            console.log(er);
        })
    }, [])

    return (
        <div className='pt-16'>
            <div className='bg-gray-200 dark:bg-[#131415] lg:px-52 px-2 md:px-8 pb-2'>
                <div className='text-center text-gray-800 pt-7 pb-3'>
                    <div className='text-2xl dark:text-gray-200'>Purchase History</div>
                </div>
                {transactionData?.map((data, i) => {
                    return (
                        <div className='flex border-gray-400 rounded-md text-white shadow-md my-2 border bg-white dark:bg-gray-950'
                            onClick={() => router.push('/detail/123')}>
                            <div>
                                <Image src={data?.items[0]?.novelId?.coverImg} height={300} width={300} alt='' className='h-[9rem] w-40 object-cover rounded-l-md' />
                            </div>
                            <div className='pl-3 flex justify-between w-full pr-2'>
                                <div>
                                    <div className='text-lg text-gray-900 dark:text-gray-200'>{data?.items[0]?.name}</div>
                                    <div className='flex text-sm list-disc gap-6 pt-1 text-gray-600 dark:text-gray-200'>
                                        <div className='font-semibold'>{data?.items[0]?.fromChapter} - {data?.items[0]?.toChapter} chapter</div>
                                    </div>
                                    <div className='text-gray-600 dark:text-gray-200 text-sm'>
                                        <div className='py-1'>Free Chapter +{data?.items[0]?.toChapter - data?.items[0]?.fromChapter + 1} Advance</div>
                                        <div>Transaction id : {data?._id}</div>
                                    </div>
                                </div>
                                <div className='hidden md:flex text-gray-600 dark:text-gray-200 pt-1 text-sm md:text-base flex-col justify-end md:justify-start pb-3'>
                                    <div>Tier - {data?.items[0]?.tierName}</div>
                                    <div>${data?.items[0]?.price} month</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className='flex justify-between textThemeColor'>
                    <button className='flex items-center'>
                        <KeyboardBackspaceIcon fontSize='small' />
                        <div className='pl-1'>Preview</div>
                    </button>
                    <button className='flex items-center'>
                        <div className='font-semibold pr-1'>Next</div>
                        <EastIcon fontSize='small' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default purchaseHistory