import React from "react";
import { Box } from "@chakra-ui/react";
import GiftContainer from "./components/GiftContainer";
function App() {
  return (
    <Box
      minH="100vh"
      backgroundImage="url('https://png.pngtree.com/background/20210715/original/pngtree-merry-christmas-wood-plank-texture-background-picture-image_1266178.jpg')"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <GiftContainer />
    </Box>
  );
}

export default App;
