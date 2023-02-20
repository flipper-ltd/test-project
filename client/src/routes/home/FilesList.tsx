import { LoadingSpin } from "@/components/Button";
import { FileElement } from "@/components/file/create";
import { useGetFilesQuery } from "@/features/files/filesApiSlice";
import React from "react";

type FilesListProps = {
  create: Function;
  list?: any[];
};

const people = [
  {
    id: `${new Date().getTime()}`,
    name: "Lindsay Walton",
    mimetype: "Front-end Developer",
    size: "lindsay.walton@example.com",
  },
  // More file...
];

const FilesList: React.FC<FilesListProps> = ({ create, list = people }) => {
  const { data, isLoading } = useGetFilesQuery();

  return (
    <div className='shadow sm:overflow-hidden sm:rounded-md'>
      <div className='space-y-6 bg-white py-6 px-4 sm:p-6'>
        <div className='sm:flex sm:items-center'>
          <div className='sm:flex-auto'>
            <h1 className='text-xl font-semibold text-gray-900'>Files List</h1>
            <p className='mt-2 text-sm text-gray-700'>
              A list of all the files in your account including their name,
              mimtype, and size.
            </p>
          </div>
          <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
            <button
              type='button'
              className='block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              onClick={() => create()}
            >
              Add files
            </button>
          </div>
        </div>
        <div className='mt-8 flow-root'>
          <div className='-my-2 -mx-6 overflow-x-auto lg:-mx-8'>
            <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
              <table className='min-w-full divide-y divide-gray-300'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='py-3.5 px-3 text-left text-sm font-semibold text-gray-900'
                    >
                      MIME type
                    </th>
                    <th
                      scope='col'
                      className='py-3.5 px-3 text-left text-sm font-semibold text-gray-900'
                    >
                      Size
                    </th>
                    <th
                      scope='col'
                      className='relative py-3.5 pl-3 pr-6 sm:pr-0'
                    >
                      <span className='sr-only'>Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {data?.map((item: FileElement) => (
                    <tr key={item.filename}>
                      <td className='whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                        {item.originalname}
                      </td>
                      <td className='whitespace-nowrap py-4 px-3 text-sm text-gray-500'>
                        {item.mimetype}
                      </td>
                      <td className='whitespace-nowrap py-4 px-3 text-sm text-gray-500'>
                        {item.size}
                      </td>
                      <td className='relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0'>
                        <a
                          href='#'
                          className='text-indigo-600 hover:text-indigo-900'
                        >
                          Edit
                          <span className='sr-only'>, {item.originalname}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                  {!data?.length && (
                    <tr>
                      <td
                        colSpan={4}
                        className='whitespace-nowrap text-center py-4 px-3 text-sm text-gray-500'
                      >
                        Not found
                      </td>
                    </tr>
                  )}
                  {isLoading && (
                    <tr>
                      <td
                        colSpan={4}
                        className='relative whitespace-nowrap text-center py-5 px-3 text-sm text-gray-500'
                      >
                        <LoadingSpin className='text-indigo-500' />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesList;
