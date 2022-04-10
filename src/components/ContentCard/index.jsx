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
}) => {
  // const { username, location, caption, numberOfLikes, imageUrl } = props;
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [toggleComment, setToggleComment] = useState(false);
  const [likeStatus, setLikeStatus] = useState(like_status);

  const [displayCommentInput, setDisplayCommentInput] = useState(false);

  const userSelector = useSelector((state) => state.auth);

  const fetchComments = async () => {
    const res = await axiosInstance.get(`/comments`, {
      params: {
        post_id: id,
      },
    });

    setComments(res.data.result.rows);
  };

  const renderComments = () => {
    return comments.map((val) => {
      return <Comment content={val?.content} username={val?.User?.username} />;
    });
  };

  const handleCommentInput = (event) => {
    const { value } = event.target;

    setCommentInput(value);
  };

  const postNewComment = async () => {
    const newData = {
      user_id: userSelector.id,
      content: commentInput,
      post_id: id,
    };

    await axiosInstance.post("/comments", newData);

    fetchComments();
    fetchContentList();

    setDisplayCommentInput(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <Box>
      <Box
        borderWidth="1px 0px 0px 0px"
        borderColor="grey"
        maxW="700"
        padding="2"
        marginBottom="10px"
        backgroundColor="black"
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
              sx={{
                _hover: {
                  cursor: "pointer",
                },
              }}
            />
          </Link>
          <Box marginLeft="2">
            <Text fontSize="md" fontWeight="bold" color="white">
              {username}
            </Text>
            <Text fontSize="sm" color="GrayText">
              {location}
            </Text>
          </Box>
        </Box>
        <Box paddingX="3" paddingY="3">
          <Text
            display="inline"
            fontSize="32px"
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
          <Image minW="100%" src={imageUrl} />
        </Link>

        {/* Action Buttons */}
        <Box
          marginTop="4px"
          paddingX="3"
          paddingY="2"
          display="flex"
          alignItems="center"
        >
          {likeStatus ? (
            <Box
              width="120px"
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
                },
              }}
            >
              <Center>
                <Icon color="black" boxSize={6} as={FaArrowUp} />
                <Text color="black" marginLeft="8px">
                  {numberOfLikes?.toLocaleString()}
                </Text>
              </Center>
            </Box>
          ) : (
            <Box
              width="120px"
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
                <Icon color="white" boxSize={6} as={FaArrowUp} />
                <Text color="white" marginLeft="8px">
                  {numberOfLikes?.toLocaleString()}
                </Text>
              </Center>
            </Box>
          )}

          <Box
            width="120px"
            padding="2"
            backgroundColor="black"
            border="1px solid white"
            marginLeft="2"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
            sx={{
              _hover: {
                cursor: "pointer",
              },
            }}
          >
            <Center>
              <Icon color="white" boxSize={6} as={FaArrowDown} />
              <Text color="white" marginLeft="8px">
                {dislike_count.toLocaleString()}
              </Text>
            </Center>
          </Box>
          <Box
            width="120px"
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
                {comment_count?.toLocaleString()}
              </Text>
            </Center>
          </Box>
        </Box>

        {/* Comment Section */}
        <Box paddingX="3" marginTop="4">
          {/* Comment Input */}
          {displayCommentInput ? (
            <Box display="flex" color="white">
              <Input
                onChange={handleCommentInput}
                marginBottom="2"
                type="text"
                placeholder="Insert a new comment"
                marginRight="4"
              />
              <Button
                onClick={postNewComment}
                backgroundColor="black"
                color="white"
                border="1px solid white"
              >
                Post
              </Button>
            </Box>
          ) : null}
          <Box
            fontWeight="bold"
            decoration="underline"
            color="white"
            padding="2"
            _hover={{
              cursor: "pointer",
            }}
            width="fit-content"
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
