import { Link } from "react-router-dom";
import React from "react";
import { CiLocationOn } from "react-icons/ci";
interface HotelCardProps {
  _id: string;
  name: string;
  address: {
    location: string;
  };
  description: string;
  photoURL: string;
}

const HotelCard: React.FC<HotelCardProps> = ({
  address,
  name,
  photoURL,
  description,
  _id,
}) => {
  return (
    <Link to={`/hotel/${_id}`}>
      <div className="w-full h-60 flex flex-col overflow-hidden mx-auto items-center bg-white border border-secondary-200 rounded-lg md:flex-row md:max-w-4xl hover:bg-secondary-100 dark:border-secondary-800 dark:bg-secondary-800 dark:hover:bg-secondary-700">
        <img className="object-cover h-full w-60" src={photoURL} alt={name} />
        <div className="flex flex-col justify-between p-4 leading-normal gap-2">
          <h5>{name}</h5>
          <p className="text-sm text-secondary-400 flex items-center gap-2">
            <CiLocationOn /> {address?.location}
          </p>
          <p className="line-clamp-4 text-sm text-secondary-400">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
