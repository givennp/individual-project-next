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
  Stack,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { IconBase } from "react-icons/lib";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../../configs/api";
import { useRouter } from "next/router";
import requiresAuth from "../../components/requiresAuth";
import axios from "axios";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { WEB_URL } from "../../configs/url";
import Page from "../../components/page";
import {BiCopy} from "react-icons/bi"

const postDetailPage = ({ postDetailData }) => {
  const [comment, setComment] = useState([]);
  const [page, setPage] = useState(1);

  const router = useRouter();

  const toast = useToast()

  

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

  const copyLinkBtnHandler = () => {
    navigator.clipboard.writeText(
      `https://yellow-otter-20.loca.lt${router.asPath}`
    );

    toast({
      position: "top-right",
      status: "info",
      title: "Link copied",
    });
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
    <Page
      title={`${postDetailData?.post_user?.username}'s Post`}
      description={postDetailData?.caption}
      image={postDetailData?.image_url}
      url={`${WEB_URL}${router.asPath}`}
    >
      <Box bg="black" color="white">
        <Flex p="10px">
          <Box>
            <Flex>
              <Img boxSize={10} src={postDetailData?.post_user?.avatar} />
              <Spacer />
            </Flex>
            <Text fontSize="24px" fontWeight="bold" my="10px">
              {postDetailData?.caption}
            </Text>

            <Img maxW="600px" minW="400px" src={postDetailData?.image_url} />
          </Box>
          <Box pl="10px">
            <Text
              fontSize="24px"
              fontWeight="bold"
              margin="20px"
              mb="30px"
              textAlign="center"
            >
              Comments
            </Text>
            <Box
              height="420px"
              width="225px"
              overflowY={comment.length > 6 ? "scroll" : "none"}
            >
              {renderComments()}
            </Box>
            {comment.length > 3 ? (
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
            ) : null}
          </Box>
        </Flex>
        <Box p="10px">
          <Stack m={2} direction="row">
            <FacebookShareButton
              url={`${WEB_URL}${router.asPath}`}
              quote={`Cek ${postDetailData?.caption}!`}
            >
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <TwitterShareButton
              title={`Beli ${postDetailData?.caption}!`}
              url={`${WEB_URL}${router.asPath}`}
            >
              <TwitterIcon size={40} round />
            </TwitterShareButton>
            <IconButton
              onClick={copyLinkBtnHandler}
              borderRadius="50%"
              icon={<Icon as={BiCopy} />}
            />
          </Stack>
        </Box>
      </Box>
    </Page>
  );
};

export const getServerSideProps = async (context) => {
  // Dapetin route params
  // Fetch user profile based on ID dari route params
  // passing data lewat props

  try {
    const id = context.query.postDetail;
    // const authToken = context.req.cookies.auth_token;

    const res = await axios.get(`http://localhost:2000/posts/get-one-post`, {
      params: {
        id,
      },
    });

    return {
      props: {
        postDetailData: res.data.result,
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
};

export default postDetailPage;
