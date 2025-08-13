// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import { RouterProvider } from "react-router-dom";
// import { router } from "./routes";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import 'react-phone-input-2/lib/style.css';

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//      <RouterProvider router={router} />
//   </React.StrictMode>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import 'react-phone-input-2/lib/style.css';

import RootApp from "./RootApp";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);
