'use client'
import useApiService from '@/services/ApiService'
import React from 'react'

function ButtonBook(props) {
    const { paymentApi } = useApiService()

    const buyBook = () => {
        let bookBody = ({
            items: [
                {
                    novelId: props?.id,
                    type: "BOOK"
                },
            ],
            "discountId": null,
            "description": props?.description
        })
        paymentApi(bookBody).then((res) => {
            console.log(res, "payment book")
        }).catch((er) => {
            console.log(er)
        })
    }

    return (
        <div onClick={() => buyBook()} className='cursor-pointer text-center border w-full rounded-full py-1 bg-blue-500 text-white'>Buy Now ${props?.price !== null && props?.price}</div>
    )
}

export default ButtonBook