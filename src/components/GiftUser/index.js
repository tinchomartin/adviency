import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
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
import Loading from "../Loading";
import GiftList from "../GiftList";
import { api } from "../../utils/api";

function GiftUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isOpenEditar,
    onOpen: onOpenEditar,
    onClose: onCloseEditar,
  } = useDisclosure();

  // const listStorage = JSON.parse(localStorage.getItem("listStorage"));

  // const [arr, setArr] = useState(listStorage);
  const [arr, setArr] = useState([]);

  const [show, setShow] = useState(true);
  const [messageErr, setErr] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lista, setLista] = useState({
    id: "",
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
    } else {
      setErr(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id } = e.target;
    lista.id = id;
    validation();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const { id } = e.target;

    setArr(arr.filter((index) => arr[id] !== index));
  };

  const selectEditItem = (item) => {
    onOpenEditar();

    setLista({
      id: item.id,
      type: item.type,
      image: item.image,
      quantity: item.quantity,
      receiver: item.receiver,
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    for (let index = 0; index < arr.length; index++) {
      const updatedArr = [...arr];
      if (arr[index].id === lista.id) {
        arr[index].image = lista.image;
        arr[index].receiver = lista.receiver;
        arr[index].type = lista.type;
        arr[index].quantity = lista.quantity;
        setArr(updatedArr);
      }
    }
  };

  useEffect(() => {
    api
      .gifts()
      .then((arr) => setArr(arr.data))
      .catch(console.log)
      .finally(() => setLoading(false));
    // const arrStorage = JSON.stringify(arr);
    // localStorage.setItem("listStorage", arrStorage);
    // console.log(arrStorage);
  }, []);

  useEffect(() => {
    api.save(arr).then(console.log).catch(console.log).catch(console.log);
    arr.length > 0 || loading === true ? setShow(false) : setShow(true);
  }, [arr, loading]);

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
                    // value={lista.type !== "" ? lista.type : ""}
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
                    // value={lista.receiver !== "" ? lista.receiver : ""}
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
                    // value={lista.image !== "" ? lista.image : ""}
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
                    defaultValue={0}
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
                    id={uuidv4()}
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

        <Modal isOpen={isOpenEditar} onClose={onCloseEditar}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader />
            <ModalCloseButton />
            <ModalBody>
              <form>
                <VStack gap={2}>
                  <Input
                    name="type"
                    value={lista.type !== "" ? lista.type : ""}
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
                    value={lista.receiver !== "" ? lista.receiver : ""}
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
                    value={lista.image !== "" ? lista.image : ""}
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
                    value={lista.quantity !== 0 ? lista.quantity : 0}
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
                    onClick={handleEdit}
                    // id={lista.uid}
                    type="submit"
                    bg="red"
                    p="0 20px"
                    size="md"
                    color="white"
                    _hover={{ bg: "green" }}
                    isDisabled={lista.type === "" ? true : false}
                  >
                    Editar
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
              <Button colorScheme="blue" mr={3} onClick={onCloseEditar}>
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
        {loading && <Loading />}
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

                <Button
                  colorScheme="blue"
                  onClick={() => selectEditItem(item, i)}
                >
                  E
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
