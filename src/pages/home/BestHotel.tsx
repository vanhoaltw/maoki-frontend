import Container from "../../components/ui/container";
import Hotel from "./Hotel";
// import { HashSpinner } from "../../components/spinner";
import { useGetHotelsQuery } from "../../api/public-api";
import React from "react";
import HotelSkeleton from "../../components/skeleton/hotel-skeleton";

interface HotelType {
  _id: string;
  name: string;
  address: {
    location: string;
  };
  photoURL: string;
  description: string;
}

const BestHotel: React.FC = () => {
  const { data, isLoading } = useGetHotelsQuery({ limit: 4 });
  const initialHotel: HotelType[] = [];
  const hotels = data?.data || initialHotel;

  return (
    <Container className="lg:my-20">
      <div className="text-center mb-6">
        <h2 className="text-center uppercase">Discover our best stays</h2>
        <p className="">
          Discover a curated selection of the world's finest stays, where
          opulence meets comfort.
        </p>
      </div>
      {isLoading ? (
        <HotelSkeleton />
      ) : (
        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto">
          {hotels &&
            hotels.map((hotel: any) => <Hotel key={hotel._id} {...hotel} />)}
        </div>
      )}
    </Container>
  );
};

export default BestHotel;
