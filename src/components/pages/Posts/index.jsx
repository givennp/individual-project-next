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
              <Box padding="5px" margin="5px">
                <Img objectFit="cover" boxSize="250px" src={val.image_url} />
              </Box>
            );
        })
    }

    return (
        <Box display="flex">
            {renderPost()}
        </Box>
    )
}

export default MyPost