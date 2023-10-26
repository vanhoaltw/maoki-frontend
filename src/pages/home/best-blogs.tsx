import Container from "../../components/ui/container";
import {useEffect, useState} from "react";
import Blogs from "./blogs";
import fetchData from "../../hooks/fetchData";
interface BestBlogs {
  thumbnail: string;
  title: string;
  description: string;
  authorName: string;
  authorProfile: string;
  publishDate: string;
}

const BestBlogs: React.FC = () => {
  const [bestBlogs, setBestBloga] = useState<BestBlogs[]>([]);
  useEffect(() => {
    fetchData("/db/best-blogs.json")
      .then((data) => setBestBloga(data))
      .catch((err) => console.log(err));
  }, []);
  // console.log();
  return (
    <Container className="lg:py-20">
      <h2 className="mx-auto text-center">Discover Our Latest Blog Entries</h2>
      <p className="px-4 lg:px-16 text-center py-2 font-normal">
        Explore our blog section for captivating articles on travel, culture,
        and adventure. Get inspired and stay informed with our diverse
        collection of stories.
      </p>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 mx-auto">
        {bestBlogs.splice(0, 4).map((b, index) => (
          <Blogs key={index} {...b} />
        ))}
      </div>
    </Container>
  );
};

export default BestBlogs;
