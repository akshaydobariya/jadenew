import AppConfig from "@/appConfig";
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};

export const metadata = {
    title: 'Jade scroll Novel Managment web',
    description: 'Jadescroll Novels description',
}


async function HomePage() {
    const baseUrl = 'https://zscroll.peclick.com/api/'
    const response = await fetch(`${baseUrl}public/get-new-released-novels`)
    const responsePopularNovel = await fetch(`${baseUrl}public/get-most-popular-novels`)
    const resNovelByGenre = await fetch(`${baseUrl}public/get-all-gernes`)
    const resPopular = await fetch(`${baseUrl}public/get-most-popular-novels`)
    const resOrigianlWork = await fetch(`${baseUrl}public/get-original-novels`)
    const resLatestUpdate = await fetch(`${baseUrl}public/get-latest-update-novels`)
    const resRankingByView = await fetch(`${baseUrl}public/get-rank-by-view-novels`)
    const resRankingByBookmark = await fetch(`${baseUrl}public/get-rank-by-bookmark-novels`)
    const resRankingByCoin = await fetch(`${baseUrl}public/get-rank-by-coin-novels`)
    const resPopularThisWeek = await fetch(`${baseUrl}public/get-popular-this-week-novels`)
    const resFeaturedProduct = await fetch(`${baseUrl}public/get-featured-novels`)

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

    // const [open, setOpen] = (false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    return (
        <>
            <Head>
                <meta property="og:title" content="Jade scroll" />
                <meta name="og:description" content="Jade scroll novels home page" />
            </Head>
            <div className='pt-[65px]'>
                {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='md:w-[550px] w-[320px]' >
                    <div className='flex justify-between text-center cursor-pointer'>
                        <div onClick={() => setAnnouncmentTab("All")} className={announcmentTab === "All" ? 'border w-full p-2 bg-black text-white' :
                            'border w-full p-2 border-black'}>All</div>
                        <div onClick={() => setAnnouncmentTab("offer")} className={announcmentTab === "All" ? 'border w-full p-2 border-black' :
                            'border w-full p-2 bg-black text-white'}>Offer</div>
                    </div>
                    <ul className='list-disc px-2 pt-2'>
                        <li className='flex justify-between items-center'>
                            <div>Lorem Ipsum is simply dummy text.</div>
                            <div className='text-sm'>13 Dec 2023</div>
                        </li>
                        <li className='flex justify-between items-center'>
                            <div>Lorem Ipsum is simply dummy text.</div>
                            <div className='text-sm'>13 Dec 2023</div>
                        </li>
                        <li className='flex justify-between items-center'>
                            <div>Lorem Ipsum is simply dummy text.</div>
                            <div className='text-sm'>13 Dec 2023</div>
                        </li>
                        <li className='flex justify-between items-center'>
                            <div>Lorem Ipsum is simply dummy text.</div>
                            <div className='text-sm'>13 Dec 2023</div>
                        </li>
                    </ul>
                </Box>
            </Modal>
            <div>
                <NotificationsIcon onClick={() => setOpen(true)} className='h-12 w-12 fixed bottom-12 right-7 z-10 cursor-pointer border rounded-full bg-gray-200' />
            </div> */}

                <Banner />

                <div className="px-4 md:hidden block">
                    <div className="text-xl font-semibold pt-3 pb-2">Annoucments</div>
                    <div className="py-4 px-2 bg-gray-100 shadow-md">
                        <div className="font-semibold">Introducing Yuan's Ascension!</div>
                        <div>8 days ago</div>
                    </div>
                </div>
                <div>
                    <NewRelease NewReleasedata={NewReleasedata} />
                </div>

                <BecomeAuthor />

                <PopularNovels popularNovelsData={popularNovelsData} />

                <div className="hidden lg:block">
                    <NovelByGenre novelByGenreData={novelByGenreData} />
                </div>

                <FeaturedBook featuredProductData={featuredProductData} />

                <Popular popularData={popularThisWeekData} />

                <Originals origianlWorkData={origianlWorkData} />

                <LatestUpdate latestUpdateData={latestUpdateData} />

                <Ranking rankingByViewData={rankingByViewData} rankingByBookmarkData={rankingByBookmarkData} rankingByCoinData={rankingByCoinData} />
            </div>
        </>
    )
}

export default HomePage