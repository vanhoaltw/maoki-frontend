import { Link } from "react-router-dom";
import React from "react";

interface HotelType {
  _id: string;
  name: string;
  address: {
    location: string;
  };
  photoURL: string;
  description: string;
  rating: number;
}

const Hotel: React.FC<HotelType> = ({ name, photoURL, description, _id }) => {
  // bg-white className=" h-full border border-secondary-50 dark:bg-secondary-800 dark:border-secondary-800"
  return (
    <Link to={`/hotel/${_id}`}>
      <figure className="relative filter aspect-square rounded-lg overflow-hidden">
        <div style={{ position: "relative", display: "block" }}>
          <img
            className="pobject-cover aspect-square"
            src={photoURL}
            alt="image description"
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.3)", // Black overlay with 0.5 opacity
            }}
          ></div>
          <figcaption className="absolute px-4 text-lg bottom-6">
            <h3 className="text-white line-clamp-1 text-xl">{name}</h3>
            <p className="min-w-0 break-words line-clamp-2 text-white/60 text-sm leading-5 mt-2">
              {description}
            </p>
          </figcaption>
        </div>
      </figure>
    </Link>
  );
};

export default Hotel;
