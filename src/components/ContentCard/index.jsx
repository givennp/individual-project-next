import { useEffect, useState } from "react";
import {
  Box,
  Image,
  Avatar,
  Text,
  Icon,
  Button,
  Input,
  Center,
  TagLabel,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";
import {
  FaRegHeart,
  FaCommentAlt,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import Comment from "../Comment";
import axiosInstance from "../../configs/api";
import { useSelector } from "react-redux";
import Link from "next/link";
import requiresAuth from "../requiresAuth";
import { useFormik } from "formik";
import * as Yup from "yup";

const ContentCard = ({
  username,
  location,
  caption,
  numberOfLikes,
  imageUrl,
  id,
  profile_picture,
  userId,
  comment_count,
  fetchContentList,
  dislike_count,
  addLikeButton,
  like_status,
  removeLikeButton,
  date,
}) => {
  // const { username, location, caption, numberOfLikes, imageUrl } = props;
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [toggleComment, setToggleComment] = useState(false);
  const [likeStatus, setLikeStatus] = useState(like_status);
  const [commentCount, setCommentCount] = useState(0)

  const [displayCommentInput, setDisplayCommentInput] = useState(false);

  const userSelector = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: Yup.object().shape({
      content: Yup.string().max(300).required("please insert a new comment"),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const newComment = {
          user_id: userSelector.id,
          content: values.content,
          post_id: id,
        };
        await axiosInstance.post(`/comments`, newComment);
        formik.setSubmitting(false);
        fetchComments();
        // fetchContentList();
        setCommentCount(commentCount + 1)
        setDisplayCommentInput(false);
      } catch (err) {
        console.log(err);
      }
    },
  });

  const fetchComments = async () => {
    const res = await axiosInstance.get(`/comments`, {
      params: {
        post_id: id,
        _limit: 5,
        _sortBy: "id",
        _sortDir: "DESC",
      },
    });

    setComments(res.data.result.rows);
    setCommentCount(res.data.result.count);
  };

  const renderComments = () => {
    return comments.map((val) => {
      return (
        <Comment
          content={val?.content}
          username={val?.User?.username}
        />
        
      );
    });
  };

  // const handleCommentInput = (event) => {
  //   const { value } = event.target;

  //   setCommentInput(value);
  // };

  // const postNewComment = async () => {
  //   const newData = {
  //     user_id: userSelector.id,
  //     content: commentInput,
  //     post_id: id,
  //   };

  //   await axiosInstance.post("/comments", newData);

  //   fetchComments();
  //   fetchContentList();

  //   setDisplayCommentInput(false);
  // };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <Box>
      <Box
        borderWidth="1px 0px 0px 0px"
        borderColor="grey"
        maxW="500px"
        padding="2"
        marginBottom="20px"
        marginX="100px"
        bg="black"
        shadow="dark-lg"
      >
        {/* Card Header */}
        <Box padding="3" paddingBottom="2" display="flex" alignItems="center">
          <Link
            href={
              userSelector.id === userId ? `/myProfile` : `/profile/${userId}`
            }
          >
            <Image
              borderRadius="5px"
              src={profile_picture}
              boxSize="40px"
              objectFit="cover"
              sx={{
                _hover: {
                  cursor: "pointer",
                },
              }}
            />
          </Link>
          <Box marginLeft="2">
            <Text fontSize="sm" fontWeight="bold" color="white">
              {username}
            </Text>
            <Text fontSize="sm" color="GrayText">
              {location}
            </Text>
          </Box>
        </Box>
        <Box paddingX="3" paddingY="10px">
          <Text
            display="inline"
            fontSize="24px"
            fontWeight="bold"
            color="white"
          >
            {caption}
          </Text>
        </Box>

        {/* Card Media/Content */}
        <Link
          href={
            // userSelector.id === userId ? `/myProfile` :
            `/postDetail/${id}`
          }
        >
          <Image minW="100%" maxH="600px" objectFit="cover" src={imageUrl} />
        </Link>

        {/* Action Buttons */}
        <Box
          marginTop="4px"
          paddingX="3"
          paddingY="2"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex">
            {likeStatus ? (
              <Box
                width="100px"
                padding="2"
                backgroundColor="white"
                border="1px solid white"
                display="flex"
                justifyContent="center"
                borderRadius="4px"
                onClick={() => {
                  removeLikeButton();
                  setLikeStatus(false);
                }}
                sx={{
                  _hover: {
                    cursor: "pointer",
                    backgroundColor: "grey",
                  },
                }}
              >
                <Center>
                  <Icon color="black" boxSize={4} as={FaArrowUp} />
                  <Text color="black" marginLeft="8px">
                    {numberOfLikes?.toLocaleString()}
                  </Text>
                </Center>
              </Box>
            ) : (
              <Box
                width="100px"
                padding="2"
                backgroundColor="black"
                border="1px solid white"
                display="flex"
                justifyContent="center"
                borderRadius="4px"
                onClick={() => {
                  addLikeButton();
                  setLikeStatus(true);
                }}
                sx={{
                  _hover: {
                    cursor: "pointer",
                  },
                }}
              >
                <Center>
                  <Icon color="white" boxSize={5} as={FaArrowUp} />
                  <Text color="white" marginLeft="8px">
                    {numberOfLikes?.toLocaleString()}
                  </Text>
                </Center>
              </Box>
            )}
            <Box
              width="100px"
              padding="2"
              backgroundColor="black"
              border="1px solid white"
              marginLeft="2"
              borderRadius="4px"
              justifyContent="space-between"
              onClick={() => setDisplayCommentInput(!displayCommentInput)}
              sx={{
                _hover: {
                  cursor: "pointer",
                },
              }}
            >
              <Center>
                <Icon boxSize={5} as={FaCommentAlt} color="white" />
                <Text color="white" marginLeft="8px">
                  {commentCount.toLocaleString()}
                </Text>
              </Center>
            </Box>
          </Box>
          <Text fontSize="sm" color="GrayText">
            {date}
          </Text>
        </Box>

        {/* Comment Section */}
        <Box paddingX="3" marginTop="4">
          {/* Comment Input */}
          {displayCommentInput ? (
            <Box display="flex" color="white" fontSize="16px">
              <FormControl isInvalid={formik.errors.content}>
                <Input
                  onChange={
                    (event) => formik.setFieldValue("content", event.target.value)
                  // handleCommentInput
                  }
                  type="text"
                  placeholder="write a comment here"
                />
                <FormHelperText m="0px" ml="5px">{formik.errors.content}</FormHelperText>
              </FormControl>
              <Button
                onClick={
                  formik.handleSubmit
                  // postNewComment
                }
                backgroundColor="black"
                color="white"
                border="1px solid white"
                ml="10px"
              >
                Post
              </Button>
            </Box>
          ) : null}
          <Box
            fontWeight="semibold"
            decoration="underline"
            color="white"
            padding="2"
            _hover={{
              cursor: "pointer",
            }}
            width="fit-content"
            fontSize="sm"
          >
            <Text
              onClick={() => setToggleComment(!toggleComment)}
              textDecoration="underline"
            >
              Comments
            </Text>
          </Box>
          <Box>{toggleComment ? renderComments() : null}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContentCard;
