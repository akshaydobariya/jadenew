import Home from "./Home"

export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const id = params.id

    console.log(id, params, searchParams, "id metadata")
    const ids = `id=${params.id}&chapterSort=${"DESC"}`
    let product = await fetch(`https://zscroll.peclick.com/api/public/get-novel?id=${id}&chapterSort="DESC"`).then((res) => res.json())
    const previousImages = (await parent).openGraph?.images || []

    return {
        title: product?.data?.title,
        description: product?.data?.description,
        openGraph: {
            description: product?.data?.description,
            images : '../../../../public/assets/icon/logoLightMode.png'
        }
    }
}

function BookDetail() {
    return (
        <div>
            <Home />
        </div>
    )
}

export default BookDetail