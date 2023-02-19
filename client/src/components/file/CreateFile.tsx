import { useCreateFileMutation } from "@/features/files/filesApiSlice";
import React from "react";

type CreateFileProps = {
  onClose: Function;
};

const CreateFile: React.FC<CreateFileProps> = ({ onClose }) => {
  const [mutate, { isLoading }] = useCreateFileMutation();
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file);
    });

    mutate(formData);

    formRef.current?.reset();
  };

  return (
    <form action='#' ref={formRef}>
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
              <label className='flex justify-center text-sm w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'>
                <span className='flex items-center space-x-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6 text-gray-600'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    stroke-width='2'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                    />
                  </svg>
                  <span className='text-gray-600'>
                    Drop files to Attach, or{" "}
                    <span className='text-blue-600 underline'>browse</span>
                  </span>
                </span>
                <input
                  ref={fileInputRef}
                  type='file'
                  name='files'
                  id='file_upload'
                  className='hidden'
                  multiple
                  onChange={onChangeHandler}
                />
              </label>
            </div>
          </div>
        </div>

        <div className='bg-gray-50 px-4 py-3 sm:px-6 flex justify-end'>
          <button
            type='button'
            className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button
            type='submit'
            className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Upload
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateFile;
