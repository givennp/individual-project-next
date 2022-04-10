import {
  Avatar,
  defaultStandaloneParam,
  Text,
  Box,
  Center,
  Icon,
  Image,
  Flex,
  Img,
  Spacer,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { IconBase } from "react-icons/lib";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../../configs/api";
import { useRouter } from "next/router";
import requiresAuth from "../../components/requiresAuth";
import axios from "axios";

const postDetailPage = ({ postDetailData, Comments }) => {
  const renderComments = () => {
    return Comments.map((val) => {
      return (
        <Box margin="10px" borderBottom="1px solid grey" paddingX="5px">
          <Text fontWeight="semibold" textDecoration="underline">
            {val.User?.username}
          </Text>
          <Text>{val.content}</Text>
        </Box>
      );
    });
  };

  return (
    <Box color="white">
      <Flex bg="black" p="10px">
        <Box>
          <Flex>
            <Img boxSize={10} src={postDetailData.post_user.avatar} />
            <Spacer />
          </Flex>
          <Text fontSize="32px" fontWeight="bold">
            {postDetailData.caption}
          </Text>

          <Img maxW="700px" src={postDetailData.image_url} />
        </Box>
        <Box pl="10px">
          <Text
            fontSize="32px"
            fontWeight="bold"
            margin="20px"
          >
            Comments
          </Text>
          {renderComments()}
        </Box>
      </Flex>
    </Box>
  );
};

export const getServerSideProps = requiresAuth(async (context) => {
  // Dapetin route params
  // Fetch user profile based on ID dari route params
  // passing data lewat props

  try {
    const id = context.params.postDetail;
    const authToken = context.req.cookies.auth_token;

    const res = await axios.get(`http://localhost:2000/posts/`, {
      params: {
        id,
      },
      headers: {
        authorization: authToken,
      },
    });

    console.log(res.data.result.rows[0]);

    return {
      props: {
        postDetailData: res.data.result.rows[0],
        Comments: res.data.result.rows[0].Comments,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        postDetailData: null,
      },
    };
  }
});

export default postDetailPage;
