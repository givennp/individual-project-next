import { Box, defaultStandaloneParam, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { axiosInstance } from "../../../configs/api";

const MyComments = () => {
  const [userComments, setUserComments] = useState([]);
  const userSelector = useSelector((state) => state.auth);


  const fetchComments = () => {
    axiosInstance
      .get("/comments", {
        params: {
          userId: userSelector.id,
        },
      })
      .then((res) => {
        setUserComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const renderComments = () => {
      return userComments.map((comment) => {
          return (
              <Text>{comment.content}</Text>
          )
      })
  }

  return(
    <Box>
        <Text>{renderComments()}</Text>
    </Box>
  )


};

export default MyComments




