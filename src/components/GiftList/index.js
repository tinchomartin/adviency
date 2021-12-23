import React from "react";
import { UnorderedList, ListItem } from "@chakra-ui/react";
// import GiftDelete from "../GiftDelete";

function GiftList(props) {
  const { gift } = props;

  return (
    <UnorderedList styleType="none">
      <ListItem fontSize={24}>{gift.type}</ListItem>

      {/* <ListItem>{gift.quantity}</ListItem> */}
    </UnorderedList>
  );
}

export default GiftList;
