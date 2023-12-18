import { useParams } from "react-router-dom";
import { useGetRoomByHotelQuery } from "../../../../api/private-api";
import BeatLoader from "react-spinners/BeatLoader";
import { Button } from "@mantine/core";
import { BiPlus } from "react-icons/bi";
import ModalAddRoom from "../../../../components/modal-add-room";
import { useState } from "react";
import CardRoom from "../../../../components/card-room";

const TabRooms = () => {
  const { id } = useParams();
  const [selected, setSelected] = useState<{} | null>(null);
  const { data, isLoading } = useGetRoomByHotelQuery(id);

  if (isLoading) return <BeatLoader />;

  return (
    <div>
      {data?.length ? (
        <div>
          <Button
            onClick={() => setSelected({})}
            leftSection={<BiPlus />}
            variant="outline"
            className="mb-6 ml-auto"
          >
            Add room
          </Button>
          <div className="grid grid-cols-3 gap-4">
            {data.map((room: any) => (
              <div className="cursor-pointer" onClick={() => setSelected(room)}>
                <CardRoom isMine key={room._id} room={room} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-10">
          This stay haven't room, please add rooms to start
          <Button
            onClick={() => setSelected({})}
            leftSection={<BiPlus />}
            variant="outline"
          >
            Add room
          </Button>
        </div>
      )}

      {!!selected && (
        <ModalAddRoom
          hotelId={id}
          opened
          onClose={() => setSelected(null)}
          defaultValue={selected}
        />
      )}
    </div>
  );
};

export default TabRooms;
