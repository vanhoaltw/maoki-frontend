import countryList from "react-select-country-list";
import { Select } from "@mantine/core";

const options = countryList().getData();

console.log({ options });
const CountrySelect = ({ value, onChange, ...rest }: any) => {
  return (
    <Select
      label="Your favorite library"
      placeholder="Choose a Location"
      value={value}
      onChange={onChange}
      {...rest}
      searchable
      data={options}
    />
  );
};

export default CountrySelect;
