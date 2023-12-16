import { ReactNode, useCallback, useRef } from "react";

import BeatLoader from "react-spinners/BeatLoader";
import toastError from "../utils/toast-error";
import { useUploadImageMutation } from "../api/private-api";

interface Props {
  children?: ReactNode;
  aspect?: string | number;
  size?: number;
  maxSizeKb?: number;
  multiple?: boolean;
  borderRadius?: number;
  value?: string;
  onChange?: any;
  onError?: any;
  className?: string;
}
const kbToBytes = 1024;

const UploadImage = ({
  children,
  maxSizeKb,
  multiple,
  onChange,
  onError,
  className,
}: Props) => {
  const [doUpload, { isLoading }] = useUploadImageMutation();
  const inputRef = useRef<any>();

  const onUploadError = (error?: any) => {
    const { message } = error || {};
    onError?.(error);
    toastError(message);
  };

  const onPromiseUpload = async (file?: any) => {
    await doUpload(file)
      .then((res: any) => {
        onChange(res?.data?.Location);
      })
      .catch(onUploadError);
  };

  const onUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!!maxSizeKb && file.size > kbToBytes * maxSizeKb) {
      onUploadError({
        message: "Max size exceeds",
      });
      return;
    }
    e.target.value = "";
    await onPromiseUpload(file);
  };

  const getNewUpload = useCallback((child?: any) => {
    return {
      ...child,
      props: {
        ...child.props,
        onClick: () => inputRef.current.click(),
      },
    };
  }, []);

  return (
    <div
      className={`relative hover:opacity-60 transition-opacity h-fit w-fit cursor-pointer overflow-hidden ${className}`}
    >
      {isLoading && (
        <div className="h-full z-10 w-full absolute top-0 left-0 flex items-center justify-center bg-white/60">
          <BeatLoader size={12} />
        </div>
      )}
      {getNewUpload(children)}
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        disabled={isLoading}
        multiple={multiple}
        onChange={onUpload}
        accept="image/*"
      />
    </div>
  );
};

export default UploadImage;
