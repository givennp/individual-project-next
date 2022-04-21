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
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import axiosInstance from "../configs/api";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"

const UserPost = ({ image_url, postId, fetchPost, caption, location }) => {
  const [editPostId, setEditPostId] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

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
        onCloseEdit();
      },
    });

  const openEditModal = (postId) => {
    onOpenEdit();
    setEditPostId(postId);
  };

  const openDeleteModal = (postId) => {
    onOpen();
    // deletePost(postId)
  };
  const deletePost = async (postId) => {
    await axiosInstance.delete(`/posts/${postId}`);
    onClose()
    fetchPost()
  };

  return (
    <Box padding="7px" pt="15px">
      <Img boxSize="170px" objectFit="cover" src={image_url} />
      <Icon
        margin="5px"
        color="black"
        onClick={() => openDeleteModal(postId)}
        as={MdDelete}
        boxSize={4}
      />
      <Icon
        margin="5px"
        color="black"
        onClick={() => openEditModal(postId)}
        as={FiEdit}
        boxSize={4}
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
              onClick={() => deletePost(postId)}
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
                  defaultValue={caption}
                  id="inputNewCaption"
                  onChange={(event) =>
                    formik.setFieldValue("newCaption", event.target.value)
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="inputNewLocation">Location</FormLabel>
                <Input
                  defaultValue={location}
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
};

export default UserPost;
