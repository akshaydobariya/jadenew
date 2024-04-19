'use client'
import useApiService from '@/services/ApiService'
import { useEffect, useState } from 'react'

function AboutUs() {
    const [termsConditionData, setTermsConditionData] = useState([])
    const { cms } = useApiService()

    useEffect(() => {
        cms('about').then((res) => {
            setTermsConditionData(res?.data?.data)
        }).catch((er) => {
            console.log(er)
        })
    }, [])

    return (
        <div className='pt-20'>
            {termsConditionData?.map((data, index) => {
                return (
                    <div key={index} className='pt-4 pb-8 px-8 md:px-20 break-all h-screen w-full' dangerouslySetInnerHTML={{ __html: data?.description }}></div>
                )
            })}
        </div>
    )
}

export default AboutUs