import { Button, Modal, NumberInput, TextInput, Textarea } from "@mantine/core";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import UploadThumbnails from "./upload-thumbnails";
import {
  useCreateRoomMutation,
  useUpdateManagerRoomMutation,
} from "../api/manager-api";
import toastSuccess from "../utils/toast-success";
import toastError from "../utils/toast-error";

const ModalAddRoom = ({ hotelId, opened, onClose, defaultValue = {} }: any) => {
  const [doCreate, { isLoading: createLoading }] = useCreateRoomMutation();
  const [doUpdate, { isLoading: updateLoading }] =
    useUpdateManagerRoomMutation();
  const { reset, control, handleSubmit } = useForm<any>({
    defaultValues: {
      thumbnails: [],
      title: "",
      capacity: {
        adult: 0,
        children: 0,
      },
      roomInfo: {
        roomSize: 0,
        regularPrice: 0,
      },
    },
  });

  const isEdit = !!defaultValue?._id;

  useEffect(() => {
    reset(defaultValue);
  }, [defaultValue?._id]);

  const onSubmit = (values: any) => {
    values.hotelId = hotelId;
    if (!isEdit) {
      doCreate(values)
        .unwrap()
        .then(() => {
          toastSuccess("Created");
          onClose();
        })
        .catch((err) => {
          toastError(err);
        });
    } else {
      doUpdate({ data: values, _id: values._id })
        .unwrap()
        .then(() => {
          toastSuccess("Updated");
          onClose();
        })
        .catch((err) => {
          toastError(err);
        });
    }
  };

  return (
    <Modal
      centered
      size="lg"
      opened={opened}
      onClose={onClose}
      title={isEdit ? "Edit room" : "Add new room"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextInput required label="Name" {...field} />}
        />
        <div>
          <label>
            Thumbnails <span className="text-red-500">*</span>
          </label>
          <UploadThumbnails control={control} name="thumbnails" />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Controller
            name="facilities.0"
            control={control}
            render={({ field }) => (
              <TextInput label="Facilities 1" {...field} type="text" />
            )}
          />

          <Controller
            name="facilities.1"
            control={control}
            render={({ field }) => (
              <TextInput label="Facilities 2" {...field} />
            )}
          />
          <Controller
            name="facilities.2"
            control={control}
            render={({ field }) => (
              <TextInput label="Facilities 3" {...field} />
            )}
          />
          <Controller
            name="facilities.3"
            control={control}
            render={({ field }) => (
              <TextInput label="Facilities 4" {...field} />
            )}
          />
        </div>
        <div className="grid grid-cols-2 py-2 gap-4">
          <Controller
            name="capacity.adult"
            control={control}
            render={({ field }) => (
              <NumberInput required label="Adult" {...field} />
            )}
          />

          <Controller
            name="capacity.children"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <NumberInput required label="Children" {...field} />
            )}
          />
        </div>
        <div className="grid grid-cols-2 py-2 gap-4">
          <Controller
            name="roomInfo.roomSize"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput label="Room size" required type="number" {...field} />
            )}
          />

          <Controller
            name="roomInfo.regularPrice"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput
                label="Regular Price"
                required
                type="number"
                {...field}
              />
            )}
          />

          <Controller
            name="roomInfo.discountedPrice"
            control={control}
            render={({ field }) => (
              <TextInput label="Discount price" type="number" {...field} />
            )}
          />

          <Controller
            name="roomInfo.view"
            control={control}
            render={({ field }) => <TextInput label="View" {...field} />}
          />

          <Controller
            name="roomInfo.bedType"
            control={control}
            render={({ field }) => <TextInput label="Bed Type" {...field} />}
          />

          <Controller
            name="roomInfo.additionalInfo"
            control={control}
            render={({ field }) => (
              <Textarea
                label="Additional Info"
                {...field}
                className="col-span-full"
                rows={4}
              />
            )}
          />
        </div>
        <Button
          loading={createLoading || updateLoading}
          type="submit"
          className="!w-32"
        >
          {isEdit ? "Save" : "Add"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalAddRoom;
