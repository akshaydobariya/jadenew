import AppConfig from "@/appConfig"
import Home from "./Home"

export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const id = params.id

    const baseUrl = AppConfig.apiUrl
    console.log(id, params, searchParams, "id metadata")
    const ids = `id=${params.id}&chapterSort=${"DESC"}`
    let product = await fetch(`${baseUrl}public/get-novel?id=${id}&chapterSort="DESC"`).then((res) => res.json())
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