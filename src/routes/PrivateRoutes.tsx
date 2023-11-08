import Payment from "../pages/payment";
import Dashboard from "../pages/dashboard";
import ProfileDashboard from "../pages/dashboard/profile-dashboard";
import Settings from "../pages/settings";
import PrivateProtector from "./PrivateProtector";
import { Wishlist } from "../pages/dashboard/customer";
import Profile from "../pages/profile";
import BlogsDashboard from "../pages/dashboard/blogs-dashboard";
import HomeDashboard from "../pages/dashboard/home-dashboard";
import PaymentHistory from "../pages/dashboard/customer/payment-history/PaymentHistory";

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
    path: "/payment/:_id",
    element: <Payment />,
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
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
      {
        path: "blogs",
        element: <BlogsDashboard />,
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
