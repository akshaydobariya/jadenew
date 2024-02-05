import React from 'react'

function page() {
    return (
        <div className='pt-20 pb-72 px-10 lg:px-72'>
            <div className='flex items-center justify-between pb-6'>
                <div className='text-2xl font-semibold text-gray-800'>Notification</div>
                <div className='text-sm underline'>Mark all as read</div>
            </div>
            <div className='flex justify-between pb-2 border-b-2 hover:bg-gray-200 px-2'>
                <div>
                    <div>Read Now For free</div>
                    <div className='text-gray-700'>cols bloded</div>
                </div>
                <div className='text-sm text-gray-700'>1 days ago</div>
            </div>
            <div className='flex justify-between py-2 border-b-2 hover:bg-gray-200 px-2'>
                <div>
                    <div>Read Now For free</div>
                    <div className='text-gray-700'>cols bloded</div>
                </div>
                <div className='text-sm text-gray-700'>3 days ago</div>
            </div>
            <div className='flex justify-between pb-2 pt-2 hover:bg-gray-200 px-2'>
                <div>
                    <div>Read Now For free</div>
                    <div className='text-gray-700'>cols bloded</div>
                </div>
                <div className='text-sm text-gray-700'>6 days ago</div>
            </div>
        </div>
    )
}

export default page