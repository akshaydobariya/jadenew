import React from 'react'

function Package() {

    const packageData = [
        {
            name: "Gold",
            price: "100",
            country:"India",
            chapter: "15",
            points :"110",
        },
        {
            name: "Silver",
            price: "75",
            country:"korea",
            chapter: "12",
            points :"150",
        },
        {
            name: "Platinum",
            price: "80",
            country:"china",
            chapter: "10",
            points :"50",
        }
    ]

    return (
        <div class="pt-24 pb-10 px-20">
            <div class="">
                <div class="ud-section-title mx-auto text-center">
                    <span className='text-2xl font-semibold'>Pricing</span>
                    <h2 className='pt-1 pb-5'>Our Pricing Plans</h2>
                </div>
            </div>

            <div class="grid grid-cols-3 gap-4">
                {packageData?.map((item) => {
                    return (
                        <div class="border rounded-xl p-2 bg-gray-200" style={{boxShadow:"rgb(235 228 228) 0px 0px 4px 1px"}}>
                            <div class="ud-single-pricing wow fadeInUp flex justify-center flex-col">
                                <span class="ud-popular-tag text-center text-lg font-semibold text-gray-800">{item?.name}</span>
                                <div class="ud-pricing-header text-center  py-2">
                                    <div className='text-sm font-semibold pt-2'>STARTING FROM</div>
                                    <h4>$ {item?.price}</h4>
                                </div>

                                <div class="ud-pricing-body">
                                    <ul className='text-start pr-4'>
                                        <li className='flex flex-col text-center'> <span className='font-semibold'>Country </span>  <span> {item?.country} </span> </li>
                                        <li className='flex flex-col text-center py-2'> <span className='font-semibold'>Points </span>  <span> {item?.points} </span> </li>
                                        <li className='flex flex-col text-center'> <span className='font-semibold'>Support </span>  <span> lorem ipsum dummy </span> </li>
                                        <li className='flex flex-col text-center py-2'> <span className='font-semibold'>Email Alert </span> <span> zscroll@gmail.com </span></li>
                                    </ul>

                                    {/* <ul className='text-end'>
                                        <li className='flex flex-col text-center'> <span className='font-semibold'>Points</span> <span> lorem ipsum dummy </span></li>
                                        <li className='flex flex-col text-center'> <span className='font-semibold'>Workspace</span> <span>lorem ipsum dummy </span></li>
                                        <li className='flex flex-col text-center'> <span className='font-semibold'>Ticket Manager</span> <span> lorem ipsum dummy </span></li>
                                        <li className='flex flex-col text-center'> <span className='font-semibold'>Notification</span> <span>lorem ipsum dummy </span></li>
                                    </ul> */}

                                </div>
                                <div class="ud-pricing-footer text-center my-3">
                                    <a class="ud-main-btn ud-border-btn px-8 py-2 bg-blue-500 text-white rounded-xl">
                                        Purchase Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Package