import { useState } from "react";
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
import axios from "axios";
import { API_URL } from "../../configs/api";

const ContentCard = ({
  username,
  location,
  caption,
  numberOfLikes,
  imageUrl,
  id,
}) => {
  // const { username, location, caption, numberOfLikes, imageUrl } = props;
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const [displayCommentInput, setDisplayCommentInput] = useState(false);

  const fetchComments = () => {
    axios
      .get(`${API_URL}/comments`, {
        params: {
          postId : id,
          _expand: "user",
        },
      })
      .then((res) => {
        setComments(res.data);
      });
  };

  const renderComments = () => {
    return comments.map((val) => {
      return <Comment content={val.content} username={val.user.username} />;
    });
  };

  const handleCommentInput = (event) => {
    const { value } = event.target;

    setCommentInput(value);
  };

  const postNewComment = () => {
    const newData = {
      username: "doraemon",
      content: commentInput,
      postId: id,
    };

    axios.post(`${API_URL}/comments`, newData).then(() => {
      fetchComments();
      setDisplayCommentInput(false);
    });
  };

  return (
    <Box>
      
      <Box
        borderWidth="1px 0px 0px 0px"
        borderColor="grey"
        maxW="700"
        paddingY="2"
        marginY="4"
        backgroundColor="black"
      >
        {/* Card Header */}
        <Box
          marginTop="8px"
          paddingX="3"
          paddingBottom="2"
          display="flex"
          alignItems="center"
        >
          <Image
            borderRadius="5px"
            src="https://bit.ly/dan-abramov"
            boxSize="40px"
          />
          <Box marginLeft="2">
            <Text fontSize="md" fontWeight="bold" color="white">
              {username}
            </Text>
            <Text fontSize="sm" color="GrayText">
              {location}
            </Text>
          </Box>
        </Box>
        <Box paddingX="3" marginBottom="3">
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
        <Image src={imageUrl} />

        {/* Action Buttons */}
        <Box
          marginTop="4px"
          paddingX="3"
          paddingY="2"
          display="flex"
          alignItems="center"
        >
          <Box
            width="120px"
            padding="2"
            backgroundColor="black"
            border="1px solid white"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
          >
            <Center>
              <Icon color="white" boxSize={6} as={FaArrowUp} />
              <Text color="white" marginLeft="8px">
                {numberOfLikes.toLocaleString()}
              </Text>
            </Center>
          </Box>
          <Box
            width="120px"
            padding="2"
            backgroundColor="black"
            border="1px solid white"
            marginLeft="2"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
          >
            <Center>
              <Icon color="white" boxSize={6} as={FaArrowDown} />
              <Text color="white" marginLeft="8px">
                832
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
          >
            <Center>
              <Icon
                onClick={() => setDisplayCommentInput(true)}
                boxSize={5}
                as={FaCommentAlt}
                color="white"
                sx={{
                  _hover: {
                    cursor: "pointer",
                  },
                }}
              />
              <Text color="white" marginLeft="8px">
                34
              </Text>
            </Center>
          </Box>
        </Box>

        {/* Comment Section */}
        <Box paddingX="3" marginTop="4">
          <Text
            fontWeight="bold"
            decoration="underline"
            color="white"
            marginBottom="2"
            onClick={fetchComments}
            _hover={{
              cursor: "pointer"
            }}
          >
            Comments
          </Text>

          {/* Comment Input */}
          {displayCommentInput ? (
            <Box display="flex">
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

          {renderComments()}
        </Box>
      </Box>
    </Box>
  );
};

export default ContentCard;
