import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import SetTitle from "../../components/set-title";
import Container from "../../components/ui/container";
import {useAppDispatch} from "../../redux/hooks";
import {changeTheme} from "../../redux/themeSlice";

const Settings = () => {
  const dispatch = useAppDispatch();
  const themes = ["base", "dark", "royal-blue", "matrix"];

  return (
    <div className="dark:bg-secondary-700 h-screen">
      <SetTitle title={`Settings`} />
      <Navbar />
      <Container>
        <h1>User Settings</h1>
        <div>
          <h3>Change your theme</h3>
          <ul className="flex items-center gap-4">
            <li
              onClick={() => dispatch(changeTheme({theme: themes[0]}))}
              className="cursor-pointer shadow-md shadow-[#f04935]/50  w-8 h-8 bg-[#f04935] rounded-full"></li>
            <li
              onClick={() => dispatch(changeTheme({theme: themes[1]}))}
              className="cursor-pointer shadow-md shadow-[#000000]/50  w-8 h-8 bg-[#000000] rounded-full"></li>
            <li
              onClick={() => dispatch(changeTheme({theme: themes[2]}))}
              className="cursor-pointer shadow-md shadow-[#3a89f7]/50  w-8 h-8 bg-[#3a89f7] rounded-full"></li>
            <li
              onClick={() => dispatch(changeTheme({theme: themes[3]}))}
              className="cursor-pointer shadow-md shadow-[#32cd37]/50  w-8 h-8 bg-[#32cd37] rounded-full"></li>
          </ul>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Settings;
