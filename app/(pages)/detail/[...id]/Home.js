"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import premiumIcon from "../../../../public/assets/Images/PackagePage/crown.png";
import LikeButton from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import lock from "../../../../public/assets/Images/lock.webp";
import coverImage from "../../../../public/assets/Images/backgroundDetail.jpg";
// import coverImage from '../../../../public/assets/Images/chapterCoverImageFour.jpg'
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import AOS from "aos";
import "aos/dist/aos.css";
import LockIcon from "@mui/icons-material/Lock";
import { useParams, usePathname, useRouter } from "next/navigation";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import useApiService from "@/services/ApiService";
import Link from "next/link";
import moment from "moment";
import Head from "next/head";
import RestoreIcon from "@mui/icons-material/Restore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import benifitsImage from "../../../../public/assets/Images/keywords.png";
import benifitskey from "../../../../public/assets/Images/key.png";
import benifitAppointment from "../../../../public/assets/Images/appointment.png";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Avatar, Box, CircularProgress, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import coin from "../../../../public/assets/Images/Coins/coin.png";
import paypalIcon from "../../../../public/assets/Images/paypal.png";
import multicoin from "../../../../public/assets/Images/coin.png";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { useDispatch, useSelector } from "react-redux";
import { BOOKMARK, LIKE_NOVEL } from "@/app/Redux/slice/userSlice";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import PaginationControlled from "@/components/pagination";
import LoginBox from "@/components/LoginBox";
import Slider from "react-slick";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import nobleBanner from "../../../../public/assets/Images/noblePageBanner.jpg";
import MobilenoblePageBanner from "../../../../public/assets/Images/MobilenoblePageBanner.jpg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

function Home() {
  const {
    getUpgradeTiersData,
    updateTiersApi,
    replyOnReview,
    getChapterNovel,
    getChapter,
    likeNovel,
    disLikeReviewComment,
    likeReviewComment,
    getNovelDetailById,
    getNovelByid,
    bookmarkNovel,
    detailNovelRate,
    detailRemoveNovelRate,
    getNovelReviewsApi,
    paymentApi,
  } = useApiService();
  const router = useRouter();

  const pathname = usePathname();
  const [detailData, setDetailData] = useState();
  const [localStorageToken, setLocalStorageToken] = useState();
  const [relatedNovel, setRelatedNovel] = useState([]);
  const [saveBookmark, setSaveBookmark] = useState();
  const [commentInput, setCommentInput] = useState();
  const [novelLikeButton, setNovelLikeButton] = useState(false);
  const [ratingvalue, setRatingValue] = React.useState(0);
  const dispatch = useDispatch();
  const bookmarkData = useSelector((state) => state?.user?.bookmark);
  const likeNovelReduxData = useSelector((state) => state?.user?.likeNovelData);
  const [loadingBookmark, setLoadingBookmark] = useState(false);
  const [loadingNovelLike, setLoadingNovelLike] = useState(false);
  const [page, setPage] = useState(1);
  const [currentChapterStatus, setCurrentChapterStatus] = useState([]);
  const [ratingError, setRatingError] = useState("");
  const [reviewInputError, setReviewInputError] = useState("");
  const [chapterData, setChapterData] = useState();
  const [reviewData, setReviewData] = useState();
  const [modelLogin, setModelLogin] = useState(false);
  const handleOpenLoginModal = () => setModelLogin(true);
  const handleCloseLoginModal = () => setModelLogin(false);
  const [reviewError, setReviewError] = useState("");
  const [pageChapter, setPageChapter] = useState(1);
  const [replyComment, setReplyComment] = useState();
  const [replyCommentMode, setReplyCommentMode] = useState(false);
  const [replyCommentInput, setReplyCommentInput] = useState();
  const [replyCommentUi, setReplyCommentUi] = useState();
  const [replyCommentUiMode, setReplyCommentUiMode] = useState(false);
  const [updatTiereButton, setUpdatTiereButton] = useState(false)
  const [upgradeData, setUpgradeData] = useState([])

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    swipeToSlide: true,
    swipe: true,
    speed: 100,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: false,
          arrows: false,
        },
      },
    ],
  };

  const novelDetailData = (sort) => {
    let form;
    const novelId = pathname.slice(13);
    let userid = localStorage.getItem("user_id");
    if (localStorage.getItem("token")) {
      form = `id=${novelId}&userId=${userid}&chapterSort=${sort ? sort : "DESC"
        }`;
    } else {
      form = `id=${novelId}&chapterSort=${sort ? sort : "DESC"}`;
    }
    getNovelDetailById(form)
      .then((res) => {
        setDetailData(res?.data?.data);
        relatedNovelApi(res?.data?.data?.genre, res?.data?.data?._id);
      })
      .catch((er) => {
        // console.log(er, "Novel Detail Error");
      });
  };
  const [tab, setTab] = useState("About");

  useEffect(() => {
    novelDetailData();
    if (localStorage.getItem("isChapter")) {
      setTab("Chapter");
      localStorage.setItem("isChapter", false);
    }
  }, []);

  useEffect(() => {
    AOS.init();
    if (localStorage !== undefined && localStorage.getItem("token")) {
      setLocalStorageToken(localStorage.getItem("token"));
    }
  }, []);

  const relatedNovelApi = (Genrename, novelId) => {
    getNovelByid(Genrename)
      .then((res) => {
        if (res.status == 200) {
          const dataRelated = res?.data?.data?.data?.filter(
            (item) => item?._id !== novelId
          );
          setRelatedNovel(dataRelated);
        }
      })
      .catch((er) => {
        console.log(er, "er");
      });
  };

  const novelBookmark = (id) => {
    setLoadingBookmark(true);
    if (localStorage.getItem("token")) {
      bookmarkNovel(id)
        .then((res) => {
          if (res?.data?.data == "novel has been saved!") {
            dispatch(
              BOOKMARK([...bookmarkData, { novelId: id, notification: true }])
            );
            setLoadingBookmark(false);
          } else {
            let dataFilter = bookmarkData?.filter(
              (reduxId) => reduxId?.novelId !== id
            );
            dispatch(BOOKMARK(dataFilter));
            setLoadingBookmark(false);
          }
          toast.success(res?.data?.data);
        })
        .catch((er) => {
          console.log(er);
          setLoadingBookmark(false);
        });
    } else {
      handleOpenLoginModal();
      setLoadingBookmark(false);
    }
  };

  const handleSubmitNovelRate = () => {
    if (ratingvalue == 0) {
      setRatingError("Rating is required");
    }
    if (commentInput == undefined) {
      setReviewInputError("Comment field is required");
    }
    if (commentInput !== undefined && ratingvalue !== 0) {
      const form = new FormData();
      form.append("novelId", detailData?._id);
      form.append("newRate[rate]", ratingvalue);
      form.append("newRate[comment]", commentInput);
      detailNovelRate(form)
        .then((res) => {
          setCommentInput("");
          setRatingValue(0);
          getNovelReviews();
          setReviewError("");
          setRatingError("");
          setReviewInputError("");
        })
        .catch((er) => {
          setReviewError(er?.response?.data?.error);
          setCommentInput("");
          setRatingValue(0);
        });
    }
  };

  const deleteNovelRate = (id) => {
    detailRemoveNovelRate(id)
      .then((res) => {
        getNovelReviews();
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const tiersBuy = (data) => {
    const tierBody = {
      items: [
        {
          novelId: detailData?._id,
          tierId: data?._id,
          type: "TIER",
        },
      ],
      discountId: null,
      description: data?.tierDescription,
    };
    paymentApi(tierBody)
      .then((res) => {
        window.open(res?.data?.data?.url);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const updateTiers = (data) => {
    const tierBody = {
      items: [
        {
          novelId: detailData?._id,
          tierId: data?._id,
          type: "TIER",
        },
      ],
      description: data?.tierDescription,
    };
    updateTiersApi(tierBody).then((res) => {
      window.open(res?.data?.data?.url);
    }).catch((er) => {
      console.log(er)
    })
  }

  const upgradeTierDataApi = (data) => {
    const tierBody = {
      items: [
        {
          novelId: detailData?._id,
          tierId: data?._id,
          type: "TIER",
        },
      ],
      // description: data?.tierDescription,
    };

    getUpgradeTiersData(tierBody).then((res) => {
      setUpgradeData(res?.data?.data[0]);
      console.log(res, "res")
    }).catch((er) => {
      console.log(er)
    })
  }

  const getNovelReviews = () => {
    if (detailData?._id !== undefined) {
      let url = `page=${page}&limit=3&id=${detailData?._id}`;
      getNovelReviewsApi(url)
        .then((res) => {
          setReviewData(res?.data?.data);
        })
        .catch((er) => {
          console.log(er);
        });
    }
  };

  const [likeReview, setLikeReview] = useState();

  useEffect(() => {
    getNovelReviews();
  }, [likeReview, detailData, page]);

  const likeCommentApi = (id) => {
    if (localStorage.getItem("token")) {
      likeReviewComment(id)
        .then((res) => {
          getNovelReviews();
        })
        .catch((er) => {
          console.log(er, "Error Like Comment");
        });
    } else {
      handleOpenLoginModal();
    }
  };

  const dislikeCommentApi = (id) => {
    if (localStorage.getItem("token")) {
      disLikeReviewComment(id)
        .then((res) => {
          getNovelReviews();
        })
        .catch((er) => {
          console.log(er, "Error dislike comment");
        });
    } else {
      handleOpenLoginModal();
    }
  };

  const novelLike = (id) => {
    setLoadingNovelLike(true);
    if (localStorage.getItem("token")) {
      likeNovel(id)
        .then((res) => {
          if (res?.data?.data == "novel has been added in your like list!") {
            dispatch(LIKE_NOVEL([...likeNovelReduxData, id]));
            setLoadingNovelLike(false);
          } else {
            let data = likeNovelReduxData?.filter((novelId) => novelId !== id);
            dispatch(LIKE_NOVEL(data));
            setLoadingNovelLike(false);
          }
          novelDetailData();
          toast.success(res?.data?.data);
        })
        .catch((er) => {
          console.log(er);
        });
    } else {
      handleOpenLoginModal();
      setLoadingNovelLike(false);
    }
  };

  const [selectCoinData, setSelectCoinData] = useState();
  const [modeOpen, setModeOpen] = useState(false);
  const handleOpen = () => setModeOpen(true);
  const handleClose = () => setModeOpen(false);

  useEffect(() => {
    let currentItem = detailData !== undefined &&
      detailData?.readingStatus?.filter((item) => item?.status == "Current")

    if (currentItem?.length > 0) {
      setCurrentChapterStatus(detailData !== undefined &&
        detailData?.readingStatus?.filter((item) => item?.status == "Current"))
    } else {
      let lastChapter = detailData?.readingStatus[detailData?.readingStatus.length - 1]
      let abc = detailData?.chapter?.filter((data) => data?._id === lastChapter?.chapterId);

      if (abc && abc.length > 0) {
        const indexOfFoundItem = detailData.chapter.findIndex(chapter => chapter._id === abc[0]._id);

        console.log(detailData.chapter.length - 1, 'first')
        if (indexOfFoundItem !== -1 && indexOfFoundItem <= detailData.chapter.length - 1) {
          const nextItem = indexOfFoundItem == 0 ? detailData.chapter[indexOfFoundItem] : detailData.chapter[indexOfFoundItem - 1];
          setCurrentChapterStatus(nextItem)
          console.log(nextItem, "nextItem")
        } else {
          // There is no next item
        }
      }
    }
  }, [detailData]);

  const handleReplyChange = (e) => {
    setReplyCommentInput(e.target.value);
  };

  const commentReplyApi = (id) => {
    const form = new FormData();
    form.append("comment", replyCommentInput);
    setReplyCommentInput("");
    replyOnReview(id, form)
      .then((res) => {
        getNovelReviews();
        setReplyCommentMode(false);
      })
      .catch((er) => {
        console.log(er, "Error reply comment");
      });
  };

  return (
    <>
      <ToastContainer position="bottom-right" newestOnTop={false} stacked />

      <Modal
        open={modeOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="md:w-[550px] w-[320px] dark:bg-[#202020] dark:text-white"
        >
          <div className="flex justify-between items-center">
            <div className="text-center text-xl pb-2 font-semibold">
              Confirm
            </div>
            <div>
              <CloseIcon
                className="cursor-pointer"
                onClick={() => handleClose()}
              />
            </div>
          </div>

          <div className="rounded-md w-fit flex mx-auto my-0 px-10 bg-gray-800 dark:bg-[#131415] mt-2 dark:text-white shadow-[0_0_4px_1px_#101010]">
            <div className="text-white font-semibold border-white pb-1 pt-1 dark:text-gray-200 dark:border-gray-800">
              <div className="flex justify-center gap-3">
                <Image src={multicoin} alt="coin" className="h-24 w-24" />
                {/*    <div>{item?.coins}</div> */}
              </div>
              {updatTiereButton ?
                <div className="text-center">$ {upgradeData?.price}</div> :
                <div className="text-center">$ {selectCoinData?.price}</div>
              }
              <div className="pt-2 pb-1 text-center">
                {selectCoinData?.tierName}
              </div>
            </div>
          </div>

          <div className="pt-4"><span className="font-semibold"> Validity :</span> {upgradeData?.remainingDays} days</div>
          <div className="pt-3 font-semibold">Payment Method</div>
          <div className="flex items-center justify-between pt-2 gap-3">
            <div className="border rounded-md border-gray-300 w-full py-1 flex items-center px-2">
              <Image
                src={paypalIcon}
                height={100}
                width={100}
                className="h-5 w-5"
              />
              <div className="pl-2">PayPal</div>
            </div>
            <input type="radio" checked />
          </div>
          <div className="text-sm pt-4">
            Secure checkout experience provided by PayPal. No payment method
            information is stored on JadeScrolls.
          </div>
          <div className="flex justify-end pt-3">
            <button
              onClick={() => updatTiereButton ? updateTiers(selectCoinData) : tiersBuy(selectCoinData)}
              className="border px-8 rounded-full bg-blue-600 text-white py-1"
            >
              {updatTiereButton ? "Upgrade" : "Buy"}
            </button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={modelLogin}
        onClose={handleCloseLoginModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="md:w-[640px] w-[320px] dark:bg-[#202020] dark:text-white"
        >
          <div className="flex justify-end">
            <CloseIcon
              className="cursor-pointer"
              onClick={handleCloseLoginModal}
            />
          </div>
          <LoginBox />
        </Box>
      </Modal>

      <div className="bg-[#131415] dark:bg-[#202020]">
        <div className="pb-32 pt-16 text-gray-100">
          <div className="coverImageContainer">
            <Image
              alt=""
              src={coverImage}
              className="coverImageGradient object-cover"
            />
          </div>
          <div
            data-aos="fade-right"
            data-aos-duration="2000"
            className="flex md:flex-row flex-col absolute top-20 lg:top-44 w-full"
          >
            <div className="lg:pl-[5.25rem] md:pl-6 flex justify-center">
              <Image
                src={detailData?.coverImg}
                height={300}
                width={300}
                alt="novel image"
                className="md:h-[320px] md:w-[250px] w-[160px] h-[180px] rounded-md object-cover"
              />
            </div>

            <div className="md:pl-[5rem] pl-3 flex flex-col justify-between pb-1">
              <div>
                <div className="flex">
                  <div className="pr-2">Novel</div>
                  <div>
                    {loadingNovelLike ? (
                      <div>
                        <CircularProgress size={20} />
                      </div>
                    ) : likeNovelReduxData?.filter(
                      (data) => data == detailData?._id
                    ).length > 0 ? (
                      <FavoriteIcon
                        onClick={() => novelLike(detailData?._id)}
                        className="text-red-600 cursor-pointer"
                      />
                    ) : (
                      <FavoriteBorderIcon
                        className="cursor-pointer"
                        onClick={() => novelLike(detailData?._id)}
                      />
                    )}
                  </div>
                </div>
                <div className="md:hidden block py-3 text-2xl font-semibold">
                  {detailData?.title?.length > 80
                    ? `${detailData?.title?.slice(0, 80)}..`
                    : detailData?.title}
                </div>
                <div className="hidden md:block py-3 text-4xl font-semibold">
                  {detailData?.title}
                </div>
                <div className="flex gap-4">
                  <div className="flex">
                    <FilterVintageIcon titleAccess="genre" />
                    <div className="pl-1">{detailData?.genre}</div>
                  </div>
                  <div className="flex">
                    <FormatListBulletedIcon titleAccess="chapters" />
                    <span>
                      {detailData?.chapter?.length > 0 &&
                        detailData?.chapter?.length}
                    </span>
                    <div className="pl-1">Chapters</div>
                  </div>
                  <div className="flex">
                    {detailData?.novelStatus == "OnGoing" ? (
                      <PublishedWithChangesIcon titleAccess="novel status" />
                    ) : (
                      <RestoreIcon titleAccess="novel status" />
                    )}
                    <div className="pl-1">{detailData?.novelStatus}</div>
                  </div>
                </div>
                <div className="py-3 flex justify-between">
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <RemoveRedEyeOutlinedIcon titleAccess="view" />
                      <span className="pl-1">{(detailData?.views?.length + 100 * 100)}</span>
                    </div>
                    <div className="flex items-center">
                      <ThumbUpOffAltIcon titleAccess="like" />
                      <span className="pl-1">{detailData?.likes?.length}</span>
                    </div>
                    {loadingBookmark ? (
                      <div>
                        <CircularProgress size={20} />
                      </div>
                    ) : bookmarkData.filter(
                      (data) => data?.novelId == detailData?._id
                    ).length > 0 ? (
                      <BookmarkAddedIcon
                        onClick={() => {
                          novelBookmark(detailData?._id);
                        }}
                        titleAccess="Remove bookmark"
                        className="text-blue-500 cursor-pointer text-2xl"
                      />
                    ) : (
                      <BookmarkAddIcon
                        onClick={() => novelBookmark(detailData?._id)}
                        titleAccess="save bookmark"
                        className="text-white cursor-pointer text-2xl"
                      />
                    )}
                    <div className="flex">
                      <MilitaryTechIcon titleAccess={pathname?.slice(8, 12) === 'view' ? 'Rank by view' : (pathname?.slice(8, 12) === 'coin' ? 'Rank by coin' : 'Rank by bookmark')} />

                      <span className="pl-1">{pathname?.slice(8, 12) == 'view' ? detailData?.novelRank : pathname?.slice(8, 12) == 'coin' ? detailData?.coinRank : detailData?.bookmarkRank}</span>
                    </div>
                  </div>
                </div>
                <div
                  className="flex gap-2 items-center w-max cursor-pointer"
                  onClick={() =>
                    router.push(`/authorProfile/${detailData?.authorId?._id}`)
                  }
                >
                  <div>Author :</div>
                  {detailData?.authorId?.role?.name === "admin" ? (
                    <div className="pl-1">
                      {detailData?.OriginalNovelAuthor
                        ? detailData?.OriginalNovelAuthor
                        : detailData?.authorId?.name}
                    </div>
                  ) : (
                    <div className="pl-1">
                      {detailData?.authorId?.pseudonym !== null &&
                        detailData?.authorId?.pseudonym !== "null"
                        ? detailData?.authorId?.pseudonym
                        : detailData?.authorId?.name
                          ? detailData?.authorId?.name
                          : " - - -"}
                    </div>
                  )}
                </div>
                {detailData?.TranslateNovelAuthor && (
                  <div className="flex gap-2 items-center">
                    <div>Translator :</div>
                    <div className="pl-1">
                      {detailData?.TranslateNovelAuthor
                        ? detailData?.TranslateNovelAuthor
                        : " - - -"}
                    </div>
                  </div>
                )}
                <div className="py-3 flex items-center">
                  {/* <Rating size='small' name="read-only" value={detailData?.totalRaters !== null && detailData?.totalRaters} readOnly /> */}
                  <div className="flex">
                    <Rating
                      icon={
                        <StarIcon
                          fontSize="small"
                          style={{ color: "#FFAD01" }}
                        />
                      }
                      emptyIcon={
                        <StarBorderIcon
                          fontSize="small"
                          style={{ color: "#cccccc" }}
                        />
                      }
                      value={
                        detailData?.totalRating > 0 && detailData?.totalRating
                      }
                      readOnly
                      className="flex"
                    />
                    {detailData?.totalRating > 0 && (
                      <div className="text-xs pl-1 pt-1">{`(${detailData?.totalRating})`}</div>
                    )}
                  </div>
                </div>
              </div>

              {detailData?.chapter?.length > 0 &&
                (detailData?.readingStatus?.length > 0 ? (
                  <div
                    onClick={() =>
                      Array.isArray(currentChapterStatus) ?
                        router.push(
                          `/chapter/${currentChapterStatus[0]?.chapterId}`
                        )
                        :
                        router.push(
                          `/chapter/${currentChapterStatus?._id}`
                        )
                    }
                  >
                    <button className="border px-14 py-2 slideBtn sliderRight">
                      CONTINUE READING
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() =>
                      router.push(`/chapter/${detailData?.chapter[0]?._id}`)
                    }
                  >
                    <button className="border px-14 py-2 slideBtn sliderRight">
                      START READING
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="bg-white lg:mx-20 md:mx-10 mx-6 relative md:-top-44 -top-36 md:p-4 p-2 dark:bg-[#131415]">
          <div className="flex text-2xl gap-x-9 md:gap-x-20 border-gray-300 border-b">
            <div
              id="About"
              onClick={() => setTab("About")}
              className={`hover:border-b-2 hover:border-[#20A7FE] ${tab === "About"
                ? "cursor-pointer border-b-2 border-[#20A7FE] font-semibold"
                : "cursor-pointer"
                }`}
            >
              About
            </div>
            <div
              id="Chapter"
              onClick={() => setTab("Chapter")}
              className={`hover:border-b-2 hover:border-[#20A7FE] ${tab === "Chapter"
                ? "cursor-pointer border-b-2 border-[#20A7FE] font-semibold"
                : "cursor-pointer"
                }`}
            >
              Chapters
            </div>
            <div
              id="Tier"
              onClick={() => setTab("Tier")}
              className={`hover:border-b-2 hover:border-[#20A7FE] ${tab === "Tier"
                ? "cursor-pointer border-b-2 border-[#20A7FE] font-semibold"
                : "cursor-pointer"
                }`}
            >
              Noble
            </div>
          </div>

          {tab == "About" ? (
            <>
              <div className="flex pt-4 pb-8">
                <div>
                  <div className="flex items-center">
                    <ImportContactsIcon fontSize="small" />
                    <div className="text-gray-500 dark:text-gray-200 pl-1 font-semibold">
                      Chapters
                    </div>
                  </div>
                  <div className="pt-[2px] pl-6">
                    {detailData?.chapter?.length > 0
                      ? detailData?.chapter?.length
                      : "0"}{" "}
                    Chapters
                  </div>
                </div>
                <div className="lg:pl-32 pl-10">
                  <div className="flex">
                    <VerifiedUserOutlinedIcon />
                    <div className="text-gray-500 dark:text-gray-200 pl-1 font-semibold">
                      Licensed From
                    </div>
                  </div>
                  <div className="pl-7 pt-[2px]">
                    {detailData?.licenceFrom == null ||
                      detailData?.licenceFrom == "null"
                      ? "----"
                      : detailData?.licenceFrom}
                  </div>
                </div>
              </div>

              <div>
                {/* <div className="pb-2 text-lg">Genre</div> */}
                <div className="flex flex-wrap gap-3 text-sm">
                  {detailData?.subGenre?.map((item, index) => {
                    return (
                      <div key={index} className="border px-2 rounded-md py-[2px]">#{item}</div>
                    )
                  })}
                </div>
              </div>

              <div className="pt-4 mt-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] pb-4 bg-[#FFFFFF] dark:bg-[#202020]">
                <div className="text-2xl text-center lg:rankingParentHeading dark:text-gray-200">
                  Details
                </div>
                <div className="leading-7 px-4 md:px-8">
                  <div
                    className="text-gray-500 dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: detailData?.synopsis }}
                  ></div>
                </div>
              </div>

              <div className="pt-6 pl-2 pb-4 border-t-2 mt-8">
                <div className="text-2xl pb-1">
                  {reviewData?.totalDocs} Reviews
                </div>
                <div className="p-4 rounded-md bg-[#FFFFFF] dark:bg-[#202020] shadow-[2px_3px_5px_3px_#F2F2F2] dark:shadow-md">
                  <>
                    <div className="flex justify-center flex-col items-center">
                      <div className="text-lg font-semibold pb-2 text-center">
                        Enjoy reading {detailData?.title}?
                      </div>
                      <div className="text-xs md:text-sm pb-1 dark:text-gray-200 text-gray-600 pt-1">
                        Write a review
                      </div>
                    </div>
                    <div className="flex justify-center pb-2">
                      <Rating
                        icon={
                          <StarIcon
                            fontSize="small"
                            style={{ color: "#FFAD01" }}
                          />
                        }
                        emptyIcon={
                          <StarBorderIcon
                            fontSize="small"
                            style={{ color: "#cccccc" }}
                          />
                        }
                        defaultValue={0}
                        value={ratingvalue}
                        onChange={(event, newValue) => {
                          setRatingValue(newValue);
                        }}
                      />
                    </div>
                    {ratingError && (
                      <div className="text-center pb-2 text-red-500">
                        {ratingError}
                      </div>
                    )}
                    <div className="">
                      <textarea
                        onChange={(e) => setCommentInput(e.target.value)}
                        value={commentInput}
                        placeholder="Write a review*"
                        className="dark:bg-[#202020] bg-gray-100 dark:text-gray-200 mr-2 border dark:border-gray-600 w-full focus:outline-none rounded-md px-2 py-2"
                      />
                      {reviewError && (
                        <div className="pl-1 text-red-500 text-sm font-semibold">
                          {reviewError}
                        </div>
                      )}
                      {reviewInputError && (
                        <div className="pl-1 text-red-500 text-sm font-semibold">
                          {reviewInputError}
                        </div>
                      )}
                      <div className="flex justify-end">
                        <div
                          onClick={() => {
                            localStorageToken
                              ? handleSubmitNovelRate()
                              : setModelLogin(true);
                          }}
                          className="px-6 border dark:border-gray-500 rounded-full py-1 text-lg bg-blue-600 text-white cursor-pointer"
                        >
                          Send
                        </div>
                      </div>
                    </div>
                  </>
                  {reviewData?.data?.length > 0 && (
                    <div className="">
                      {reviewData?.data?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="my-3 flex w-full rounded-md p-3 bg-gray-300 text-gray-800 dark:bg-[#202020] dark:text-gray-200"
                            style={{ boxShadow: "0px 0px 3px 0px #e5d5d5" }}
                          >
                            <div className="flex flex-col w-full">
                              <div className="flex">
                                <div>
                                  {item?.userId?.profileImg == null ? (
                                    <Avatar className="h-14 w-14" />
                                  ) : (
                                    <Image
                                      alt=""
                                      src={item?.userId?.profileImg}
                                      height={300}
                                      width={300}
                                      className="md:h-16 md:w-16 w-16 h-16 object-cover rounded-full"
                                    />
                                  )}
                                </div>
                                <div className="md:pl-4 pl-2 w-full">
                                  <span className="flex justify-between">
                                    <div>
                                      <div className="text-lg font-semibold capitalize">
                                        {item?.userId?.name
                                          ? item?.userId?.name
                                          : "- - -"}
                                      </div>
                                      <div className="text-sm">
                                        {moment(item?.timeStamp).format(
                                          "DD MMM, YYYY"
                                        )}
                                      </div>
                                      <div className="flex pt-[6px] pb-1">
                                        <Rating
                                          icon={
                                            <StarIcon
                                              fontSize="small"
                                              style={{ color: "#FFAD01" }}
                                            />
                                          }
                                          emptyIcon={
                                            <StarBorderIcon
                                              fontSize="small"
                                              style={{ color: "#6d6e70" }}
                                            />
                                          }
                                          value={item?.rate}
                                          readOnly
                                          className="flex"
                                        />
                                        {item?.rate > 0 && (
                                          <div className="text-xs pl-1 pt-1">{`(${item?.rate})`}</div>
                                        )}
                                      </div>
                                    </div>

                                    {item?.userId?._id ==
                                      localStorage.getItem("user_id") && (
                                        <div
                                          className="md:hidden flex items-end text-red-500 cursor-pointer"
                                          onClick={() =>
                                            deleteNovelRate(item?._id)
                                          }
                                        >
                                          <DeleteIcon />
                                        </div>
                                      )}
                                  </span>

                                  <div className="text-base break-all">
                                    {item?.comment}
                                  </div>
                                  <div className="flex flex-col md:gap-4 gap-1 md:pt-3 pt-1 text-sm">
                                    <div className="flex items-center gap-x-1">
                                      {item?.like?.filter(
                                        (data) =>
                                          data ==
                                          localStorage.getItem("user_id")
                                      ).length > 0 ? (
                                        <div
                                          onClick={() =>
                                            likeCommentApi(item?._id)
                                          }
                                          className="flex "
                                        >
                                          <ThumbUpAltIcon
                                            className="cursor-pointer"
                                            fontSize="small"
                                          />
                                          {item?.like?.length > 0 &&
                                            item?.like?.length}
                                        </div>
                                      ) : (
                                        <div
                                          onClick={() =>
                                            likeCommentApi(item?._id)
                                          }
                                          className="flex"
                                        >
                                          <LikeButton
                                            className="cursor-pointer"
                                            fontSize="small"
                                          />
                                          {item?.like?.length > 0 &&
                                            item?.like?.length}
                                        </div>
                                      )}

                                      {item?.dislike?.filter(
                                        (data) =>
                                          data ==
                                          localStorage.getItem("user_id")
                                      ).length > 0 ? (
                                        <div
                                          onClick={() =>
                                            dislikeCommentApi(item?._id)
                                          }
                                        >
                                          <ThumbDownAltIcon
                                            className="cursor-pointer"
                                            fontSize="small"
                                          />
                                          {item?.dislike?.length > 0 &&
                                            item?.dislike?.length}
                                        </div>
                                      ) : (
                                        <div
                                          onClick={() =>
                                            dislikeCommentApi(item?._id)
                                          }
                                        >
                                          <ThumbDownOffAltIcon
                                            className="cursor-pointer"
                                            fontSize="small"
                                          />
                                          {item?.dislike?.length > 0 &&
                                            item?.dislike?.length}
                                        </div>
                                      )}
                                      <button
                                        className="pr-3 md:pl-2 text-sm font-semibold"
                                        onClick={() => {
                                          setReplyComment(item?._id);
                                          setReplyCommentMode(
                                            !replyCommentMode
                                          );
                                        }}
                                      >
                                        Reply
                                      </button>
                                    </div>
                                    {item?.reply.length > 0 && (
                                      <div
                                        className="pt-1 text-sm text-[#20A7FE] cursor-pointer"
                                        onClick={() => {
                                          setReplyCommentUi(item?._id);
                                          setReplyCommentUiMode(
                                            !replyCommentUiMode
                                          );
                                        }}
                                      >
                                        <span>
                                          view {item?.reply.length} more reply
                                        </span>
                                        {replyCommentUi == item?._id &&
                                          replyCommentUiMode ? (
                                          <span>
                                            <KeyboardArrowUpIcon fontSize="small" />
                                          </span>
                                        ) : (
                                          <span>
                                            <KeyboardArrowDownIcon fontSize="small" />
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="pt-2">
                                {replyComment == item?._id &&
                                  replyCommentMode && (
                                    <div className="flex items-center pl-6">
                                      <textarea
                                        onChange={handleReplyChange}
                                        maxLength="1000"
                                        value={replyCommentInput}
                                        placeholder="Reply"
                                        className="dark:bg-[#202020] bg-gray-100 mr-2 border w-full focus:outline-none rounded-md px-2 py-2"
                                      />
                                      <div>
                                        <div
                                          onClick={() =>
                                            commentReplyApi(item?._id)
                                          }
                                          className="border rounded-full md:px-4 px-2 py-2 md:text-sm text-xs bg-blue-600 text-white cursor-pointer"
                                        >
                                          Send
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                <div>
                                  <span>
                                    {replyCommentUiMode &&
                                      item?.reply?.map((item, index) => {
                                        return (
                                          <div
                                            key={index}
                                            className="ml-10 my-3 flex rounded-md p-3 dark:bg-[#202020] dark:text-gray-200 text-gray-800"
                                          >
                                            <div>
                                              {item?.userId?.profileImg ===
                                                null ? (
                                                <Avatar className="md:h-[5rem] md:w-16 w-16 h-16" />
                                              ) : (
                                                <Image
                                                  alt=""
                                                  height={100}
                                                  width={100}
                                                  src={item?.userId?.profileImg}
                                                  className="md:h-[4.3rem] md:w-[4.3rem] w-24 h-16 object-cover rounded-full"
                                                />
                                              )}
                                            </div>

                                            <div className="md:pl-4 pl-2 w-full">
                                              <div className="flex justify-between items-center">
                                                <div className="flex pl-1 md:pl-0 pb-1 md:pb-0 md:items-center flex-col md:flex-row">
                                                  <div className="text-lg font-semibold capitalize">
                                                    {item?.userId?.name}
                                                  </div>
                                                  <div className="md:pl-3 md:text-sm text-xs">
                                                    {moment(
                                                      item?.createdAt
                                                    ).format("DD MMM YYYY")}
                                                  </div>
                                                </div>
                                                {item?.userId?._id ==
                                                  localStorage.getItem(
                                                    "user_id"
                                                  ) && (
                                                    <div
                                                      className="flex items-end text-red-500 cursor-pointer"
                                                      onClick={() =>
                                                        deleteNovelRate(item?._id)
                                                      }
                                                    >
                                                      <DeleteIcon />
                                                    </div>
                                                  )}
                                              </div>
                                              <div className="bg-gray-100 dark:bg-[#131415] rounded-md text-sm py-2 px-3 break-all">
                                                {item?.comment}
                                              </div>
                                              <div className="flex items-center gap-x-1 pt-1">
                                                {item?.like?.filter(
                                                  (data) =>
                                                    data ==
                                                    localStorage.getItem(
                                                      "user_id"
                                                    )
                                                ).length > 0 ? (
                                                  <div
                                                    onClick={() =>
                                                      likeCommentApi(item?._id)
                                                    }
                                                    className="flex items-center"
                                                  >
                                                    <ThumbUpAltIcon
                                                      className="cursor-pointer"
                                                      fontSize="small"
                                                    />
                                                    {item?.like?.length > 0 &&
                                                      item?.like?.length}
                                                  </div>
                                                ) : (
                                                  <div
                                                    onClick={() =>
                                                      likeCommentApi(item?._id)
                                                    }
                                                    className="flex"
                                                  >
                                                    <LikeButton
                                                      className="cursor-pointer"
                                                      fontSize="small"
                                                    />
                                                    {item?.like?.length > 0 &&
                                                      item?.like?.length}
                                                  </div>
                                                )}

                                                {item?.dislike?.filter(
                                                  (data) =>
                                                    data ==
                                                    localStorage.getItem(
                                                      "user_id"
                                                    )
                                                ).length > 0 ? (
                                                  <div
                                                    onClick={() =>
                                                      dislikeCommentApi(
                                                        item?._id
                                                      )
                                                    }
                                                  >
                                                    <ThumbDownAltIcon
                                                      className="cursor-pointer"
                                                      fontSize="small"
                                                    />
                                                    {item?.dislike?.length >
                                                      0 &&
                                                      item?.dislike?.length}
                                                  </div>
                                                ) : (
                                                  <div
                                                    onClick={() =>
                                                      dislikeCommentApi(
                                                        item?._id
                                                      )
                                                    }
                                                  >
                                                    <ThumbDownOffAltIcon
                                                      className="cursor-pointer"
                                                      fontSize="small"
                                                    />
                                                    {item?.dislike?.length >
                                                      0 &&
                                                      item?.dislike?.length}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {item?.userId?._id ==
                              localStorage.getItem("user_id") && (
                                <div
                                  className="hidden md:flex items-end text-red-500 cursor-pointer"
                                  onClick={() => deleteNovelRate(item?._id)}
                                >
                                  Delete
                                </div>
                              )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {reviewData?.data?.length > 0 && (
                  <div className="flex justify-center">
                    <PaginationControlled
                      setPage={setPage}
                      last_page={reviewData?.totalPage}
                      page={page}
                    />
                  </div>
                )}
              </div>

              {relatedNovel.length > 0 && (
                <div className="pt-4 pb-3 border-t border-gray-300">
                  <div className="text-2xl pb-3">Related Novels</div>
                  {/* <div className='grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4'> */}
                  <Slider {...settings} className="w-full">
                    {relatedNovel?.map((item, index) => {
                      return (
                        <Link
                          href={{ pathname: `/detail/view/${item?._id}` }}
                          key={index}
                          className=""
                        >
                          <div className="h-44 w-[8.5rem] md:h-40 md:w-40 lg:h-60 lg:w-44">
                            <Image
                              height={300}
                              width={300}
                              src={item?.coverImg}
                              alt=""
                              className="h-full w-full rounded-md object-cover"
                            />
                          </div>
                          <div className="pl-1">
                            <div className="text-sm md:text-base font-semibold hidden md:block">
                              {item.title}
                            </div>
                            {/* <div className='text-sm md:text-base font-semibold block md:hidden'>{item.name.slice(0, 9)}..</div> */}
                            <div className="text-xs py-1 md:py-2 dark:text-gray-200 text-gray-600">
                              {item.genre}
                            </div>
                            {/* <Rating size='small' name="read-only" value={item?.totalRating} readOnly /> */}
                            <div className="flex">
                              <Rating
                                icon={
                                  <StarIcon
                                    fontSize="small"
                                    style={{ color: "#FFAD01" }}
                                  />
                                }
                                emptyIcon={
                                  <StarBorderIcon
                                    fontSize="small"
                                    style={{ color: "#cccccc" }}
                                  />
                                }
                                value={item?.totalRating}
                                readOnly
                                className="flex"
                              />
                              {item?.totalRating > 0 && (
                                <div className="text-xs pl-1 pt-1">{`(${item?.totalRating})`}</div>
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </Slider>
                  {/* </div> */}
                </div>
              )}
            </>
          ) : tab == "Chapter" ? (
            detailData?.chapter?.length == 0 ? (
              <div className="text-center pt-7 pb-3">
                Chapter's will coming soon !
              </div>
            ) : (
              <>
                <div className="flex flex-col  pt-2 pb-1">
                  <div className="flex justify-between">
                    <div className="text-gray-500 dark:text-white">
                      Latest Chapter -{" "}
                    </div>
                    <div>
                      <select
                        onChange={(e) => novelDetailData(e.target.value)}
                        className="px-2 py-1 border border-black dark:bg-[#202020] bg-gray-200 focus:outline-none rounded-md"
                      >
                        <option value="DESC">Newest</option>
                        <option value="ASC">Oldest</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-gray-800  dark:text-white font-semibold hidden md:block">
                      {detailData?.latestChapter?.title &&
                        detailData?.latestChapter?.title}
                    </div>
                    <div className="text-gray-800  dark:text-white font-semibold block md:hidden">
                      {detailData?.latestChapter?.title &&
                        detailData?.latestChapter?.title?.length > 20
                        ? `${detailData?.latestChapter?.title?.slice(0, 20)}..`
                        : detailData?.latestChapter?.title}
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 pt-4">
                  {detailData?.chapter?.map((item, index) => {
                    let chapterStatus = detailData?.readingStatus?.filter(
                      (data) => data?.chapterId == item?._id
                    );
                    return (
                      <Link
                        href={`/chapter/${item?._id}`}
                        key={index}
                        className={`bg-gray-200 shadow-lg cursor-pointer text-gray-600 p-2 rounded-lg flex items-center ${detailData?.chapter?.length > 0 &&
                          chapterStatus[0]?.status == "Completed"
                          ? "bg-green-200 dark:bg-green-300"
                          : "bg-gray-200 dark:bg-[#202020] dark:text-white"
                          }`}
                      >
                        <div
                          className={`bg-gray-400 dark:bg-[#131415] px-3 py-1 rounded-md mr-3 h-max' ${detailData?.chapter?.length > 0 &&
                            chapterStatus[0]?.status == "Completed"
                            ? "bg-green-300 dark:bg-green-400"
                            : "bg-gray-200 dark:bg-[#131415] dark:text-white"
                            }`}
                        >
                          {item?.chapterNo}
                        </div>
                        <div className="flex justify-between w-full">
                          <div>
                            <div className="capitalize">
                              {item?.title.length > 25
                                ? `${item?.title.slice(0, 25)}...`
                                : item?.title}
                            </div>
                            <div className="text-xs pt-1">
                              {moment(item?.releaseDate).format("DD MMM, YYYY")}
                            </div>
                          </div>
                          {!item?.isPurchased && (
                            <div className="flex items-center">
                              <Image src={lock} className="h-8 w-8" />
                            </div>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </>
            )
          ) : (
            tab == "Tier" && (
              <div>
                {detailData?.subscription?.length == 0 ? (
                  <div className="text-center pt-7 pb-3">
                    No Noble Available !
                  </div>
                ) : (
                  <div className="pb-10 pt-1 mt-2">
                    <div className="hidden md:block">
                      <Image
                        src={nobleBanner}
                        className="w-full h-full"
                        height={500}
                        width={500}
                        alt=""
                      />
                    </div>
                    <div className="block md:hidden">
                      <Image
                        src={MobilenoblePageBanner}
                        className="w-full h-full"
                        height={500}
                        width={500}
                        alt=""
                      />
                    </div>

                    {detailData?.subscription.length > 0 &&
                      detailData?.subscription[0] !== "" && (
                        <div
                          id="premiumPlan"
                          className="dark:bg-[#121212] px-5 lg:px-20 text-white pb-12 pt-10 mt-6"
                        >
                          <div className="text-center text-3xl pb-6 text-black dark:text-white">
                            All Premium Plans
                          </div>
                          <div className="grid md:grid-cols-3 gap-8">
                            {detailData?.subscription.map((item, i) => {
                              const purchaseTier =
                                detailData?.isPurchasedTier?.find(
                                  (data) => data?.tierId == item?._id
                                );

                              let previousTierTime = detailData && detailData?.isPurchasedTier && detailData?.isPurchasedTier[detailData?.isPurchasedTier?.length - 1]

                              let endDateTier = moment(previousTierTime?.endDate).format('YYYY-MM-DD')

                              function dateDiffInDays(date1, date2) {
                                const a = moment(date1);
                                const b = moment(date2);
                                return b.diff(a, 'days');
                              }

                              // Example usage:
                              const date1 = new Date();
                              const date2 = previousTierTime?.endDate;
                              const diffInDays = dateDiffInDays(date1, date2);

                              // let nextItems = [];

                              // if (detailData && detailData?.isPurchasedTier) {
                              //   for (const purchasedTier of detailData?.isPurchasedTier) {
                              //     const purchasedTierIndex = detailData?.subscription.findIndex(item => item._id === purchasedTier.tierId);

                              //     if (purchasedTierIndex !== -1 && purchasedTierIndex < detailData?.subscription.length - 1) {
                              //       const itemsAfterPurchasedTier = detailData?.subscription.slice(0, purchasedTierIndex + 1);

                              //       nextItems = nextItems.concat(itemsAfterPurchasedTier);
                              //     } else {
                              //       // console.log(`Purchased tier with ID ${purchasedTier.tierId}.`);
                              //     }
                              //   }
                              // }
                              // let updateDataItem = nextItems?.find((updateData) => updateData?._id == item?._id)

                              return (
                                <div
                                  key={i}
                                  className="bg-[#242424] border p-4 rounded-md flex flex-col justify-between"
                                >
                                  <div>
                                    <div className="border-b border-gray-400 pb-6">
                                      <div className="flex">
                                        <Image
                                          src={premiumIcon}
                                          alt=""
                                          className="w-5 h-5"
                                        />
                                        <div className="pl-2">
                                          {item?.tierNo}
                                        </div>
                                      </div>
                                      {/* <div className={`text-2xl font-semibold py-2 ${i == 0 ? 'text-[#CFF56A]' : i == 1 ? 'text-[#FFD2D7]' : i == 2 ? 'text-[#C4B1D4]' : 'text-[#FFC862]'}`}>{item?.tierName}</div> */}
                                      <div className="text-2xl font-semibold py-2 text-blue-500">
                                        {item?.tierName}
                                      </div>
                                      <div>
                                        All Free Chapter +{" "}
                                        {item?.toChapter - item?.fromChapter}{" "}
                                        Advance
                                      </div>
                                      <div className="py-1">
                                        Validity: {item?.purchaseValidityInDays} days
                                      </div>

                                      {previousTierTime?.tierId === item?._id &&
                                        <div className="pt-1 pb-2">
                                          Expiry Date: {moment(previousTierTime?.endDate).format('DD-MM-YYYY')}
                                        </div>}
                                      <div className="">
                                        Chapters: {item?.fromChapter} to{" "}
                                        {item?.toChapter}
                                      </div>
                                    </div>
                                    <div className="pt-6">
                                      {item?.tierDescription}
                                    </div>
                                  </div>
                                  {purchaseTier?.tierId == item?._id ? (
                                    <button
                                      disabled
                                      className={`w-full rounded-full py-3 mt-7 text-black bg-yellow-500`}
                                    >
                                      Purchased
                                    </button>
                                  ) : (
                                    <div className="">
                                      {diffInDays < 15 ?
                                        <button
                                          onClick={() => {
                                            if (!localStorageToken) {
                                              setModelLogin(true);
                                            } else {
                                              setSelectCoinData(item);
                                              handleOpen();
                                            }
                                          }}
                                          className="w-full rounded-full py-3 mt-7 font-semibold bg-blue-500 text-white"
                                        >
                                          Buy Now ${item?.price}
                                        </button> :
                                        <button
                                          onClick={() => {
                                            if (!localStorageToken) {
                                              setModelLogin(true);
                                            } else {
                                              upgradeTierDataApi(item)
                                              setSelectCoinData(item);
                                              handleOpen();
                                              setUpdatTiereButton(true)
                                            }
                                          }}
                                          className="w-full rounded-full py-3 mt-4 font-semibold bg-blue-500 text-white"
                                        >
                                          Upgrade
                                        </button>
                                      }
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
