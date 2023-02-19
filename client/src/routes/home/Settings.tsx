import React from "react";

const Settings: React.FC = () => {
  return (
    <form action='#' method='POST'>
      <div className='shadow sm:overflow-hidden sm:rounded-md'>
        <div className='space-y-6 bg-white py-6 px-4 sm:p-6'>
          <div>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              Settings
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Uses settings and storage configuration.
            </p>
          </div>

          <div className='grid grid-cols-6 gap-6'>
            <div className='col-span-6 sm:col-span-3'>
              <label
                htmlFor='upload-limit'
                className='block text-sm font-medium text-gray-700'
              >
                Upload limit
              </label>
              <input
                type='text'
                name='upload-limit'
                id='upload-limit'
                className='mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
              />
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <label
                htmlFor='download-limit'
                className='block text-sm font-medium text-gray-700'
              >
                Download limit
              </label>
              <input
                type='text'
                name='download-limit'
                id='download-limit'
                className='mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
              />
            </div>
          </div>
        </div>
        <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
          <button
            type='submit'
            className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default Settings;
