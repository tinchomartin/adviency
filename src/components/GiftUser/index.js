import React from "react";
import { useState } from "react";
import {
  HStack,
  VStack,
  Input,
  Box,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import GiftList from "../GiftList";

function GiftUser() {
  const [lista, setLista] = useState({
    type: "",
    quantity: 0,
    owner: "",
  });

  const [arr, setArr] = useState([]);
  const [show, setShow] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    setArr([...arr, lista]);
    setShow(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const { id } = e.target;

    setArr(arr.filter((index) => arr[id] !== index));
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center" margin="7px 15px">
        <form>
          {/* <FormControl isInvalid={lista.type.length === 0}> */}
          <VStack gap={10}>
            <HStack spacing={3}>
              <Input
                name="type"
                size="md"
                placeholder="Ingrese el regalo..."
                onChange={(e) => {
                  e.preventDefault();
                  const { name, value } = e.target;
                  setLista((prevState) => ({
                    ...prevState,
                    [name]: value,
                  }));
                }}
              />
              {/* {lista.type.length === 0 && (
                  <FormErrorMessage>No puede estar vacío</FormErrorMessage>
                )} */}
              <NumberInput
                value={lista.quantity}
                max={20}
                min={0}
                onChange={(quantity) => {
                  setLista((prevState) => ({
                    ...prevState,
                    quantity: quantity,
                  }));
                }}
              >
                <NumberInputField size="md" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <Button
                onClick={handleSubmit}
                type="submit"
                bg="red"
                p="0 20px"
                size="md"
                color="white"
                _hover={{ bg: "green" }}
                isDisabled={lista.type === "" ? true : false}
              >
                Agregar
              </Button>
            </HStack>
          </VStack>
          {/* </FormControl> */}
        </form>
      </Box>
      <Box>
        {show && (
          <Box as="p" display={show}>
            Esta lista esta vacía, agregame regalos
          </Box>
        )}

        {arr &&
          arr.map((item, i) => {
            return (
              <Box
                key={i}
                display="flex"
                justifyContent="space-between"
                width="75%"
                margin="7px auto"
              >
                <GiftList gift={item} />
                <Button
                  bgColor="red"
                  color="white"
                  id={i}
                  onClick={handleDelete}
                >
                  X
                </Button>
              </Box>
            );
          })}
      </Box>
      <Button
        bgColor="red"
        color="white"
        m={12}
        onClick={(e) => {
          e.preventDefault();
          setArr([]);
          setShow(true);
        }}
      >
        Limpiar lista
      </Button>
    </Box>
  );
}

export default GiftUser;
