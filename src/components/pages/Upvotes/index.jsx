import {
  Avatar,
  defaultStandaloneParam,
  Text,
  Box,
  Center,
  Icon,
  Image,
  Flex,
  Link,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { IconBase } from "react-icons/lib";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axiosInstance from "../../../configs/api";

const LikedPost = ({ userId }) => {
  const [userData, setUserData] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const [menuTab, setMenuTab] = useState("post");
  const router = useRouter();

    const [userComments, setUserComments] = useState([]);
  const userSelector = useSelector((state) => state.auth);


  const fetchUserPost = async () => {
    try {
      const res = await axiosInstance.get("/users/liked-post", {
        params: {
          user_id: userId,
          _sortBy: "id",
          _sortDir: "DESC",
        },
      });

      setUserPost(res.data.result.rows);
      
    } catch (error) {
      console.log(error);
    }
  };

  const renderLikedPost = () => {
    return userPost.map((post) => {
      return (
        <Box padding="7px" pt="15px">
          <Link href={`postDetail/${post.like_post.id}`}>
          <Image
            boxSize="170px"
            objectFit="cover"
            src={post.like_post.image_url}
          />
          </Link>
        </Box>
      );
    });
  };

  useEffect(()=> {
    fetchUserPost()
  }, [])

  return (
    <Flex flexDirection="row" flexWrap="wrap">
      {renderLikedPost()}
    </Flex>
  );
}

export default LikedPost