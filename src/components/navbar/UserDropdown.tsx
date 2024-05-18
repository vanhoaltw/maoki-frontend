import { Avatar, Button, Menu, UnstyledButton } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";
import { logout } from "../../redux/authSlice";

const UserDropdown = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  if (!user?._id)
    return (
      <Link to="/signin">
        <Button className="bg-[#824a39] text-white">Sign In</Button>
      </Link>
    );

  return (
    <Menu position="bottom-end" withArrow arrowOffset={18}>
      <Menu.Target>
        <UnstyledButton>
          <Avatar src={user?.photoURL} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>
          <span className="block text-sm text-secondary-900 dark:text-white">
            {user?.name}
          </span>
          <span className="block text-sm  text-secondary-500 truncate dark:text-secondary-400">
            {user?.email}
          </span>
        </Menu.Label>
        <Link to="/dashboard">
          <Menu.Item>Dashboard</Menu.Item>
        </Link>
        <Menu.Divider />
        <Menu.Item onClick={() => dispatch(logout())}>Sign Out</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserDropdown;
