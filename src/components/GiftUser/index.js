import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useDisclosure,
} from "@chakra-ui/react";
import GiftList from "../GiftList";

function GiftUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const listStorage = JSON.parse(localStorage.getItem("listStorage"));
  const [arr, setArr] = useState(listStorage);
  const [show, setShow] = useState(true);
  const [messageErr, setErr] = useState(false);
  const [lista, setLista] = useState({
    type: "",
    image: "",
    quantity: 0,
    receiver: "",
  });

  const validation = () => {
    if (!arr.some((l) => l.type === lista.type)) {
      setArr([...arr, lista]);
      setErr(false);
      setShow(false);
      // setLista({ type: "" });
    } else {
      setErr(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validation();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const { id } = e.target;

    setArr(arr.filter((index) => arr[id] !== index));
  };
  useEffect(() => {
    const arrStorage = JSON.stringify(arr);
    localStorage.setItem("listStorage", arrStorage);

    arr.length > 0 ? setShow(false) : setShow(true);
  }, [arr]);

  return (
    <Box>
      <Box display="flex" justifyContent="center" margin="7px 15px">
        <Button onClick={onOpen} colorScheme="green">
          Agregar regalos
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader />
            <ModalCloseButton />
            <ModalBody>
              <form>
                <VStack gap={2}>
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
                  <Input
                    name="receiver"
                    placeholder="Destinatario del regalo"
                    onChange={(e) => {
                      e.preventDefault();
                      const { name, value } = e.target;
                      setLista((prevState) => ({
                        ...prevState,
                        [name]: value,
                      }));
                    }}
                  ></Input>

                  <Input
                    placeholder="https://image"
                    name="image"
                    onChange={(e) => {
                      e.preventDefault(e);
                      const { name, value } = e.target;
                      setLista((prevState) => ({
                        ...prevState,
                        [name]: value,
                      }));
                    }}
                  ></Input>
                  {/* {lista.type.length === 0 && (
           
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
                    <NumberInputField width="100%" />
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
                </VStack>

                {messageErr && (
                  <Box as="p" color="red" display={messageErr}>
                    El valor ingresado ya se encuentra en el listado
                  </Box>
                )}
              </form>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Volver
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
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
                margin="20px auto"
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
