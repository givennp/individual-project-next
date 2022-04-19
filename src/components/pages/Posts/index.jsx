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
import axiosInstance from "../../../configs/api";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserPost from "../../UserPost";

const MyPost = () => {
  const [userPost, setUserPost] = useState([]);
  const userSelector = useSelector((state) => state.auth);

  const fetchPost = async () => {
    try {
      const res = await axiosInstance.get("/posts", {
        params: {
          user_id: userSelector.id,
          _sortBy: "id",
          _sortDir: "DESC",
        },
      });

      setUserPost(res.data.result.rows);
    } catch (err) {
      console.log(err);
    }
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
        <UserPost
          fetchPost={fetchPost}
          image_url={val?.image_url}
          caption={val.caption}
          location={val.location}
          postId={val?.id}
          key={val?.id?.toString()}
        />
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
