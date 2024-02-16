import React from 'react'

function page() {
    return (
        <div className='pt-20 pb-72 px-10 lg:px-72'>
            <div className='flex items-center justify-between pb-6'>
                <div className='text-2xl font-semibold text-gray-800 dark:text-gray-200'>Notification</div>
                <div className='text-sm underline'>Mark all as read</div>
            </div>
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
    )
}

export default page