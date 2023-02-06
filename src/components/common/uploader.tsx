import { UploadIcon } from "@components/icons/upload-icon";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Attachment } from "@framework/types";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { ACCEPTED_FILE_TYPES } from "@data/constant";

const getPreviewImage = (value: any) => {
  let images: any[] = [];
  if (value) {
    images = Array.isArray(value) ? value : [{ ...value }];
  }
  return images;
};
export default function Uploader({
  onChange,
  value,
  multiple,
  acceptFile,
  helperText,
}: any) {
  const { t } = useTranslation();
  const [files, setFiles] = useState<Attachment[]>(getPreviewImage(value));

  const [error, setError] = useState<string | null>(null);
  const { getRootProps, getInputProps } = useDropzone({
    ...(!acceptFile ? { accept: "image/*" } : { accept: ACCEPTED_FILE_TYPES }),
    multiple,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length) {
      }
    },

    onDropRejected: (fileRejections) => {
      fileRejections.forEach((file) => {
        file?.errors?.forEach((error) => {
          if (error?.code === "file-too-large") {
            setError(t("error-file-too-large"));
          } else if (error?.code === "file-invalid-type") {
            setError(t("error-invalid-file-type"));
          }
        });
      });
    },
  });

  const handleDelete = (image: string) => {
    const images = files.filter((file) => file.thumbnail !== image);
    setFiles(images);
    if (onChange) {
      onChange(images);
    }
  };
  const thumbs = files?.map((file: any, idx) => {
    const imgTypes = [
      "tif",
      "tiff",
      "bmp",
      "jpg",
      "jpeg",
      "gif",
      "png",
      "eps",
      "raw",
    ];
    // let filename, fileType, isImage;
    if (file && file.id) {
      // const processedFile = processFileWithName(file);
      const splitArray = file?.file_name?.split(".");
      const fileType = splitArray?.pop(); // it will pop the last item from the fileSplitName arr which is the file ext
      const filename = splitArray?.join("."); // it will join the array with dot, which restore the original filename
      const isImage = file?.thumbnail && imgTypes.includes(fileType); // check if the original filename has the img ext

      // Old Code *******

      // const splitArray = file?.original?.split('/');
      // let fileSplitName = splitArray[splitArray?.length - 1]?.split('.'); // it will create an array of words of filename
      // const fileType = fileSplitName.pop(); // it will pop the last item from the fileSplitName arr which is the file ext
      // const filename = fileSplitName.join('.'); // it will join the array with dot, which restore the original filename
      // const isImage = file?.thumbnail && imgTypes.includes(fileType); // check if the original filename has the img ext

      return (
        <div
          className={`relative mt-2 inline-flex flex-col overflow-hidden rounded mr-2 ${
            isImage ? "border border-border-200" : ""
          }`}
          key={idx}
        >
          {/* {file?.thumbnail && isImage ? ( */}
          {isImage && (
            // <div className="flex h-16 w-16 min-w-0 items-center justify-center overflow-hidden">
            //   <Image
            //     src={file.thumbnail}
            //     width={56}
            //     height={56}
            //     alt="uploaded image"
            //   />
            // </div>
            <figure className="relative h-16 w-28">
              <Image
                src={file.thumbnail}
                alt={filename}
                layout="fill"
                objectFit="contain"
              />
            </figure>
          )}
          {multiple ? (
            <button
              className="absolute top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-light shadow-xl outline-none end-1"
              onClick={() => handleDelete(file.thumbnail)}
            >
              X
            </button>
          ) : null}
        </div>
      );
    }
  });

  useEffect(
    () => () => {
      // Reset error after upload new file
      setError(null);

      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: any) => URL.revokeObjectURL(file.thumbnail));
    },
    [files]
  );

  return (
    <section className="upload">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none",
        })}
      >
        <input {...getInputProps()} />
        <UploadIcon className="text-muted-light" />
        <p className="mt-4 text-center text-sm text-body">
          {helperText ? (
            <span className="font-semibold text-gray-500">{helperText}</span>
          ) : (
            <>
              <span className="font-semibold text-accent">
                {t("text-upload-highlight")}
              </span>{" "}
              {t("text-upload-message")} <br />
              <span className="text-xs text-body">{t("text-img-format")}</span>
            </>
          )}
        </p>
        {error && (
          <p className="mt-4 text-center text-sm text-body text-red-600">
            {error}
          </p>
        )}
      </div>

      {/* {(!!thumbs.length || loading) && (
        <aside className="mt-2 flex flex-wrap">
          {!!thumbs.length && thumbs}
          {loading && (
            <div className="mt-2 flex h-16 items-center ms-2">
              <Loader simple={true} className="h-6 w-6" />
            </div>
          )}
        </aside>
      )} */}
    </section>
  );
}
