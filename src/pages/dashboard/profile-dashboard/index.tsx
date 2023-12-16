import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../api/private-api";
import { HashSpinner } from "../../../components/spinner";
import toastError from "../../../utils/toast-error";
import toastSuccess from "../../../utils/toast-success";
import SetTitle from "../../../components/set-title";
import Modal from "../../../components/ui/modal";
import { Avatar, Button, PasswordInput, TextInput } from "@mantine/core";
import UploadImage from "../../../components/upload-image";
import { visibilityToggleIcon } from "../../signup";

interface IFormInputs {
  name: string;
  email: string;
  phone: string;
  photoURL: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
const ProfileDashboard = () => {
  const { data: user, isLoading } = useGetProfileQuery(undefined);

  const [updateProfile, { isLoading: updateIsLoading }] =
    useUpdateProfileMutation();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>({});

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const updatedData: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        updatedData[key] = value;
      }
    }
    updateProfile(updatedData)
      .unwrap()
      .then((data) => {
        toastSuccess(data.message);
      })
      .catch(({ data }) => {
        const error = { message: data?.message };
        toastError(error);
      });
  };

  const handleChangeProfile = (url: string) => {
    updateProfile({ photoURL: url })
      .unwrap()
      .then((data) => {
        toastSuccess(data.message);
      })
      .catch(({ data }) => {
        const error = { message: data?.message };
        toastError(error);
      });
  };

  if (isLoading) return <HashSpinner />;

  return (
    <div>
      <SetTitle title="Update Your Profile" />
      <h2 className="text-center">User info</h2>
      <div>
        <div className="my-4 text-center flex items-center flex-col">
          <UploadImage onChange={handleChangeProfile}>
            <Avatar src={user?.photoURL} size={120} alt="user Profile" />
          </UploadImage>

          <h3 className="my-2">{user?.name}</h3>
          <h6 className="text-primary-400">{user?.email}</h6>
        </div>
        <hr />
        <div className="my-2">
          <div className="flex gap-4 items-center justify-center">
            <p className="font-medium w-32">Name:</p>
            <p className="w-32 whitespace-nowrap">{user?.name}</p>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <p className="font-medium w-32">Email:</p>
            <p className="w-32">{user?.email}</p>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <p className="font-medium w-32">Phone:</p>
            <p className="w-32">{user?.phone}</p>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <p className="font-medium w-32">Age: </p>
            <p className="w-32">{user?.age}</p>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <p className="font-medium w-32">Gender: </p>
            <p className="w-32">{user?.gender}</p>
          </div>
        </div>
        <Modal
          title="Edit Profile Info"
          button={{ label: "Change Info", className: "block mx-auto" }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="name"
              control={control}
              defaultValue={user?.name}
              render={({ field }) => <TextInput label="Name" {...field} />}
            />

            <Controller
              name="phone"
              control={control}
              defaultValue={user?.phone}
              render={({ field }) => (
                <TextInput
                  type="number"
                  label="Phone"
                  maxLength={11}
                  {...field}
                />
              )}
            />

            <div>
              <label htmlFor="photoURL">Photo:</label>
              <Controller
                name="photoURL"
                control={control}
                defaultValue={user?.photoURL}
                render={({ field }) => (
                  <UploadImage onChange={field.onChange}>
                    <Avatar src={field.value} size={80} />
                  </UploadImage>
                )}
              />
            </div>

            <Controller
              name="oldPassword"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  label="Current password"
                  visibilityToggleIcon={visibilityToggleIcon}
                  {...field}
                />
              )}
            />

            <Controller
              name="newPassword"
              control={control}
              rules={{
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/,
                  message:
                    "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
                },
              }}
              render={({ field }) => (
                <PasswordInput
                  label="New Password"
                  visibilityToggleIcon={visibilityToggleIcon}
                  error={errors.newPassword?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                validate: (value: string) =>
                  value === watch("newPassword") || "Passwords do not match",
              }}
              render={({ field }) => (
                <PasswordInput
                  label="Confirm password"
                  visibilityToggleIcon={visibilityToggleIcon}
                  error={errors.confirmPassword?.message}
                  {...field}
                />
              )}
            />

            <Button type="submit" loading={updateIsLoading} className="mt-4">
              Save
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default ProfileDashboard;
