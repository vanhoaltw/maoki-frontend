import Payment from "../pages/payment";
import Dashboard from "../pages/dashboard";
import ProfileDashboard from "../pages/dashboard/profile-dashboard";
import Settings from "../pages/settings";
import PrivateProtector from "./PrivateProtector";
import { Wishlist } from "../pages/dashboard/customer";
import Profile from "../pages/profile";
import BlogsDashboard from "../pages/dashboard/blogs-dashboard";
import HomeDashboard from "../pages/dashboard/home-dashboard";
import BookingHistory from "../pages/dashboard/customer/booking-history/BookingHistory";
import Bookmark from "../pages/dashboard/blogs-dashboard/bookmark";
import SingleBlog from "../pages/blogs/SingleBlog";
import Failed from "../pages/payment/utitlies/Failed";
import Cancelpage from "../pages/payment/utitlies/Cancelpage";
import Success from "../pages/payment/utitlies/Success";
import { BookingHistoryManager, HotelManager } from "../pages/dashboard/manager";
import HotelDetail from "../pages/dashboard/manager/hotel/[id]";

const routes = [
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/profile/:_id",
    element: <Profile />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/payment/success/:transactionId",
    element: <Success />,
  },
  {
    path: "/payment/fail",
    element: <Failed />,
  },
  {
    path: "/payment/cancel",
    element: <Cancelpage />,
  },
  {
    path: "/blogs/:_id",
    element: <SingleBlog />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <HomeDashboard />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "BookingHistory",
        element: <BookingHistory />,
      },
      {
        path: "hotel",
        element: <HotelManager />,
      },
      {
        path: "hotel/:id",
        element: <HotelDetail />,
      },
      {
        path: "booking-history",
        element: <BookingHistoryManager />,
      },
      {
        path: "blogs",
        element: <BlogsDashboard />,
      },
      {
        path: "bookmark",
        element: <Bookmark />,
      },
      {
        path: "profile",
        element: <ProfileDashboard />,
      },
    ],
  },
];

const PrivateRoutes = routes.map((route) => ({
  ...route,
  element: <PrivateProtector>{route.element}</PrivateProtector>,
}));

export default PrivateRoutes;
