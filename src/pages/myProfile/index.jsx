import { Avatar, defaultStandaloneParam, Text, Box, Center, Icon } from "@chakra-ui/react";
import {BsThreeDots} from "react-icons/bs"
import { IconBase } from "react-icons/lib";
import { useSelector } from "react-redux";
import { useState } from "react";
import MyPost from "../../components/pages/Posts";
import RenderBio from "../../components/pages/Bio";
import MyComments from "../../components/pages/Comments";

// 1. Bikin component untuk setiap tab
// 2. Beri nama state untuk setiap tab
// 3. If (nama state = nama tab) render component

const MyProfilePage = () => {
  
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
    } else if (menuTab === "comments"){
      return <MyComments/>
    }
  }

    return (
      <Box display="flex" flexDirection="column" color="black" width="70vh">
        <Box display="flex" >
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
          <Box display="flex" color="black">
            <Text
              padding="15px"
              _hover={{
                color: "grey",
                cursor: "pointer",
              }}
              onClick={() => setMenuTab("bio")}
            >
              Bio
            </Text>
            <Text
              padding="15px"
              _hover={{
                color: "grey",
                cursor: "pointer",
              }}
              onClick={() => setMenuTab("posts")}
            >
              Posts
            </Text>
            <Text
              padding="15px"
              _hover={{
                color: "grey",
                cursor: "pointer",
              }}
              onClick={() => setMenuTab("comments")}
            >
              Comments
            </Text>
            <Text
              padding="15px"
              _hover={{
                color: "grey",
                cursor: "pointer",
              }}
            >
              Upvotes
            </Text>
            <Text
              margin="15px"
              _hover={{
                color: "grey",
                cursor: "pointer",
              }}
            >
              Saved
            </Text>
          </Box>
          <Box margin="15px">
            <Icon
              color="black"
              boxSize="7"
              as={BsThreeDots}
              _hover={{
                color: "grey",
                cursor: "pointer",
              }}
            />
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {renderTabContent()}
        </Box>
      </Box>
    );
}

export default MyProfilePage;