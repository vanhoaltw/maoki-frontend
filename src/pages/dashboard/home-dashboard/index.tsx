import SetTitle from "../../../components/set-title";
import ROLE from "../../../constants/ROLE";
import {useAppSelector} from "../../../redux/hooks";
import AdminHomeDashboard from "./AdminHomeDashboard";
import CustomerHomeDashboard from "./CustomerHomeDashboard";
import ManagerHomeDashboard from "./ManagerHomeDashboard";

const HomeDashboard = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <>
      <SetTitle title={`${user?.name} | Dashboard`} />
      {/* <h1>HomeDashboard</h1> */}
      <CustomerHomeDashboard />
      <ManagerHomeDashboard />
      {user.role === ROLE.ADMIN && <AdminHomeDashboard />}
    </>
  );
};

export default HomeDashboard;
