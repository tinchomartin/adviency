import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import GiftUser from "../GiftUser";

function GiftContainer() {
  return (
    <Box
      w="500px"
      minHeight="400px"
      backgroundColor="#ffffff"
      textAlign="center"
      borderRadius="50px"
    >
      <Heading as="h1" color="black">
        Regalos
      </Heading>

      <GiftUser />
    </Box>
  );
}

export default GiftContainer;
