import React from 'react'
import NewRelaseTwo from '../../../public/assets/Images/NewRelease/newReleaseSix.jpeg'
import Image from 'next/image'
import premuimIcon from '../../../public/assets/Images/PackagePage/crown.png'
import DoneIcon from '@mui/icons-material/Done';

function Package() {

    const packageData = [
        {
            name: "Basic",
            price: "3.99",
            country: "India",
            chapter: "15",
            points: "110",
        },
        {
            name: "Standard",
            price: "9.99",
            country: "korea",
            chapter: "12",
            points: "150",
        },
        {
            name: "Premium",
            price: "6.99",
            country: "china",
            chapter: "10",
            points: "50",
        }
    ]

    return (
        <div class="pt-20 pb-10 px-20">
            <div class="">
                <div class="ud-section-title mx-auto text-center pb-4">
                    <span className='text-2xl font-semibold'>Pricing</span>
                    {/* <h2 className='pt-1 pb-3'>Our Pricing Plans</h2> */}
                </div>
            </div>

            <div class="grid grid-cols-3 gap-10 px-20">
                {packageData?.map((item, index) => {
                    return (
                        <div className='border rounded-xl' style={{ boxShadow: "#dfdfdf 0px 0px 11px 2px" }}>
                            <div className={index === 0 ? 'gradientPackageOne text-center rounded-t-xl text-white' :
                                index == 1 ? 'gradientPackageTwo text-center rounded-t-xl text-white' :
                                    index == 2 ? 'gradientPackageThree text-center rounded-t-xl text-white' :
                                        'text-center rounded-t-xl text-white'}>
                                <div className='text-2xl py-2 uppercase'>{item?.name}</div>
                                <div className='text-xs px-10 border-t-2 py-2'>AD-FREE BROWSING EXPERIENCE FOR READERS, WITH PUSH NOTIFICATIONS AND VISUALS TO SHOW YOUR SUPPORT OF ROYAL ROAD</div>
                            </div>
                            <div className='flex text-sm py-2 border-b-2 w-max m-auto' style={{boxShadow:"#edecec 0px 13px 16px -5px"}}>
                                <div className='pr-[2px] text-3xl'>$</div>
                                <div className=' text-5xl'>{item?.price}</div>
                                <div className='pt-7'>/ Per Month</div>
                            </div>
                            <div className='px-14 py-4 leading-8'>
                                <div>
                                    <span><DoneIcon fontSize='small' /> </span>
                                    <span className='pl-2'>Push Notification</span>
                                </div>
                                <div>
                                    <span><DoneIcon fontSize='small' /> </span>
                                    <span className='pl-2'>Premium Badge</span>
                                </div>
                                <div>
                                    <span><DoneIcon fontSize='small' /> </span>
                                    <span className='pl-2'>Full Reading History</span>
                                </div>
                                <div>
                                    <span><DoneIcon fontSize='small' /> </span>
                                    <span className='pl-2'>Email Alert</span>
                                </div>
                                <div>
                                    <span><DoneIcon fontSize='small' /> </span>
                                    <span className='pl-2'>Coins</span>
                                </div>
                                <div>
                                    <span><DoneIcon fontSize='small' /> </span>
                                    <span className='pl-2'>Support Zscroll</span>
                                </div>
                            </div>
                            <div className='flex justify-center mt-4 mb-4'>
                                <button className={index == 0 ? 'gradientPackageOne px-9 py-[6px] rounded-full text-white' :
                                    index == 1 ? 'gradientPackageTwo px-9 py-[6px] rounded-full text-white' :
                                        'gradientPackageThree px-9 py-[6px] rounded-full text-white'}>Buy Now</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Package