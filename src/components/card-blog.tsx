import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  CardSection,
  Image,
} from "@mantine/core";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BlogType } from "../types";
import { useBlogCard } from "../hooks";
import formatPostDate from "../utils/format-post-date";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const CardBlog = ({ data }: { data: BlogType.Blog }) => {
  const {
    title,
    likeCount,
    publishDate,
    description,
    thumbnail,
    userId,
    userName,
    userProfile,
    _id,
  } = data || {};

  const {
    bookmark,
    liked,
    handleAddBookmark,
    handleRemoveBookmark,
    handleLike,
    handleRemoveLike,
  } = useBlogCard(_id);

  const avatar = userProfile || userId?.photoURL;
  const name = userName || userId?.name;

  const isLiked = liked?.includes?.(_id);
  const isMarked = bookmark?.some((item: any) => item.blogId === _id);
  return (
    <Card padding="md" radius="md" withBorder className="max-w-[350px]">
      <CardSection>
        <Link to={`/blogs/${_id}`} className="relative">
          <Image src={thumbnail} h={160} />
        </Link>
      </CardSection>

      <div className="flex justify-between gap-4 py-4">
        <Link
          to={`/blogs/${_id}`}
          className="text-lg font-bold min-w-0 break-words line-clamp-1 flex-1 overflow-hidden"
        >
          {title}
        </Link>
        <ActionIcon
          variant="transparent"
          onClick={isMarked ? handleRemoveBookmark : handleAddBookmark}
        >
          {isMarked ? (
            <BsBookmarkStarFill size={20} />
          ) : (
            <BsBookmarkStar size={20} />
          )}
        </ActionIcon>
      </div>
      {description.length >= 90 ? (
        <p className="mb-3 text-secondary-500 break-words text-sm">
          {description.slice(0, 90)}{" "}
          <span className="text-blue-400">read more</span>
        </p>
      ) : (
        <p className="mb-3 text-sm">{description}</p>
      )}

      <div className="py-2 flex justify-between items-center">
        <Link
          to={`/profile/${userId}`}
          className="group flex gap-2 justify-center items-center"
        >
          <Avatar size={40} src={avatar} alt={name} />
          <div className="flex flex-col ">
            <span className="font-semibold group-hover:underline dark:text-white">
              {name}
            </span>
            <small className="text-sm text-secondary-500 dark:text-white">
              {!publishDate ? "New" : formatPostDate(publishDate)}
            </small>
          </div>
        </Link>
        <div className="flex items-center justify-center gap-1">
          <Button
            variant="subtle"
            className="!text-secondary-500 !bg-white !text-base"
            onClick={isLiked ? handleRemoveLike : handleLike}
            leftSection={
              isLiked ? (
                <AiFillLike className="text-red-300" size={20} />
              ) : (
                <AiOutlineLike size={20} />
              )
            }
          >
            {likeCount}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CardBlog;
