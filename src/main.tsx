import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import { MantineProvider } from "@mantine/core";

import "./index.css";
import "@mantine/core/styles.css";
import "react-tooltip/dist/react-tooltip.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import '@mantine/dates/styles.css';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <HelmetProvider>
      <Provider store={store}>
        <MantineProvider>
          <App>
            <RouterProvider router={router} />
            <Toaster position="top-center" />
          </App>
        </MantineProvider>
      </Provider>
    </HelmetProvider>
  </React.Fragment>
);
