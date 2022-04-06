import React from "react";
import { Box, Progress } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box>
      <Progress margin="50px auto" w="50%" alignSelf="center" isIndeterminate />
    </Box>
  );
}
