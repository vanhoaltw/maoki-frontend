import { Burger } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";

const navItemStyle = `block py-2 pl-3 pr-4 text-secondary-900 rounded hover:bg-secondary-100 md:hover:bg-transparent md:hover:text-primary-500 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-secondary-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-secondary-800`;
const navItemStyleActive = `block py-2 pl-3 pr-4 text-white bg-primary-500 rounded md:bg-transparent md:text-primary-500 md:p-0 md:dark:text-primary-500`;

const NavMain = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <>
      <Burger
        onClick={() => setToggleMenu(!toggleMenu)}
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-secondary-500 rounded-lg md:hidden hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-secondary-200 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:focus:ring-secondary-600"
      />
      {/* <button
        onClick={() => setToggleMenu(!toggleMenu)}
        data-collapse-toggle="navbar-user"
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-secondary-500 rounded-lg md:hidden hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-secondary-200 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:focus:ring-secondary-600"
        aria-controls="navbar-user"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button> */}

      <div
        className={`${
          toggleMenu || "hidden"
        } items-center justify-between w-full md:flex md:w-auto md:order-1`}
        id="navbar-user"
      >
        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-secondary-100 rounded-lg bg-secondary-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-secondary-800 md:dark:bg-secondary-700 dark:border-secondary-800">
          <li>
            <Link
              to="/"
              className={
                location.pathname === "/" ? navItemStyleActive : navItemStyle
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/hotel"
              className={
                location.pathname === "/hotel"
                  ? navItemStyleActive
                  : navItemStyle
              }
            >
              Hotel
            </Link>
          </li>
          <li>
            <Link
              to="/blogs"
              className={
                location.pathname === "/blogs"
                  ? navItemStyleActive
                  : navItemStyle
              }
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={
                location.pathname === "/about"
                  ? navItemStyleActive
                  : navItemStyle
              }
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact-us"
              className={
                location.pathname === "/contact-us"
                  ? navItemStyleActive
                  : navItemStyle
              }
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavMain;
