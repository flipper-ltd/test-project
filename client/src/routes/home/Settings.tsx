import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFormState } from "react-hook-form";
import { Setting } from "@/types/setting.schema";
import {
  useCreateSettingMutation,
  useGetSettingsQuery,
} from "@/features/settings/settingsApiSlice";
import { SubmitButton } from "@/components/Button";

// prettier-ignore
export const schema = yup.object().shape({
  downloadLimit: yup.number().integer().positive().default(0).label('Download limit').required(),
  uploadLimit: yup.number().integer().positive().default(0).label('Upload limit').required(),
})

const Settings: React.FC = () => {
  const { data, refetch } = useGetSettingsQuery();
  const { register, control, handleSubmit, setValue } = useForm<Setting>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });
  const { errors } = useFormState({ control });

  const [mutate, { isLoading, isSuccess }] = useCreateSettingMutation();

  function onSubmit(data: Setting) {
    mutate(data).then(() => {
      refetch();
    });
  }

  useEffect(() => {
    if (data && data?.downloadLimit !== undefined) {
      setValue("downloadLimit", data.downloadLimit);
      setValue("uploadLimit", data.uploadLimit);
    }
  }, [data, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                htmlFor='download-limit'
                className='block text-sm font-medium text-gray-700'
              >
                Download limit
              </label>
              <input
                id='download-limit'
                type='number'
                pattern='[0-9]*'
                defaultValue={0}
                {...register("downloadLimit")}
                className='mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
              />
              {errors.downloadLimit && (
                <p className='mt-1 text-sm text-danger-600'>
                  {errors.downloadLimit?.message?.split(",")[0]}
                </p>
              )}
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <label
                htmlFor='upload-limit'
                className='block text-sm font-medium text-gray-700'
              >
                Upload limit
              </label>
              <input
                id='upload-limit'
                type='number'
                pattern='[0-9]*'
                defaultValue={0}
                {...register("uploadLimit")}
                className='mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
              />
              {errors.uploadLimit && (
                <p className='mt-1 text-sm text-danger-600'>
                  {errors.uploadLimit?.message?.split(",")[0]}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
          <SubmitButton loading={isLoading}>
            {isLoading ? "Saving..." : isSuccess ? "Saved" : "Save"}
          </SubmitButton>
        </div>
      </div>
    </form>
  );
};

export default Settings;
