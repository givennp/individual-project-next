import { useSelector } from "react-redux";
import {
  Box,
  Img,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Image,
  useToast,
} from "@chakra-ui/react";
import { axiosInstance } from "../../../configs/api";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from "yup";

const MyPost = () => {
  const [userPost, setUserPost] = useState([]);
  const [editPostId, setEditPostId] = useState(0);
  const userSelector = useSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      newCaption: "",
      newLocation: "",
    },
    validationSchema: Yup.object().shape({
      newCaption: Yup.string().max(70),
      newLocation: Yup.string().max(20),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      const editedPost = {
        caption: values.newCaption,
        location: values.newLocation,
      };
      await axiosInstance.patch(`/posts/${editPostId}`, editedPost);
      formik.setSubmitting(false);
      // toast({
      //   position: "bottom",
      //   render: () => (
      //     <Box color="white" bg="green" borderRadius="5px" p={3}>
      //       <Text background="green">Edit post Success</Text>
      //       <Icon
      //         backgroundColor="green"
      //         color="green"
      //         as={BsFillCheckCircleFill}
      //       />
      //     </Box>
      //   ),
      // });
      onCloseEdit();
    },
  });

  const fetchPost = () => {
    axiosInstance
      .get("/posts", {
        params: {
          userId: userSelector.id,
        },
      })
      .then((res) => {
        setUserPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = async (postId) => {
    await axiosInstance.delete(`/posts/${postId}`);
    fetchPost();
  };

  const editPost = async (postId) => {
    await axiosInstance.patch(`/posts/${postId}`);
    fetchPost();
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const openModal = (postId) => {
    onOpenEdit();
    setEditPostId(postId);
  };

  const renderPost = () => {
    return userPost.map((val) => {
      return (
        <Box padding="8px">
          <Img boxSize="230px" objectFit="cover" src={val.image_url} />
          <Icon margin="5px" color="black" onClick={onOpen} as={MdDelete} />
          <Icon
            margin="5px"
            color="black"
            onClick={() => openModal(val.id)}
            as={FiEdit}
          />
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontSize="24px" fontWeight="600">
                Delete
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody fontWeight="500">
                Are you sure? this process cannot be undone
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="red"
                  onClick={() => deletePost(val.id)}
                  margin={3}
                >
                  Yes
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* edit post */}
          <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontSize="24px" fontWeight="600">
                Edit
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody fontWeight="500">
                <Stack spacing={8}>
                  <FormControl>
                    <FormLabel htmlFor="inputNewCaption">Caption</FormLabel>
                    <Input
                      id="inputNewCaption"
                      onChange={(event) =>
                        formik.setFieldValue("newCaption", event.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="inputNewLocation">Location</FormLabel>
                    <Input
                      id="inputNewLocation"
                      onChange={(event) =>
                        formik.setFieldValue("newLocation", event.target.value)
                      }
                    />
                  </FormControl>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="green"
                  onClick={formik.handleSubmit}
                  margin={3}
                >
                  Yes
                </Button>
                <Button onClick={onCloseEdit}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      );
    });
  };

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap">
      {renderPost()}
    </Box>
  );
};

export default MyPost;
