import React from 'react'

function page() {
    return (
        <div className='w-3/5 pt-24 flex mx-auto  '>
            <div className='w-full my-10 px-26 bg-white max-h-[70vh] p-10  min-h-[50vh] '>
            <div className='flex items-center justify-center'>
                <div className='text-2xl font-semibold text-gray-800 dark:text-gray-200'>Notifications</div>
                {/* <div className='text-sm underline'>Mark all as read</div> */}
            </div>
            <hr className=' my-2 mb-10 bg-slate-700'/>
            <div className='flex justify-between pb-2 border-b-2 hover:bg-gray-200 dark:hover:bg-gray-700 px-2 text-gray-700 dark:text-gray-200'>
                <div>
                    <div>Read Now For free</div>
                    <div className=''>cols bloded</div>
                </div>
                <div className='text-sm'>1 days ago</div>
            </div>
            <div className='flex justify-between py-2 border-b-2 hover:bg-gray-200 dark:hover:bg-gray-700 px-2 text-gray-700 dark:text-gray-200'>
                <div>
                    <div>Read Now For free</div>
                    <div className=''>cols bloded</div>
                </div>
                <div className='text-sm'>3 days ago</div>
            </div>
            <div className='flex justify-between pb-2 pt-2 hover:bg-gray-200 dark:hover:bg-gray-700 px-2 text-gray-700 dark:text-gray-200'>
                <div>
                    <div>Read Now For free</div>
                    <div className=''>cols bloded</div>
                </div>
                <div className='text-sm'>6 days ago</div>
            </div>
            </div>
        </div>
    )
}

export default page