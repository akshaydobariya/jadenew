"use client";
import useApiService from "@/services/ApiService";
import { Box, Modal } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
};

function Annoucment() {
  const { getGeneralAnnoucment } = useApiService();
  const [annoucmentData, setAnnoucmentData] = useState([]);

  useEffect(() => {
    getGeneralAnnoucment()
      .then((res) => {
        setAnnoucmentData(res?.data?.data?.data);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [announcmentTab, setAnnouncmentTab] = useState("All");
  const [annoucmentFullData, setAnnoucmentFullData] = useState("");

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=""
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <div className="relative block">
          <Box
            sx={style}
            className="md:w-[550px] w-[350px] h-[350px] relative rounded-[10px]"
          >
            <div className="text-xl font-semibold border-b-[1px] border-b-[#a6a6a6] pt-2 lg:pt-3 pb-2 px-4 sticky top-0 bg-gray-100 rounded-t-[10px] flex justify-between">
              <div>Announcement</div>
              <div className="cursor-pointer font-bold rounded-full text-[16px]" onClick={()=>{
                handleClose();
              }}>X</div>
            </div>
            {/* <hr className='mt-4' /> */}
            <div className="p-4 overflow-auto h-[300px] announcement-scroll">
              {annoucmentFullData}
            </div>
          </Box>
        </div>
      </Modal>

      {/* {annoucmentData.length > 0 && */}
      <div className="px-4">
        {annoucmentData.length > 0 && (
          <div className="text-xl font-semibold pt-3 pb-2">Imperial Edict</div>
        )}
        <Swiper
          slidesPerView={1}
          spaceBetween={15}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          effect={"coverflow"}
          id="announcement"
          modules={[FreeMode, Pagination]}
          className="mySwiper"
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {annoucmentData.length > 0 &&
            annoucmentData?.map((item, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className="min-h-[135px]  my-3  py-4 lg:py-6 px-6 bg-gray-100 dark:bg-[#202020] dark:text-white shadow-md hover:border hover:border-gray-400 cursor-pointer hover:shadow-md rounded-[1.75rem] gap-10"
                >
                  <div className="font-semibold">{item?.title}</div>
                  <div className="text-gray-700 dark:text-white text-sm">
                    {item?.content?.length > 100
                      ? item?.content?.slice(0, 100)
                      : item?.content}{" "}
                    {item?.content?.length > 100 && (
                      <span
                        className="cursor-pointer text-blue-500"
                        onClick={() => {
                          handleOpen();
                          setAnnoucmentFullData(item.content);
                        }}
                      >
                        ... more
                      </span>
                    )}
                  </div>
                  <div className="text-end text-sm pt-1">
                    {moment(item?.createdAt).format("DD MMM, YYYY")}
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
      {/* } */}
    </div>
  );
}

export default Annoucment;
