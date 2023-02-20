import { classNames } from "@/utils";
import React from "react";

export const LoadingSpin = () => (
  <div className='absolute inset-0 flex justify-center items-center'>
    <svg
      className='animate-spin h-5 w-5 text-white'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
    >
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      ></circle>
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      ></path>
    </svg>
  </div>
);

type ButtonProps = {
  loading?: boolean;
} & React.ComponentProps<"button">;

export const SubmitButton: React.FC<ButtonProps> = ({
  loading,
  className,
  children,
  ...rest
}) => (
  <button
    type='submit'
    className={classNames(
      className,
      "relative inline-flex justify-center items-center px-4 py-2 text-sm shadow-sm rounded-md text-white border border-transparent",
      loading
        ? "font-semibold bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
        : "bg-indigo-600 font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    )}
    {...rest}
  >
    {loading && <LoadingSpin />}
    {children}
  </button>
);

export const CancelButton: React.FC<ButtonProps> = ({
  className,
  children,
  ...rest
}) => (
  <button
    type='button'
    className={classNames(
      className,
      "rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    )}
    {...rest}
  >
    {children}
  </button>
);
