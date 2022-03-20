import { useSelector } from "react-redux";
import { Box, Img } from "@chakra-ui/react";
import { axiosInstance } from "../../../configs/api";
import { useEffect, useState } from "react";


const MyPost = () => {
    const [userPost, setUserPost] = useState([])
    const userSelector = useSelector((state) => state.auth)

    const fetchPost = () => {
        axiosInstance.get("/posts", {
            params: {
                userId : userSelector.id
            }
        })
        .then((res) => {
            setUserPost(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(()=> {
        fetchPost()
    }, [])

    const renderPost = () => {
        return userPost.map((val) => {
            return (
              <Box>
                <Img
                  boxSize="230px"
                  margin="8px"
                  objectFit="cover"
                  src={val.image_url}
                />
              </Box>
            );
        })
    }

    return (
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {renderPost()}
      </Box>
    );
}

export default MyPost