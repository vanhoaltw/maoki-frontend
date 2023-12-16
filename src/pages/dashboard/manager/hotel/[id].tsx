import { useParams } from "react-router-dom";
import { useGetHotelByIdQuery } from "../../../../api/public-api";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { Button, Image, Tabs, TextInput, Textarea } from "@mantine/core";
import CountrySelect from "../../../../components/country-select";
import { useUpdateManagerHotelMutation } from "../../../../api/manager-api";
import toastSuccess from "../../../../utils/toast-success";
import UploadImage from "../../../../components/upload-image";
import { BsFillHousesFill, BsInfoCircleFill } from "react-icons/bs";
import TabRooms from "./TabRooms";

const HotelDetail = () => {
  const { id } = useParams();
  const { reset, handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      description: "",
      photoURL: "",
      address: {
        location: "",
      },
    },
  });
  const { data, isLoading } = useGetHotelByIdQuery({
    _id: id,
  });

  const [doUpdate, { isLoading: updateLoading }] =
    useUpdateManagerHotelMutation();

  useEffect(() => {
    if (!!data) reset(data?.hotel);
  }, [data?.hotel?._id]);

  const onSubmit = (values: any) => {
    console.log({ values });
    doUpdate(values).then(() => {
      toastSuccess("Saved");
    });
  };

  if (isLoading) return <BeatLoader />;

  return (
    <div>
      <h4 className="mb-4">Stay Editor</h4>

      <Tabs keepMounted={false} variant="outline" defaultValue="info">
        <Tabs.List>
          <Tabs.Tab value="info" leftSection={<BsInfoCircleFill />}>
            Info
          </Tabs.Tab>
          <Tabs.Tab value="room" leftSection={<BsFillHousesFill />}>
            Rooms
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="info">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <TextInput label="Name" {...field} />}
            />

            <div>
              <label htmlFor="photoURL">Photo URL</label>
              <Controller
                name="photoURL"
                control={control}
                render={({ field }) => (
                  <UploadImage onChange={field.onChange}>
                    <Image
                      radius="sm"
                      className="aspect-video"
                      h={180}
                      src={field.value}
                    />
                  </UploadImage>
                )}
              />
            </div>

            <Controller
              name="address.location"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CountrySelect label="Location" {...field} />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea {...field} label="Description" rows={5} />
              )}
            />
            <Button
              loading={updateLoading}
              type="submit"
              className="w-full mt-3"
            >
              Save
            </Button>
          </form>
        </Tabs.Panel>

        <Tabs.Panel value="room" className="py-6">
          <TabRooms />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default HotelDetail;
