import { useForm, Controller, SubmitHandler } from "react-hook-form";
import BLOG_CATEGORIES from "../../../constants/BLOG_CATEGORIES";
import { usePostUserBlogMutation } from "../../../api/private-api";
import toastError from "../../../utils/toast-error";
import toastSuccess from "../../../utils/toast-success";
import { BeatSpinner } from "../../../components/spinner";
import {
  Button,
  Image,
  Modal,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BiPlus } from "react-icons/bi";
import UploadImage from "../../../components/upload-image";

interface IFormInputs {
  title: string;
  category: string;
  thumbnail: string;
  description: string;
  likeCount: number;
}

const CreateBlog = () => {
  const [opened, handlers] = useDisclosure();
  const [postBlogs, { isLoading }] = usePostUserBlogMutation();
  const { handleSubmit, control } = useForm<IFormInputs>({});

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    postBlogs(data)
      .unwrap()
      .then(({ message }) => {
        toastSuccess(message);
        handlers.close();
      })
      .catch(({ data: { message } }) => {
        const error = { message };
        toastError(error);
      });
  };

  return (
    <>
      <Button leftSection={<BiPlus />} onClick={handlers.open}>
        Add blog
      </Button>
      <Modal
        centered
        size="lg"
        opened={opened}
        onClose={handlers.close}
        title="Create a new blog"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4 mx-auto items-center">
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextInput label="Title" required {...field} />
              )}
            />

            <Controller
              name="category"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select label="Category" {...field} data={BLOG_CATEGORIES} />
              )}
            />
          </div>

          <div>
            <label htmlFor="thumbnail">Image:</label>
            <Controller
              name="thumbnail"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <UploadImage onChange={field.onChange}>
                  <Image
                    h={150}
                    src={
                      field.value ||
                      "https://res.cloudinary.com/hoanguyen/image/upload/v1702548877/elementor-placeholder-image_iey1wq.webp"
                    }
                    alt=""
                  />
                </UploadImage>
              )}
            />
          </div>

          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Textarea
                {...field}
                label="Description"
                required
                rows={5}
                cols={120}
              />
            )}
          />

          <Button disabled={isLoading} type="submit" className="mt-4">
            {isLoading ? <BeatSpinner /> : "Create new blog"}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default CreateBlog;
