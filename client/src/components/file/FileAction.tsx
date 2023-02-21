import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFormState } from "react-hook-form";
import {
  useGetFilesQuery,
  useDeleteFileMutation,
  useLazyGetDownloadFileQuery,
  useLazyGetFileQuery,
} from "@/features/files/filesApiSlice";
import FileResponse from "./FileResponse";

const schema = yup.object().shape({
  method: yup.string().default("GET").required(),
  key: yup.string().label("Public/Private key").required(),
});

type FileActionFormValue = {
  key: string;
  method: string;
};

const FileAction: React.FC = () => {
  const { register, control, handleSubmit } = useForm<FileActionFormValue>({
    resolver: yupResolver(schema),
    defaultValues: {
      key: "",
      method: "GET",
    },
  });
  const { errors } = useFormState({ control });
  const { refetch } = useGetFilesQuery();
  const [getDownloadFile] = useLazyGetDownloadFileQuery();
  const [getFile, { isSuccess, data }] = useLazyGetFileQuery();
  const [deleteFile] = useDeleteFileMutation();

  async function onSubmit(data: FileActionFormValue) {
    if (data.method === "GET") {
      const { data: latestData } = await getFile(data.key);
      await getDownloadFile(latestData?.publicKey!);
    }
    if (data.method === "DELETE") {
      deleteFile(data.key).then(() => {
        refetch();
      });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label
            htmlFor='file-action'
            className='block text-sm font-medium text-gray-700'
          >
            File Action
          </label>
          <div className='flex mt-1'>
            <div className='w-full relative rounded-md shadow-sm focus-within:z-10'>
              <div className='absolute inset-y-0 left-0 flex items-center'>
                <label htmlFor='http-method' className='sr-only'>
                  API&apos;s
                </label>
                <select
                  id='http-method'
                  {...register("method")}
                  className='h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                >
                  <option>GET</option>
                  <option>DELETE</option>
                </select>
              </div>
              <input
                type='text'
                id='file-action'
                {...register("key")}
                className='block w-full rounded-none rounded-l-md border-gray-300 pl-24 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                placeholder='public/private key'
              />
            </div>
            <button
              type='submit'
              className='relative whitespace-nowrap -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
            >
              <span>Go</span>
            </button>
          </div>
          {errors.key && (
            <p className='mt-1 text-sm text-danger-600'>
              {errors.key?.message}
            </p>
          )}
        </div>
      </form>
      {isSuccess && (
        <FileResponse>
          <article className='prose prose-slate'>
            <span>MIME types: </span>
            {data?.mimetype}
          </article>
        </FileResponse>
      )}
    </>
  );
};

export default FileAction;
