import Banner from "../(pages)/HomePage/Banner";
import NewRelease from "../(pages)/HomePage/NewRelease";
import BecomeAuthor from "../(pages)/HomePage/BecomeAuthor";
import PopularNovels from "../(pages)/HomePage/PopularNovels";
import NovelByGenre from "../(pages)/HomePage/NovelByGenre";
import FeaturedBook from "../(pages)/HomePage/FeaturedBook";
import Popular from "../(pages)/HomePage/Popular";
import Originals from "../(pages)/HomePage/Originals";
import LatestUpdate from "../(pages)/latest-update/page";
import Ranking from "../(pages)/HomePage/Ranking";
import Head from "next/head";
import Annoucment from "../(pages)/HomePage/Annoucment";

async function HomePage() {
    const banner = await fetch(`${process.env.baseUrl}public/get-banners`)
    const response = await fetch(`${process.env.baseUrl}public/get-new-released-novels`)
    const responsePopularNovel = await fetch(`${process.env.baseUrl}public/get-most-popular-novels`)
    const resNovelByGenre = await fetch(`${process.env.baseUrl}public/get-all-gernes`)
    const resPopular = await fetch(`${process.env.baseUrl}public/get-most-popular-novels`)
    const resOrigianlWork = await fetch(`${process.env.baseUrl}public/get-original-novels`)
    const resLatestUpdate = await fetch(`${process.env.baseUrl}public/get-latest-update-novels`)
    const resRankingByView = await fetch(`${process.env.baseUrl}public/get-rank-by-view-novels`)
    const resRankingByBookmark = await fetch(`${process.env.baseUrl}public/get-rank-by-bookmark-novels`)
    const resRankingByCoin = await fetch(`${process.env.baseUrl}public/get-rank-by-coin-novels`)
    const resPopularThisWeek = await fetch(`${process.env.baseUrl}public/get-popular-this-week-novels`)
    const resFeaturedProduct = await fetch(`${process.env.baseUrl}public/get-featured-novels`)

    const bannerData = await banner.json()
    const NewReleasedata = await response.json()
    const popularNovelsData = await responsePopularNovel.json()
    const novelByGenreData = await resNovelByGenre.json()
    const popularData = await resPopular.json()
    const origianlWorkData = await resOrigianlWork.json()
    const latestUpdateData = await resLatestUpdate.json()
    const rankingByViewData = await resRankingByView.json()
    const rankingByBookmarkData = await resRankingByBookmark.json()
    const rankingByCoinData = await resRankingByCoin.json()
    const popularThisWeekData = await resPopularThisWeek.json()
    const featuredProductData = await resFeaturedProduct.json()

    return (
        <>
            <Head>
                <meta property="og:title" content="Jade scroll" />
                <meta name="og:description" content="Jade scroll novels home page" />
            </Head>
            <div className='pt-[65px]'>

                <Banner bannerData={bannerData} />

                <Annoucment />

                <div>
                    <NewRelease NewReleasedata={NewReleasedata} />
                </div>

                <BecomeAuthor />

                <PopularNovels popularNovelsData={popularNovelsData} />

                <NovelByGenre novelByGenreData={novelByGenreData} />

                <FeaturedBook featuredProductData={featuredProductData} />

                <Popular popularData={popularThisWeekData} />

                <Originals origianlWorkData={origianlWorkData} />

                <LatestUpdate latestUpdateData={latestUpdateData} />

                <div className="hidden lg:block">
                    <Ranking rankingByViewData={rankingByViewData} rankingByBookmarkData={rankingByBookmarkData} rankingByCoinData={rankingByCoinData} />
                </div>
            </div>
        </>
    )
}

export default HomePage