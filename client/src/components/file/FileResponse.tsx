import React, { PropsWithChildren, useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const FileResponse: React.FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    return function cleanup() {
      setOpen(true);
    };
  }, []);

  if (!open) return null;

  return (
    <div className='rounded-md bg-green-50 p-4'>
      <div className='flex'>
        <div className='flex-shrink-0'>
          <CheckCircleIcon
            className='h-5 w-5 text-green-400'
            aria-hidden='true'
          />
        </div>
        <div className='ml-3'>
          <h3 className='text-sm font-medium text-green-800'>Success</h3>
          <div className='mt-2 text-sm text-green-700'>{children}</div>
          <div className='mt-4'>
            <div className='-mx-2 -my-1.5 flex'>
              <button
                type='button'
                className='rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50'
                onClick={() => setOpen(false)}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileResponse;
