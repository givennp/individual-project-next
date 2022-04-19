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

const postDetailPage = ({ postDetailData }) => {
  const [comment, setComment] = useState([]);
  const [page, setPage] = useState(1);

  const fetchComments = async () => {
    try {
      const res = await axiosInstance.get(`/comments`, {
        params: {
          post_id: postDetailData.id,
          _page: page,
          _limit: 3,
        },
      });

      setComment([...comment, ...res.data.result.rows]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [page]);

  const fetchNextComments = () => {
    setPage(page + 1);
  };

  const renderComments = () => {
    return comment.map((val) => {
      return (
        <Box
          w="200px"
          margin="10px"
          borderBottom="1px solid grey"
          paddingX="5px"
        >
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

          <Img maxW="700px" minW="500px" src={postDetailData.image_url} />
        </Box>
        <Box pl="10px">
          <Text fontSize="32px" fontWeight="bold" margin="20px">
            Comments
          </Text>
          <Box height="420px" overflowY={comment.length > 6? "scroll" : "none"}>
            {renderComments()}
          </Box>
          <Text
            onClick={fetchNextComments}
            sx={{
              _hover: {
                cursor: "pointer",
              },
            }}
          >
            See more...
          </Text>
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

    return {
      props: {
        postDetailData: res.data.result.rows[0],
        // Comments: res.data.result.rows[0].Comments,
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
