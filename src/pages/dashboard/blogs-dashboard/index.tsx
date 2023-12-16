import { useGetUserBlogsQuery } from "../../../api/private-api";
import { HashSpinner } from "../../../components/spinner";
import CreateBlog from "./CreateNewBlog";
import SetTitle from "../../../components/set-title";
import CardBlog from "../../../components/card-blog";

const BlogsDashboard = () => {
  const { data: blogs, isLoading } = useGetUserBlogsQuery(undefined);

  return (
    <div>
      <SetTitle title={`Blogs | Dashboard`} />
      <div className="flex justify-between items-center mb-6">
        <h4 className="appearance-none flex gap-2">My Blogs</h4>
        <CreateBlog />
      </div>

      {isLoading ? (
        <HashSpinner />
      ) : blogs && blogs.length > 0 ? (
        <div className="flex gap-4 flex-wrap">
          {blogs.map((blog: any) => (
            <CardBlog key={blog._id} data={blog} />
          ))}
        </div>
      ) : (
        <p>You haven't added any blogs yet.</p>
      )}
    </div>
  );
};

export default BlogsDashboard;
