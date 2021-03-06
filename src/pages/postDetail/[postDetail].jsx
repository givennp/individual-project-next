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
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { WEB_URL } from "../../configs/url";
import Page from "../../components/page";
import { BiCopy } from "react-icons/bi";

const postDetailPage = ({ postDetailData }) => {
  const [comment, setComment] = useState([]);
  const [page, setPage] = useState(1);
  const [commentsCount, setCommentsCount] = useState(0);


  const router = useRouter();

  const toast = useToast();

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
      setCommentsCount(res.data.result.count)
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
      `https://many-worlds-beam-180-254-66-68.loca.lt${router.asPath}`
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
      <Box bg="black" color="white" shadow="dark-lg" mt="40px">
        <Flex p="10px">
          <Box>
            <Flex padding="2">
              <Img
                borderRadius="5px"
                boxSize="50px"
                src={postDetailData?.post_user?.avatar}
                objectFit="cover"
              />
              <Box>
                <Text ml="10px" fontSize="18px" fontWeight="semibold">
                  {postDetailData.post_user.username}
                </Text>
                <Text ml="10px" color="grey.300">{postDetailData.location}</Text>
              </Box>
              <Spacer />
            </Flex>
            <Text fontSize="24px" fontWeight="bold" my="10px" ml="10px">
              {postDetailData?.caption}
            </Text>

            <Img maxW="600px" minW="400px" src={postDetailData?.image_url} />
          </Box>
          <Box pl="10px" height="500px" width="fit-content">
            <Text
              fontSize="24px"
              fontWeight="bold"
              margin="20px"
              mb="30px"
              textAlign="center"
            >
              Comments ({`${commentsCount ? commentsCount : 0}`})
            </Text>
            <Box
              height="420px"
              width="250px"
              overflowY={comment.length > 6 ? "scroll" : "none"}
            >
              {renderComments()}
            </Box>
            {commentsCount > 3 ? (
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
              quote={`${postDetailData?.caption}`}
            >
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <TwitterShareButton
              title={`${postDetailData?.caption}`}
              url={`${WEB_URL}${router.asPath}`}
            >
              <TwitterIcon size={40} round />
            </TwitterShareButton>
            <WhatsappShareButton
              title={`${postDetailData.caption}`}
              url={`https://wet-bullfrog-71.loca.lt${router.asPath}`}
            >
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>
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
