import { BiPlusCircle, BiTrash } from "react-icons/bi";
import UploadImage from "./upload-image";
import { Controller, useFieldArray } from "react-hook-form";
import { ActionIcon } from "@mantine/core";

const UploadThumbnails = ({
  control,
  name,
}: {
  control: any;
  name: string;
}) => {
  const { fields, append, remove } = useFieldArray(
    { control, name }
  );

  return (
    <div className="grid grid-cols-4 gap-4 w-full">
      {fields.map((field, index) => {
        return (
          <div
            className="aspect-square shadow-md rounded-md w-full relative overflow-hidden"
            key={field.id}
          >
            <Controller
              name={`${name}.${index}`}
              control={control}
              render={({ field }) => (
                <>
                  <div className="absolute right-2  top-2 h-fit">
                    <ActionIcon color="dark" onClick={() => remove(index)}>
                      <BiTrash />
                    </ActionIcon>
                  </div>
                  <img
                    className="object-cover object-center h-full w-full"
                    src={field.value}
                  />
                </>
              )}
            />
          </div>
        );
      })}
      <UploadImage onChange={append} className="!w-full cursor-pointer">
        <div className="aspect-square hover:bg-slate-100 border-black border-2 rounded-md border-dotted flex items-center justify-center">
          <BiPlusCircle size={32} />
        </div>
      </UploadImage>
    </div>
  );
};

export default UploadThumbnails;
