import React, { PropsWithChildren } from "react";
import { classNames } from "@/utils";
import { Bars4Icon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  NavigationName,
  setNavigation,
} from "@/features/navigation/navigationSlice";

type NavigationItem = {
  name: NavigationName;
  href: string;
  current: boolean;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const navigationLists = [
  { name: NavigationName.FILES, href: "#", icon: Bars4Icon, current: true },
  {
    name: NavigationName.SETTINGS,
    href: "#",
    icon: Cog8ToothIcon,
    current: false,
  },
];

const Container: React.FC<PropsWithChildren> = ({ children }) => {
  const navigation = useAppSelector((state) => state.navigation);
  const dispatch = useAppDispatch();

  function handleNavigationChange(
    e: React.MouseEvent<HTMLAnchorElement>,
    current: NavigationItem
  ) {
    e.preventDefault();
    dispatch(setNavigation(current.name));
  }

  return (
    <div className='lg:grid lg:grid-cols-12 lg:gap-x-5'>
      <aside className='py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0'>
        <nav className='space-y-1'>
          {navigationLists.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                navigation?.name === item.name
                  ? "bg-gray-50 text-indigo-700 hover:text-indigo-700 hover:bg-white"
                  : "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
                "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
              )}
              aria-current={navigation?.name === item.name ? "page" : undefined}
              onClick={(e) => handleNavigationChange(e, item)}
            >
              <item.icon
                className={classNames(
                  navigation?.name === item.name
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

      <div className='space-y-6 sm:px-6 lg:col-span-9 lg:px-0'>{children}</div>
    </div>
  );
};

export default Container;
