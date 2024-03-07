import React from 'react'
import Home from './Home'

export const metadata = {
    title: 'jadeScroll title bookmark page',
    description: 'jadeScroll description bookmark page',
    openGraph: {
        title: 'jadeScroll title bookmark page',
    },
}

function bookmark() {
    return (
        <div>
            <Home />
        </div>
    )
}

export default bookmark