import { FaBed, FaCheck, FaChild, FaEye, FaPeopleArrows } from "react-icons/fa";
import { GiResize } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { BeatSpinner } from "../components/spinner";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import {
  useDeleteWishlistByIdMutation,
  useGetWishlistQuery,
  usePostWishlistMutation,
} from "../api/private-api";
import toastSuccess from "../utils/toast-success";
import toastError from "../utils/toast-error";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaRegMoneyBillAlt } from "react-icons/fa";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useConfirm, useWarning } from "../hooks";
import { setReserve } from "../redux/reserve-slice";
import { Button, Image } from "@mantine/core";
import { ReactNode } from "react";
import { formatPriceUsdt } from "../utils/common";

interface Room {
  room: any;
  isMine?: boolean;
  extra?: ReactNode;
}

const CardRoom: React.FC<Room> = ({ room, isMine }) => {
  const navigate = useNavigate();
  const hotelFilter = useAppSelector((state) => state.hotelFilter);
  const user = useAppSelector((state) => state.auth.user);
  const reserve = useAppSelector((state) => state.reserve);
  const dispatch = useAppDispatch();

  const { data: wishlist } = useGetWishlistQuery(undefined);
  const [postWishlist, { isLoading: postWishLoading }] =
    usePostWishlistMutation();
  const [deleteWishlistById, { isLoading: delWishLoading }] =
    useDeleteWishlistByIdMutation();

  const handleWishlist = (_id: any) => {
    postWishlist({ roomId: _id })
      .unwrap()
      .then((data) => {
        toastSuccess(data.message);
      })
      .catch(({ data }) => {
        const error = { message: data?.message };
        toastError(error);
      });
  };

  const handleDeleteWishlist = (_id: any) => {
    deleteWishlistById(_id)
      .unwrap()
      .then((data) => {
        toastSuccess(data.message);
      })
      .catch(({ data }) => {
        const error = { message: data?.message };
        toastError(error);
      });
  };

  const handleReserve = async () => {
    if (!hotelFilter.checkIn || !hotelFilter.checkOut) {
      return useWarning({
        title: "Please select checkIn and checkOut!",
      });
    }

    const isSameHotel = reserve.some((resv) => resv.hotelId !== room.hotelId);

    if (isSameHotel) return alert("must room will be a hotel");

    dispatch(
      setReserve({
        email: user.email,
        phoneNumber: user.phone,
        roomId: room._id,
        hotelId: room.hotelId,
        checkIn: hotelFilter.checkIn,
        checkOut: hotelFilter.checkOut,
        adult: hotelFilter.adult,
        children: hotelFilter.children,
      })
    );
    const isConfirm = await useConfirm({
      config: { icon: "success", buttons: ["Add more", "Pay now"] },
      title: "To proceed with your reservation please pay now.",
    });

    if (isConfirm) {
      navigate(`/payment`);
    }
  };

  return (
    <div className="max-w-[400px]">
      <div className="relative overflow-hidden bg-white border w-80 lg:w-full border-secondary-200 rounded-lg shadow dark:bg-secondary-800 dark:border-secondary-800">
        <Swiper
          pagination={{
            dynamicBullets: true,
            clickable: true,
            renderCustom: function (index, className) {
              return '<span class="' + className + '">' + index + "</span>";
            },
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {room.thumbnails.map((i: string, idx: number) => (
            <SwiperSlide key={`${i}-${idx}`}>
              <Image
                radius="md"
                src={i}
                className="aspect-video !rounded-b-none"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="p-4">
          <h5 className="my-2 h-12">{room.title}</h5>

          <div className="py-1 ">
            <strong>Facilities:</strong>{" "}
            {room.facilities.filter((i: string) => !!i)?.join(", ")}
          </div>
          <div className="mb-3">
            <ul>
              <li className="flex gap-2 items-center h-8">
                <FaRegMoneyBillAlt />

                {room?.roomInfo.discountedPrice ? (
                  <>
                    <span className="line-through">
                      {formatPriceUsdt(room?.roomInfo.regularPrice)}
                    </span>
                    <span className="text-red-500">
                      {formatPriceUsdt(room?.roomInfo.discountedPrice)}
                    </span>
                  </>
                ) : (
                  formatPriceUsdt(room?.roomInfo.regularPrice)
                )}
              </li>
              {!!room?.roomInfo.roomSize && (
                <li className="flex gap-2 items-center h-8">
                  <GiResize />
                  {room?.roomInfo.roomSize}m²
                </li>
              )}
              {room?.roomInfo.bedType && (
                <li className="flex gap-2 h-8 items-center">
                  <FaBed />
                  {room?.roomInfo.bedType}
                </li>
              )}

              {!!room.capacity.adult && (
                <li className="flex gap-2 items-center h-8">
                  <FaPeopleArrows /> <span>Adult: {room.capacity.adult}</span>
                </li>
              )}
              {!!room.capacity.children && (
                <li className="flex gap-2 items-center h-8">
                  <FaChild />
                  <span>Child: {room.capacity.children}</span>
                </li>
              )}
              {room?.roomInfo.view && (
                <li className="flex gap-2 items-center h-8">
                  <FaEye />
                  {room?.roomInfo.view}
                </li>
              )}
              {!!room?.roomInfo.additionalInfo && (
                <li className="flex gap-2">
                  <FaCheck className="shrink-0 mt-1" />
                  {room?.roomInfo.additionalInfo}
                </li>
              )}
            </ul>
          </div>
          {!isMine && (
            <div className="flex items-center justify-between">
              {reserve.some((r) => r.roomId == room._id) ? (
                <Button onClick={() => navigate(`/payment`)}>Pay</Button>
              ) : (
                <Button
                  onClick={handleReserve}
                  disabled={room.availability.isBlocked}
                >
                  {room.availability.isBlocked ? "Already Booked" : "Reserve"}
                </Button>
              )}

              {wishlist?.some((item: any) => item.roomId === room._id) ? (
                <>
                  {delWishLoading ? (
                    <BeatSpinner />
                  ) : (
                    <>
                      <AiFillHeart
                        onClick={() => handleDeleteWishlist(room._id)}
                        data-tooltip-id={`saved_wishlist`}
                        data-tooltip-content="Already saved wishlist"
                        data-tooltip-place="top"
                        className="text-red-500 text-2xl cursor-pointer focus:outline-none"
                      />
                      <Tooltip className="border-none" id={`saved_wishlist`} />
                    </>
                  )}
                </>
              ) : (
                <>
                  {postWishLoading ? (
                    <BeatSpinner color="#ef4444" />
                  ) : (
                    <>
                      <AiOutlineHeart
                        onClick={() => handleWishlist(room._id)}
                        data-tooltip-id={`wishlist`}
                        data-tooltip-content="Save to wishlist"
                        data-tooltip-place="top"
                        className="text-secondary-500 text-2xl cursor-pointer focus:outline-none"
                      />
                      <Tooltip className="border-none" id={`wishlist`} />
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardRoom;
