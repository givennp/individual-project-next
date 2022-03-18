import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContentCard from "../../components/ContentCard";
import axios from "axios";
import {
  Box,
  Button,
  Text,
  Center,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
} from "@chakra-ui/react";
import { axiosInstance } from "../../configs/api";
import user_types from "../../redux/reducers/types/user";
import { useRouter } from "next/dist/client/router";
import { useDisclosure } from "@chakra-ui/react";

const Upload = () => {
    const [inputImage, setInputImage] = useState("")
    const [inputCaption, setInputCaption] = useState("")
    const [inputLocation, setInputLocation] = useState("")

    const userSelector = useSelector((state) => state.auth)

    const inputImgHandler = (event) => {
        const { value } = event.target

        setInputImage(value)
    }

    const inputCaptionHandler = (event) => {
      const { value } = event.target;

      setInputCaption(value);
    };

    const inputLocationHandler = (event) => {
      const { value } = event.target;

      setInputLocation(value);
    };

    const postButtonHandler = () => {
        const newPost = {
            userId: userSelector.id,
            location : inputLocation,
            caption : inputCaption,
            numbers_of_likes: 0,
            image_url: inputImage
        }

        axiosInstance.post("/posts", newPost)
    }

  return (
    <Box>
      <Input onChange={inputImgHandler} placeholder="img url" />
      <Input onChange={inputCaptionHandler} placeholder="caption" />
      <Input onChange={inputLocationHandler} placeholder="location" />
      <Button onClick={()=>postButtonHandler()} colorScheme="green">post</Button>
    </Box>
  );
};

export default Upload;
