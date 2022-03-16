import { Avatar, defaultStandaloneParam, Text, Box, Center, Icon } from "@chakra-ui/react";
import {BsThreeDots} from "react-icons/bs"
import { IconBase } from "react-icons/lib";
import { useSelector } from "react-redux";
import { useState } from "react";
import MyPost from "../../components/pages/Posts";
import RenderBio from "../../components/pages/Bio";

// 1. Bikin component untuk setiap tab
// 2. Beri nama state untuk setiap tab
// 3. If (nama state = nama tab) render component

const ProfilePage = () => {
  
  const userSelector = useSelector((state) => state.auth)  
  const [menuTab, setMenuTab] = useState("bio")

  // const buttonHandler = (selector) => {
  //   if(selector === "bio"){
  //    setMenuTab(userSelector.bio);
  //   } else if (selector == "post"){
      
  //   } 

  // }

  const renderTabContent = () => {
    if (menuTab === "bio") {
      return <RenderBio />;
    } else if (menuTab === "posts") {
      return <MyPost/>
    }
  }

    return (
      <Box display="flex" flexDirection="column" color="white" width="70vh">
        <Box display="flex">
          <Center>
            <Avatar
              margin="25px 25px 25px 0px"
              boxSize="130px"
              src={userSelector.avatar}
            />

            <Box>
              <Text fontSize="32px" fontWeight="bold">
                {userSelector.username}
              </Text>
              <Text color="grey" fontSize="16px">
                {userSelector.email}
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
              }}
              onClick={() => setMenuTab("posts")}
            >
              Posts
            </Text>
            <Text
              padding="15px"
              _hover={{
                color: "white",
                cursor: "pointer",
              }}
            >
              Comments
            </Text>
            <Text
              padding="15px"
              _hover={{
                color: "white",
                cursor: "pointer",
              }}
            >
              Upvotes
            </Text>
            <Text
              margin="15px"
              _hover={{
                color: "white",
                cursor: "pointer",
              }}
            >
              Saved
            </Text>
          </Box>
          <Box margin="15px">
            <Icon
              color="#a6a6a6"
              boxSize="7"
              as={BsThreeDots}
              _hover={{
                color: "white",
                cursor: "pointer",
              }}
            />
          </Box>
        </Box>
        <Box>{renderTabContent()}</Box>
       
      </Box>
    );
}

export default ProfilePage;