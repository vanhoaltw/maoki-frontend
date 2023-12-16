import { useCallback, useEffect, useState } from "react";

export const useLocation = () => {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const getLocation = useCallback(() => {
    if ("geolocation" in navigator) {
      return navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  return { getLocation, location: position };
};
