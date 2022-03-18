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
import { axiosInstance } from "../../configs/api";
import { useRouter } from "next/router";
import requiresAuth from "../../components/requiresAuth";

const ProfilePage = () => {
  const [userData, setUserData] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const [menuTab, setMenuTab] = useState("post");
  const router = useRouter();

  const fetchUserData = async () => {
    try {
      const res = await axiosInstance.get("/users", {
        params: {
          userId: router.query.profile,
        },
      });
      setUserData(res.data[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchUserPost = async () => {
    try {
      const res = await axiosInstance.get("/posts", {
        params: {
          userId: router.query.profile,
        },
      });

      setUserPost(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderUserPost = () => {
    return userPost.map((post) => {
      return (
        <Box>
          <Image boxSize="230px" margin="8px" objectFit="cover" src={post.image_url} />
        </Box>
      );
    });
  };

  const renderTabContent = () => {
    if (menuTab === "bio") {
      return userData.bio;
    }

    if (menuTab === "post") {
      return renderUserPost();
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchUserPost();
  }, []);

  return (
    <Box display="flex" flexDirection="column" color="white" width="70vh">
      <Box display="flex">
        <Center>
          <Avatar
            margin="25px 25px 25px 0px"
            boxSize="130px"
            src={userData.avatar}
          />

          <Box>
            <Text fontSize="32px" fontWeight="bold">
              {userData.username}
            </Text>
            <Text color="grey" fontSize="16px">
              {userData.email}
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
        <Box display="flex" color="#a6a6a6">
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
          >
            Upvotes
          </Text>
          <Text
            margin="15px"
            _hover={{
              color: "white",
              cursor: "pointer",
              color: "#a6a6a6",
            }}
          >
            Saved
          </Text>
        </Box>
        <Box margin="15px">
          <Icon
            color= "white"
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

export const getServerSideProps = requiresAuth((context) => {
  const userData = context.req.cookies.user_data;

  return {
    props: {
      user: userData,
    },
  };
});

export default ProfilePage;
