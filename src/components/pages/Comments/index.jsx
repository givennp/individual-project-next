import {
  Box,
  Center,
  defaultStandaloneParam,
  Flex,
  Img,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../../../configs/api";

const MyComments = () => {
  const [userComments, setUserComments] = useState([]);
  const userSelector = useSelector((state) => state.auth);

  const fetchComments = async () => {
    try {
      const res = await axiosInstance.get("/comments", {
        params: {
          user_id: userSelector.id,
        },
      });
      setUserComments(res.data.result.rows);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const renderComments = () => {
    return userComments.map((comment) => {
      return (
        <Flex
          p={8}
          maxW="800px"
          justifyContent="space-between"
          borderBottom="1px solid black"
        >
          <Text maxW="400px" fontSize="24px">
            {comment.content}
          </Text>
          <Spacer/>
          <Img
            src={comment?.Post?.image_url}
            boxSize="100px"
            objectFit="cover"
          />
        </Flex>
      );
    });
  };

  return <Box width="100%">{renderComments()}</Box>;
};

export default MyComments;
