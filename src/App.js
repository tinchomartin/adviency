import React from "react";
import { Box } from "@chakra-ui/react";
import GiftContainer from "./components/GiftContainer";
function App() {
  return (
    <Box
      minH="100vh"
      backgroundImage="url('https://paintbynumberscanvas.com/wp-content/uploads/2020/05/CHENISTORY-cadre-photo-de-no-l-peinture-la-main-par-num-ros-cadeau-moderne-mur-Art-2.jpg_640x640_6869b9a0-ef41-4a5b-af8f-c93c34fb1207-2.jpg')"
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
