import React from 'react';
import Link from 'next/link';

import { useLocalStorage } from 'utils/hooks';

const navLinks = [
  {
    title: 'Dashboard',
    link: '/dashboard',
    active: true,
  },
];

const Sidebar = () => {
  const [userData] = useLocalStorage('userData', null);

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-gray-50 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="px-6 py-4 -mx-6 text-center">
          <a href="https://dock.io" target="_blank" title="home" rel="noreferrer">
            <img
              src="/docklogo.svg"
              className="w-20"
              alt="dock logo" />
          </a>
        </div>
        <div className="mt-8 text-center">
          {Boolean(userData) && (
            <img
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
              alt=""
              className="object-cover w-10 h-10 m-auto rounded-full lg:w-16 lg:h-16"
            />
          )}
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {userData ? 'Alice Doe' : 'Guest User'}
          </h5>
        </div>
        <ul className="mt-8 space-y-2 tracking-wide">
          {navLinks.map((link) => (
            <li key={link.link}>
              <Link href={link.link} passHref>
                <a
                  aria-label="dashboard"
                  className={`relative px-3 py-2 flex items-center space-x-4 rounded-md transition duration-300${link.active ? ' text-gray-600 bg-gray-200' : ''}`}>
                  <span className="-mr-1 font-medium">{link.title}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
