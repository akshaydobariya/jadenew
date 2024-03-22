import React from 'react'
import Home from './Home'

export const metadata = {
    title: 'jadescroll Ebooks page title',
    description: 'jadescroll Ebooks description',
}

async function page() {
    const resResource = await fetch(`${process.env.baseUrl}public/get-resources-novels`, { cache: 'no-store' })
    const resourceData = await resResource.json()

    return (
        <div>
            <Home resourceData={resourceData} />
        </div>
    )
}

export default page