import {createApi} from "@reduxjs/toolkit/query/react";
import BASE_QUERY from "./BASE_QUERY";

const api = createApi({
  baseQuery: BASE_QUERY,
  reducerPath: "bestHotels",
  tagTypes: ["bestHotels"],
  endpoints: (builder) => ({
    getBestHotels: builder.query({
      query: () => "/public/hotel",
      providesTags: ["bestHotels"],
    }),
  }),
});

export const {useGetBestHotelsQuery} = api;
export default api;
