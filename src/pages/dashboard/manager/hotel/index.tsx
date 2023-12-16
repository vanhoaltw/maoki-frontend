import Container from "../../../../components/ui/container";

import { BeatSpinner } from "../../../../components/spinner";

import SetTitle from "../../../../components/set-title";
import { ActionIcon, Badge, Button, Image, Table } from "@mantine/core";
import { useGetMyHotelsQuery } from "../../../../api/private-api";
import { BiEdit, BiPlus } from "react-icons/bi";
import { usePostManagerHotelMutation } from "../../../../api/manager-api";
import { useAppSelector } from "../../../../redux/hooks";
import { useLocation } from "../../../../hooks/use-location";
import { Link, useNavigate } from "react-router-dom";
import STATUS from "../../../../constants/STATUS";

import moment from "moment";

// const hotelDefaultValue: HotelType.Hotel = {
//   address: {
//     map: {
//       lat: 0,
//       lng: 0,
//     },
//     thumbnailURL: "",
//     location: "",
//   },
//   _id: "",
//   managerId: "",
//   name: "",
//   photoURL: "",
//   description: "",
//   availableRoom: 0,
//   addedRoom: 0,
//   status: "",
//   createdAt: "",
//   updatedAt: "",
//   __v: 0,
// };

const Hotel: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  // const [hotel, setHotel] = useState<HotelType.Hotel>(hotelDefaultValue);
  // const [isLoading, setIsLoading] = useState(false);
  const { location } = useLocation();
  const { data, isLoading } = useGetMyHotelsQuery({});
  const [doCreateNewHotel, { isLoading: createLoading }] =
    usePostManagerHotelMutation(data);
  const navigate = useNavigate();

  console.log({ data });
  // const { handleSubmit, control, reset } = useForm<IFormInputs>({});
  // const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
  //   setIsLoading(true);
  //   try {
  //     const { data: resData } = await axios.post("/manager/hotel", data);
  //     toastSuccess(resData.message);
  //     setHotel(resData.hotel);
  //     reset();
  //   } catch (error: any) {
  //     toastError(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get("/manager/hotel")
  //     .then(({ data }) => {
  //       setHotel(data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       toastError(error);
  //       setIsLoading(false);
  //     });
  // }, []);

  // const [locations, setLocations] = useState([]);

  // useEffect(() => {
  //   fetch("/db/all-district.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setLocations(data);
  //     })
  //     .catch((error) => {
  //       toastError(error);
  //     });
  // }, []);

  const handleCreateNewHotel = () => {
    doCreateNewHotel({
      name: `New Stay of ${user?.name}`,
      availableRoom: 1,
      description: "",
      address: {
        location: "",
        map: {
          lat: location.latitude,
          lng: location.longitude,
        },
      },
      photoURL:
        "https://res.cloudinary.com/hoanguyen/image/upload/v1702548877/elementor-placeholder-image_iey1wq.webp",
    }).then((res: any) => {
      if (res?.data?.hotel?._id) {
        navigate(res?.data?.hotel?._id);
      }
    });
  };

  return (
    <Container>
      {isLoading ? (
        <BeatSpinner />
      ) : (
        <div>
          <SetTitle title={`Your's Hotel | Dashboard`} />
          <div className="flex items-end justify-between mb-6">
            <h4>Total stays: {data?.length}</h4>

            {!!data?.length && (
              <Button
                variant="outline"
                leftSection={<BiPlus />}
                onClick={doCreateNewHotel}
              >
                Create new
              </Button>
            )}
          </div>
          <div className="shadow-sm border rounded-md">
            <Table verticalSpacing="lg" horizontalSpacing="lg">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Stay</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Location</Table.Th>
                  <Table.Th>Last Updated</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {!data?.length ? (
                  <Table.Td colSpan={4}>
                    <div className="flex flex-col items-center gap-4 pt-4">
                      You haven't create any stay yet
                      <Button
                        loading={createLoading}
                        onClick={handleCreateNewHotel}
                        leftSection={<BiPlus />}
                        variant="outline"
                        className="w-24 line h-10"
                      >
                        Let's create
                      </Button>
                    </div>
                  </Table.Td>
                ) : (
                  data?.map?.((i: any) => (
                    <Table.Tr key={i?._id}>
                      <Table.Td className="flex items-center gap-2">
                        <Image
                          src={i?.photoURL}
                          className="aspect-video w-20"
                          h={40}
                          radius="sm"
                        />
                        <strong className="min-w-0 break-words line-clamp-2">
                          {i?.name}
                        </strong>
                      </Table.Td>

                      <Table.Td>
                        {i?.status === STATUS.APPROVED && (
                          <Badge size="xs" color="green">
                            Active
                          </Badge>
                        )}
                        {i?.status === STATUS.PENDING && (
                          <Badge color="yellow">In Progress</Badge>
                        )}
                        {i?.status === STATUS.REJECTED && (
                          <Badge color="red">Rejected</Badge>
                        )}
                      </Table.Td>

                      <Table.Td>
                        {i?.address?.location || (
                          <span className="text-gray-400">Not found</span>
                        )}
                      </Table.Td>
                      <Table.Td>
                        {moment(i?.updatedAt).format("MMM Do")}
                      </Table.Td>
                      <Table.Td>
                        <Link to={i?._id}>
                          <ActionIcon variant="subtle" size="md">
                            <BiEdit size={20} />
                          </ActionIcon>
                        </Link>
                      </Table.Td>
                    </Table.Tr>
                  ))
                )}
              </Table.Tbody>
            </Table>
          </div>
          {/* {hotel.managerId == "" ? (
            <>
              <h2 className="text-center">Create your stay:</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Stay name:</label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <input {...field} />}
                />
                <div className="grid w-full md:grid-cols-1 lg:grid-cols-2 py-2 gap-4">
                  <div>
                    <label htmlFor="photoURL">Photo URL</label>
                    <Controller
                      name="photoURL"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => <input {...field} />}
                    />
                  </div>
                  <div>
                    <label htmlFor="availableRoom">Available room</label>
                    <Controller
                      name="availableRoom"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => <input {...field} />}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 py-2 gap-4">
                  <div>
                    <label htmlFor="locationName">Location Name</label>
                    <Controller
                      name="address.location"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="bg-secondary-50 border text-secondary-900 text-sm rounded-lg focus:ring-primary-500 block w-full p-2.5 dark:bg-secondary-700 dark:border-secondary-800 dark:placeholder-secondary-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option value="" disabled>
                            Select a location
                          </option>
                          {locations.map((location: any) => (
                            <option key={location.id} value={location?.name}>
                              {location?.name}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </div>

                  <div>
                    <label htmlFor="locationThumbnailURL">
                      Location ThumbnailURL
                    </label>
                    <Controller
                      name="address.thumbnailURL"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => <input {...field} />}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 py-2 gap-4">
                  <div>
                    <label htmlFor="Latitude">Latitude</label>
                    <Controller
                      name="address.map.lat"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => <input {...field} />}
                    />
                  </div>
                  <div>
                    <label htmlFor="Longitude">Longitude</label>
                    <Controller
                      name="address.map.lng"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => <input {...field} />}
                    />
                  </div>
                </div>
                <label htmlFor="description">Description</label>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      className="border-2 rounded-2xl w-full p-2"
                      rows={5}
                      cols={120}
                    />
                  )}
                />
                <Button type="submit" className="w-full mt-3">
                  {isLoading ? <BeatSpinner /> : "Add a new Hotel"}
                </Button>
              </form>
            </>
          ) : (
            <>
              {isLoading ? (
                <HashSpinner />
              ) : (
                <>{hotel.managerId && <ViewHotel hotel={hotel} />}</>
              )}
            </>
          )} */}
        </div>
      )}
    </Container>
  );
};

export default Hotel;
