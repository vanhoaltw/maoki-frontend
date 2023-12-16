import { Link, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  DashboardNavAdmin,
  DashboardNavCustomer,
  DashboardNavManager,
} from "./dashboard-nav";
import {
  BiLogoBlogger,
  BiSolidBookBookmark,
  BiSolidDashboard,
} from "react-icons/bi";
import { FaSignOutAlt, FaHome } from "react-icons/fa";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import ROLE from "../../constants/ROLE";
import { logout } from "../../redux/authSlice";
import swal from "sweetalert";
import { useState } from "react";
import { Avatar } from "@mantine/core";

const Dashboard = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleSignOut = () => {
    swal({
      title: "Are you sure you want to log out?",
      buttons: ["CANCEL", "LOG OUT"],
    }).then((confirm) => {
      if (confirm) {
        dispatch(logout());
      }
    });
  };

  const itemStyle = `flex cursor-pointer items-center p-2 text-secondary-900 rounded-lg dark:text-white hover:bg-secondary-100 dark:hover-bg-secondary-700 group`;

  const itemActiveStyle = `flex items-center p-2 text-secondary-900 rounded-lg dark:text-white hover:bg-primary-300 dark:hover-bg-secondary-700 group text-primary-500 bg-primary-200 dark:bg-primary-700`;

  const iconStyle =
    "flex-shrink-0 w-5 h-5 text-secondary-500 transition duration-75 dark:text-secondary-400 group-hover:text-secondary-900 dark:group-hover:text-white";

  return (
    <>
      <button
        onClick={() => setToggleMenu(!toggleMenu)}
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className={`${
          toggleMenu ? "block ml-auto" : "ml-3 inline-flex"
        } items-center p-2 mt-2 text-sm text-secondary-500 rounded-lg sm:hidden hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-secondary-200 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:focus:ring-secondary-600`}
      >
        <span className="sr-only">Open sidebar</span>
        <AiOutlineAlignLeft className="w-6 h-6" />
      </button>

      <aside
        id="logo-sidebar"
        className={`${
          toggleMenu ? "" : "-translate-x-full"
        } fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-secondary-50 dark:bg-secondary-800">
          <div className="flex items-center pl-2.5 mb-5 gap-2">
            <Avatar src={user?.photoURL} size={40} />
            <div>
              <strong>{user.name}</strong>
              <p className="text-slate-400 text-xs">{user?.email}</p>
            </div>
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/dashboard"
                className={
                  location.pathname === "/dashboard"
                    ? itemActiveStyle
                    : itemStyle
                }
              >
                <BiSolidDashboard className={iconStyle} />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>

            <DashboardNavCustomer />
            <DashboardNavManager />
            {user.role === ROLE.ADMIN && <DashboardNavAdmin />}
            <hr />
            <li>
              <Link
                to={"/dashboard/profile"}
                className={
                  location.pathname === "/dashboard/profile"
                    ? itemActiveStyle
                    : itemStyle
                }
              >
                <CgProfile className={iconStyle} />
                <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/blogs"}
                className={
                  location.pathname === "/dashboard/blogs"
                    ? itemActiveStyle
                    : itemStyle
                }
              >
                <BiLogoBlogger className={iconStyle} />
                <span className="flex-1 ml-3 whitespace-nowrap">Blogs</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/bookmark"}
                className={
                  location.pathname === "/dashboard/bookmark"
                    ? itemActiveStyle
                    : itemStyle
                }
              >
                <BiSolidBookBookmark className={iconStyle} />
                <span className="flex-1 ml-3 whitespace-nowrap">Bookmark</span>
              </Link>
            </li>

            <hr />

            <li>
              <Link to={"/"} className={itemStyle}>
                <FaHome className={iconStyle} />
                <span className="flex-1 ml-3 whitespace-nowrap">Home</span>
              </Link>
            </li>
            <li>
              <a onClick={handleSignOut} className={itemStyle}>
                <FaSignOutAlt className={iconStyle} />
                <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
