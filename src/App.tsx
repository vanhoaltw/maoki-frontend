import { ReactNode, useEffect } from "react";
import { setLoading, setUser } from "./redux/authSlice";
import { axios } from "./api";
import { useAppDispatch } from "./redux/hooks";

type AppProps = {
  children: ReactNode;
};

const App: React.FC<AppProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const isUser = localStorage.getItem("user");
    if (isUser) {
      dispatch(setUser({ user: JSON.parse(isUser) }));
      dispatch(setLoading(false)); // Dispatch the action to set loading to false
      return;
    }

    const bearer = `Bearer ${token}`;
    if (token) {
      dispatch(setLoading(true)); // Dispatch the action to set loading to true
      axios
        .get("user", {
          headers: {
            Authorization: bearer,
          },
        })
        .then(({ data }) => {
          dispatch(setUser({ user: data }));
          dispatch(setLoading(false)); // Dispatch the action to set loading to false
        })
        .catch(() => dispatch(setLoading(false))); // Dispatch the action to set loading to false
      return;
    }
    dispatch(setLoading(false));
  }, [token, dispatch]); // Add dispatch as a dependency

  return children;
};

export default App;
