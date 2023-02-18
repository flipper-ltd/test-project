import React, { useState } from "react";
import { classNames } from "@/utils";
import { Bars4Icon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import CreateFile from "@/components/file/CreateFile";
import FilesList from "./FilesList";

const navigation = [
  { name: "Files", href: "#", icon: Bars4Icon, current: true },
  { name: "Settings", href: "#", icon: Cog8ToothIcon, current: false },
];

type OperationState = {
  create: boolean;
  data?: {};
};

const initialState: OperationState = {
  create: false,
  data: undefined,
};

const Home: React.FC = () => {
  const [state, setState] = useState<OperationState>(() => initialState);

  return (
    <div className='lg:grid lg:grid-cols-12 lg:gap-x-5'>
      <aside className='py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0'>
        <nav className='space-y-1'>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-gray-50 text-indigo-700 hover:text-indigo-700 hover:bg-white"
                  : "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
                "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              <item.icon
                className={classNames(
                  item.current
                    ? "text-indigo-500 group-hover:text-indigo-500"
                    : "text-gray-400 group-hover:text-gray-500",
                  "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                )}
                aria-hidden='true'
              />
              <span className='truncate'>{item.name}</span>
            </a>
          ))}
        </nav>
      </aside>

      <div className='space-y-6 sm:px-6 lg:col-span-9 lg:px-0'>
        {state.create && (
          <CreateFile onClose={() => setState(() => initialState)} />
        )}
        <FilesList
          create={() => setState(() => ({ ...initialState, create: true }))}
        />
      </div>
    </div>
  );
};

export default Home;
