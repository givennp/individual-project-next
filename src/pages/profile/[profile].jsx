import {
  Avatar,
  defaultStandaloneParam,
  Text,
  Box,
  Center,
  Icon,
  Image,
  Flex,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { IconBase } from "react-icons/lib";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../../configs/api";
import { useRouter } from "next/router";
import requiresAuth from "../../components/requiresAuth";
import LikedPost from "../../components/pages/Upvotes";
import MyComments from "../../components/pages/Comments";
import MyPost from "../../components/pages/Posts";

const ProfilePage = ({ userProfileData }) => {
  const [userData, setUserData] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const [menuTab, setMenuTab] = useState("post");
  const router = useRouter();

  const fetchUserPost = async () => {
    try {
      const res = await axiosInstance.get("/posts", {
        params: {
          user_id: router.query.profile,
          _sortBy: "id",
          _sortDir: "DESC",
        },
      });

      setUserPost(res.data.result.rows);
    } catch (error) {
      console.log(error);
    }
  };

  const renderUserPost = () => {
    return userPost.map((post) => {
      return (
        <Box>
          <Image
            boxSize="230px"
            margin="8px"
            objectFit="cover"
            src={post.image_url}
          />
        </Box>
      );
    });
  };

  const renderTabContent = () => {
    if (menuTab === "bio") {
      return (
        <Text padding="20px" fontSize="24px">
          {userProfileData.bio}
        </Text>
      );
    } else if (menuTab === "post") {
      return <MyPost userId={router.query.profile}/>;
    } else if (menuTab === "likedPost") {
      return <LikedPost userId={router.query.profile} />;
    } else if (menuTab === "comments") {
      return <MyComments userId={router.query.profile}/>
    }
  };

  useEffect(() => {
    fetchUserPost();
  }, []);

  return (
    <Box display="flex" flexDirection="column" color="black" width="70vh">
      <Box display="flex">
        <Center>
          <Avatar
            margin="25px 25px 25px 0px"
            boxSize="130px"
            src={userProfileData.avatar}
          />

          <Box>
            <Text fontSize="32px" fontWeight="bold">
              {userProfileData.username}
            </Text>
            <Text color="grey" fontSize="16px">
              {userProfileData.email}
            </Text>
          </Box>
        </Center>
      </Box>

      <Text fontSize="24px">My Collection</Text>
      <Box
        fontSize="20px"
        fontWeight="bold"
        display="flex"
        marginTop="8"
        borderBottom="1px"
        justifyContent="space-between"
      >
        <Box display="flex" color="black">
          <Text
            padding="15px"
            _hover={{
              color: "white",
              cursor: "pointer",
              color: "#a6a6a6",
            }}
            onClick={() => setMenuTab("bio")}
          >
            Bio
          </Text>
          <Text
            padding="15px"
            _hover={{
              color: "white",
              cursor: "pointer",
              color: "#a6a6a6",
            }}
            onClick={() => setMenuTab("post")}
          >
            Posts
          </Text>
          <Text
            padding="15px"
            _hover={{
              color: "white",
              cursor: "pointer",
              color: "#a6a6a6",
            }}
            onClick={() => setMenuTab("comments")}
          >
            Comments
          </Text>
          <Text
            padding="15px"
            _hover={{
              color: "white",
              cursor: "pointer",
              color: "#a6a6a6",
            }}
            onClick={() => setMenuTab("likedPost")}
          >
            Upvotes
          </Text>
        </Box>
        <Box margin="15px">
          <Icon
            color="white"
            boxSize="7"
            as={BsThreeDots}
            _hover={{
              cursor: "pointer",
              color: "#a6a6a6",
            }}
          />
        </Box>
      </Box>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {renderTabContent()}
      </Box>
    </Box>
  );
};

export const getServerSideProps = requiresAuth(async (context) => {
  // Dapetin route params
  // Fetch user profile based on ID dari route params
  // passing data lewat props
  const res = await axiosInstance.get(`/users/${context.query.profile}`);

  return {
    props: {
      userProfileData: res.data.result,
    },
  };
});

export default ProfilePage;
