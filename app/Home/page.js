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
    const banner = await fetch(`${process.env.baseUrl}public/get-banners`, { cache: 'no-store' })
    const response = await fetch(`${process.env.baseUrl}public/get-new-released-novels`, { cache: 'no-store' })
    const responsePopularNovel = await fetch(`${process.env.baseUrl}public/get-most-popular-novels`, { cache: 'no-store' })
    const resNovelByGenre = await fetch(`${process.env.baseUrl}public/get-all-gernes`, { cache: 'no-store' })
    const resPopular = await fetch(`${process.env.baseUrl}public/get-most-popular-novels`, { cache: 'no-store' })
    const resOrigianlWork = await fetch(`${process.env.baseUrl}public/get-original-novels`, { cache: 'no-store' })
    const resLatestUpdate = await fetch(`${process.env.baseUrl}public/get-latest-update-novels`, { cache: 'no-store' })
    const resRankingByView = await fetch(`${process.env.baseUrl}public/get-rank-by-view-novels`, { cache: 'no-store' })
    const resRankingByBookmark = await fetch(`${process.env.baseUrl}public/get-rank-by-bookmark-novels`, { cache: 'no-store' })
    const resRankingByCoin = await fetch(`${process.env.baseUrl}public/get-rank-by-coin-novels`, { cache: 'no-store' })
    const resPopularThisWeek = await fetch(`${process.env.baseUrl}public/get-popular-this-week-novels`, { cache: 'no-store' })
    const resFeaturedProduct = await fetch(`${process.env.baseUrl}public/get-featured-novels`, { cache: 'no-store' })

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

                {/* <NovelByGenre novelByGenreData={novelByGenreData} /> */}

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