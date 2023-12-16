import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Card, Image } from "@mantine/core";
import { Md20Mp } from "react-icons/md";
import { BiUser } from "react-icons/bi";
interface HotelRoomCardProps {
  _id: string;
  title: string;
  thumbnails: [];
  thumbnail1: string;
  thumbnail2: string;
  thumbnail3: string;
  facilities: [];
  facilities1: string;
  facilities2: string;
  facilities3: string;
  facilities4: string;
  adult: number;
  children: number;
  roomSize: string;
  bedType: string;
  description: string;
  regularPrice: number;
  discountPrice: number;
  capacity: {
    adult: number;
    children: number;
  };
  roomInfo: {
    roomSize: string;
    bedType: string;
    regularPrice: number;
    discountedPrice: number;
    view: string;
    additionalInfo: string;
  };
}
``;
const HotelRoomCard: React.FC<{ data: HotelRoomCardProps }> = ({ data }) => {
  const { title, thumbnails, capacity, roomInfo } = data || {};
  // const [updateManagerRoom] = useUpdateManagerRoomMutation();
  // const { handleSubmit, control } = useForm<IFormInputs>({});
  // const onSubmit: SubmitHandler<IFormInputs> = async (data: any) => {
  //   updateManagerRoom({ data, _id })
  //     .unwrap()
  //     .then(({ message }) => {
  //       toastSuccess(message);
  //     })
  //     .catch(({ data: { message } }) => {
  //       const error = { message };
  //       toastError(error);
  //     });
  // };
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="max-w-[350px]"
    >
      <Card.Section>
        <Swiper
          slidesPerView={1}
          spaceBetween={5}
          pagination={{ clickable: true }}
          navigation={thumbnails?.length > 2}
          modules={[Pagination]}
        >
          {thumbnails.map((img, index) => (
            <SwiperSlide key={index}>
              <Image className=" h-52 w-full" src={img} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </Card.Section>

      <p className="font-bold pt-4">{title}</p>
      <p className="text-sm">
        <span className="font-semibold">
          <BiUser /> Guest:
        </span>{" "}
        {capacity?.children + capacity?.adult}
      </p>
      <p className="text-sm">
        <span className="font-semibold">Room Size:</span> {roomInfo.roomSize}{" "}
        <Md20Mp />
      </p>
    </Card>
  );
};

export default HotelRoomCard;
