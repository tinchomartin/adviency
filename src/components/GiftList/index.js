import React from "react";
import { Box, Image } from "@chakra-ui/react";
// import GiftDelete from "../GiftDelete";

function GiftList(props) {
  const { gift } = props;

  return (
    <Box display="grid" gridTemplateColumns={"50px auto"} gridGap={2}>
      <Image src={gift.image} alt="Image's gift"></Image>
      <Box display="grid" gridTemplateRows={"auto auto"}>
        <Box as="p" color="black" fontSize={24}>
          {gift.type}
        </Box>
        <Box as="p" color="black" fontSize={12} textAlign="left">
          {gift.receiver}
        </Box>
      </Box>
    </Box>
  );
}

export default GiftList;
