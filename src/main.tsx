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

import "swiper/css/pagination";
import "swiper/css/navigation";
import "react-tooltip/dist/react-tooltip.css";
import "./index.css";
import "@mantine/dates/styles.css";
import "@mantine/core/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <HelmetProvider>
      <Provider store={store}>
        <MantineProvider
          defaultColorScheme="light"
          theme={{
            fontFamily: "Open Sans, sans-serif",
            primaryColor: "band",
            // primaryColor: "bright-pink",
            colors: {
              "band": [
                "#824a39",
                "#e6dbd7",
                "#dac9c4",
                "#cdb7b0",
                "#c1a59c",
                "#b49288",
                "#824a39",
                "#824a39",
                "#824a39",
                "#824a39",
              ],
            },
          }}
        >
          <App>
            <RouterProvider router={router} />
            <Toaster position="top-center" />
          </App>
        </MantineProvider>
      </Provider>
    </HelmetProvider>
  </React.Fragment>
);
