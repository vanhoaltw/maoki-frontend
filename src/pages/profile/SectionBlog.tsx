import { useGetBlogByUserIdQuery } from "../../api/public-api";
import CardBlog from "../../components/card-blog";
import BeatLoader from "react-spinners/BeatLoader";

const SectionBlog = ({ userId }: { userId: string }) => {
  const { data, isLoading } = useGetBlogByUserIdQuery({ id: userId });

  if (!data?.length && !isLoading) return null;

  return (
    <section className="py-4 border-b">
      <h4 className="mb-4">Blogs</h4>
      <div className="flex overflow-x-auto gap-3">
        {isLoading ? (
          <BeatLoader />
        ) : (
          data?.map?.((i: any) => (
            <div className="w-72" key={i._id}>
              <CardBlog data={i} />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default SectionBlog;
