import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateFileMutation,
  useGetFilesQuery,
} from "@/features/files/filesApiSlice";
import { CancelButton, SubmitButton } from "../Button";

type FileDetails = {
  name: string;
  size: number;
};

type CreateFileProps = {
  onClose: Function;
};

type CreateFileInput = {
  files: FormData;
};

const CreateFile: React.FC<CreateFileProps> = ({ onClose }) => {
  const { handleSubmit, setValue, reset } = useForm<CreateFileInput>({
    defaultValues: {},
  });
  const [fileDetails, setFileDetails] = useState<FileDetails[]>([]);
  const { refetch } = useGetFilesQuery();
  const [mutate, { isLoading }] = useCreateFileMutation();
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    const formData = new FormData();
    const details: FileDetails[] = [];
    Array.from(event.target.files).forEach((file) => {
      details.push({ name: file.name, size: file.size });
      formData.append("files", file);
    });
    setValue("files", formData);
    setFileDetails(details);
    formRef.current?.reset();
  };

  function onSubmit({ files }: CreateFileInput) {
    if (files)
      mutate(files).then(() => {
        refetch();
        reset();
        setFileDetails([]);
        onClose();
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate ref={formRef}>
      <div className='shadow sm:overflow-hidden sm:rounded-md'>
        <div className='space-y-6 bg-white py-6 px-4 sm:p-6'>
          <div>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              Upload Files
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              This information will be publicly accessible to those who have the
              public key.
            </p>
          </div>

          <div className='grid grid-cols-3 gap-6'>
            <div className='col-span-3'>
              <label
                htmlFor='files_upload'
                className='flex justify-center text-sm w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'
              >
                <span className='flex items-center space-x-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6 text-gray-600'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                    />
                  </svg>
                  <span className='text-gray-600'>
                    Drop files to Attach, or{" "}
                    <span className='text-blue-600 underline'>browse</span>
                  </span>
                </span>
                <input
                  type='file'
                  name='files'
                  id='files_upload'
                  className='hidden'
                  multiple
                  onChange={onChangeHandler}
                />
              </label>
            </div>
          </div>
        </div>

        {!!fileDetails.length && (
          <ul
            role='list'
            className='bg-white pb-6 px-4 sm:px-6 divide-y divide-gray-200'
          >
            {fileDetails.map((fileDetail: FileDetails, index: number) => (
              <li
                key={fileDetail.name + index}
                className='relative bg-white py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50'
              >
                <div className='flex justify-between space-x-3'>
                  <div className='min-w-0 flex-1'>
                    <a href='#' className='block focus:outline-none'>
                      <span className='absolute inset-0' aria-hidden='true' />
                      <p className='truncate text-sm font-medium text-gray-900'>
                        {fileDetail.name}
                      </p>
                    </a>
                  </div>
                  <span className='flex-shrink-0 whitespace-nowrap text-sm text-gray-500'>
                    {fileDetail.size}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className='bg-gray-50 px-4 py-3 sm:px-6 flex justify-end'>
          <CancelButton onClick={() => onClose()}>Cancel</CancelButton>
          <SubmitButton className='ml-3' loading={isLoading}>
            {isLoading ? "Uploading..." : "Upload"}
          </SubmitButton>
        </div>
      </div>
    </form>
  );
};

export default CreateFile;
