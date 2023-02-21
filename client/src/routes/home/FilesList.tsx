import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { LoadingSpin } from "@/components/Button";
import { useGetFilesQuery } from "@/features/files/filesApiSlice";
import { FileElement } from "@/types/file.schema";
import FileAction from "@/components/file/FileAction";

type FilesListProps = {
  create: Function;
};

const FilesList: React.FC<FilesListProps> = ({ create }) => {
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
                      #
                    </th>
                    <th
                      scope='col'
                      className='py-3.5 px-3 text-left text-sm font-semibold text-gray-900'
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
                  {!isLoading &&
                    data?.map((item: FileElement, index: number) => (
                      <tr key={item.filename}>
                        <td className='py-4 pl-6 pr-3 text-sm font-medium break-all break-words text-gray-900 sm:pl-0'>
                          {index + 1}.
                        </td>
                        <td className='py-4 px-3 text-sm font-medium break-all break-words text-gray-900 sm:pl-0'>
                          {item.originalname}
                        </td>
                        <td className='py-4 px-3 text-sm break-all break-words text-gray-500 space-y-2.5'>
                          <span className='font-medium'>{item.mimetype}</span>
                          <ul role='list' className='space-y-2.5'>
                            <li>
                              <span className='font-semibold'>
                                Private Key:{" "}
                              </span>
                              <span className='prose font-light text-sm'>
                                {item.privateKey}
                              </span>
                              <CopyToClipboard text={`${item.privateKey}`}>
                                <button>
                                  <span className='ml-2 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800'>
                                    Copy to clipboard
                                  </span>
                                </button>
                              </CopyToClipboard>
                            </li>
                            <li>
                              <span className='font-semibold'>
                                Public Key:{" "}
                              </span>
                              <span className='prose font-light text-sm'>
                                {item.publicKey}
                              </span>
                              <CopyToClipboard text={`${item.publicKey}`}>
                                <button>
                                  <span className='ml-2 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800'>
                                    Copy to clipboard
                                  </span>
                                </button>
                              </CopyToClipboard>
                            </li>
                          </ul>
                          <FileAction />
                        </td>
                        <td className='py-4 px-3 text-sm text-gray-500'>
                          {item.size}
                        </td>
                        <td className='relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0'>
                          <a
                            href='#'
                            className='text-indigo-600 hover:text-indigo-900'
                          >
                            Edit
                            <span className='sr-only'>
                              , {item.originalname}
                            </span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  {!isLoading && !data?.length && (
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
