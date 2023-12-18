import BeatLoader from "react-spinners/BeatLoader";
import { useGetHotelByUserIdQuery } from "../../api/public-api";
import Hotel from "../home/Hotel";

const SectionListing = ({ userId }: { userId: string }) => {
  const { data, isLoading } = useGetHotelByUserIdQuery({ id: userId });
  if (!data?.length && !isLoading) return null;

  return (
    <section className="py-4 border-b">
      <h4 className="mb-2">Stays</h4>
      <div className="flex gap-2 overflow-hidden">
        {isLoading ? (
          <BeatLoader />
        ) : (
          data?.map?.((i: any) => (
            <div key={i._id} className="w-56 shrink-0">
              <Hotel {...i} />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default SectionListing;
