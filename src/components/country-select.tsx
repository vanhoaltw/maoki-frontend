import { useEffect, useState } from "react";
import toastError from "../utils/toast-error";
import { Select } from "@mantine/core";

const CountrySelect = ({ value, onChange, ...rest }: any) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("/db/all-district.json")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
      })
      .catch((error) => {
        toastError(error);
      });
  }, []);

  return (
    <Select
      label="Your favorite library"
      placeholder="Choose a Location"
      value={value}
      onChange={onChange}
      {...rest}
      data={locations?.map?.((i: any) => ({ value: i?.name, label: i?.name }))}
    />
  );
};

export default CountrySelect;
