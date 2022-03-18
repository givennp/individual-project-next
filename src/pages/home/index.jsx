import { useState, useEffect } from "react";
import ContentCard from "../../components/ContentCard";
import axios from "axios";
import { Box, Button, Center, Input, Text } from "@chakra-ui/react";
import { API_URL } from "../../configs/api";
import NavBar from "../../components/Navbar";

const HomePage = () => {
  const [contentList, setContentList] = useState([]);
  // const [isLoading, setIsLoading] = useState("")

  const fetchContentList = () => {
    axios.get(`${API_URL}/posts`,{params :{
      _expand: "user"
    }})
    .then((res) => {
      setContentList(res.data);
    });
  };

  const renderContentList = () => {
    return contentList.map((val) => {
      return (
        <ContentCard
          username={val.user.username}
          caption={val.caption}
          imageUrl={val.image_url}
          location={val.location}
          numberOfLikes={val.number_of_likes}
          id={val.id}
          profile_picture={val.user.avatar}
          userId={val.userId}
        />
      );
    });
  };

  useEffect(() => {
    fetchContentList()
  } , [])

  return (
    <Box paddingY="8" left="0" right="0">
      {renderContentList()}
    </Box>
  );
};

export default HomePage;
