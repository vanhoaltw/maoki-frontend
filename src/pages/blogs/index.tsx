import Main from "../../layout/main";
import Container from "../../components/ui/container";
import { BlogCardSkeleton } from "../../components/ui/card";
import { useGetPublicBlogsQuery } from "../../api/public-api";
import SetTitle from "../../components/set-title";
import Pagination from "../../components/pagination";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setBlogFilter } from "../../redux/blog-filter-slice";
import { BlogType } from "../../types";
import CardBlog from "../../components/card-blog";

const Blogs: React.FC = () => {
  const query = useAppSelector((state) => state.blogFilter);
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetPublicBlogsQuery(query);
  const { data: blogs, totalPages, currentPage } = data || {};

  return (
    <Main>
      <SetTitle title="Blogs" />
      <Container className="py-4 lg:py-12">
        <h1 className="text-center my-4 font-bold">All Blogs</h1>
        <div className="mb-4 lg:mb-8 flex flex-wrap gap-4 md:gap-6">
          {isLoading ? (
            <BlogCardSkeleton />
          ) : (
            blogs?.map((blog: BlogType.Blog) => (
              <CardBlog key={blog._id} data={blog} />
            ))
          )}
        </div>
        {totalPages != 1 && (
          <Pagination
            handlePages={(page) => dispatch(setBlogFilter({ ...query, page }))}
            currentPage={parseInt(currentPage)}
            totalPages={parseInt(totalPages)}
          />
        )}
      </Container>
    </Main>
  );
};

export default Blogs;
