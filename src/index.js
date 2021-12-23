import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { theme } from "./utils/theme";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      {/* <ColorModeScript /> */}

      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
