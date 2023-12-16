import Container from "../../components/ui/container";
import React from "react";
import { BlogCardSkeleton } from "../../components/ui/card";
import { useGetPublicBlogsQuery } from "../../api/public-api";
import { useAppSelector } from "../../redux/hooks";
import { BlogType } from "../../types";
import CardBlog from "../../components/card-blog";

const BestBlogs: React.FC = () => {
  const query = useAppSelector((state) => state.blogFilter);
  const { data, isLoading } = useGetPublicBlogsQuery(query);
  const { data: blogs } = data || {};

  return (
    <Container className="lg:my-20">
      <div className="mb-6 text-center">
        <h2 className="mx-auto uppercase text-center">
          Discover Our Latest Blog Entries
        </h2>
        <p className="">
          Discover a curated selection of the world's finest stays, where
          opulence meets comfort.
        </p>
      </div>
      <div className=" gap-4 md:gap-6 py-4 flex flex-wrap mx-auto">
        {isLoading ? (
          <BlogCardSkeleton items={4} />
        ) : (
          blogs
            ?.slice(0, 4)
            .map((blog: BlogType.Blog) => (
              <CardBlog key={blog._id} data={blog} />
            ))
        )}
      </div>
    </Container>
  );
};

export default BestBlogs;
