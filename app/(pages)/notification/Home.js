'use client'
import PaginationControlled from '@/components/pagination'
import useApiService from '@/services/ApiService'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

function Home() {
    const { getAllNotificaiton } = useApiService()
    const [notificationData, setNotificationData] = useState([])
    const [page, setPage] = useState(1)

    const url = `page=${page}&limit=10`
    useEffect(() => {
        getAllNotificaiton(url).then((res) => {
            console.log(res?.data?.data, "first")
            setNotificationData(res?.data?.data)
        }).catch((er) => {
        })
    }, [])

    return (
        <div className='w-[90%] md:w-[80%] lg:w-3/5 pt-4 xl:pt-14 xl:pb-6 flex mx-auto'>
            <div className='w-full my-10 px-26 bg-white dark:bg-[#202020] p-10 h-[100vh] xl:h-full'>
                <div className='flex items-center justify-center'>
                    <div className='text-2xl font-semibold text-gray-800 dark:text-gray-200'>Notifications</div>
                    {/* <div className='text-sm underline'>Mark all as read</div> */}
                </div>
                <hr className=' my-2 mb-8 bg-slate-700' />
                {notificationData?.data?.length == 0 ?
                    <div className='text-center'>No Notification Available</div> :
                    notificationData?.data?.map((item, index) => {
                        return (
                            <div key={index} className='flex justify-between py-2 border-b-2 hover:bg-gray-200 dark:hover:bg-gray-700 px-2 text-gray-700 dark:text-gray-200'>
                                <div>
                                    <div>{item?.title}</div>
                                    <div className=''>{item?.type}</div>
                                </div>
                                <div className='text-sm'>{moment(item?.createdAt).format('DD MMM, YYYY')}</div>
                            </div>
                        )
                    })
                }

                {notificationData?.data?.length > 0 && (
                    <div className='flex justify-center'>
                        <PaginationControlled
                            setPage={setPage}
                            last_page={notificationData?.totalPage}
                            page={page}
                        />
                    </div>
                )}
            </div>

        </div>
    )
}

export default Home