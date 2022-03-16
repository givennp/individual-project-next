import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContentCard from "../../components/ContentCard";
import axios from "axios";
import { Box, Button, Text, Center, Input } from "@chakra-ui/react";
import { axiosInstance } from "../../configs/api";
import user_types from "../../redux/reducers/types/user";
import { useRouter } from "next/dist/client/router";


const LoginPage = () => {
  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")

  const router = useRouter()

  const userSelector = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  
  const inputHandler = (event, field) => {
    const {value} = event.target
    if(field === "username"){
      setUsernameInput(value)
    } else if (field === "password"){
      setPasswordInput(value)
    }

  }

  const loginButtonHandler = () => {
    axiosInstance.get("/users", {
      params: {
        username: usernameInput,
        password: passwordInput,
      },
    })
    .then((res) => {
      const userData = res.data[0]

      dispatch({
        type: user_types.LOGIN_USER,
        payload: userData
      })
      localStorage.setItem("user_data", JSON.stringify(userData))
    })
    .catch((err) =>{
      console.log(err);
    })
  }

    if(userSelector.id){
      router.push("/home")
    }



    return (
      <Box
        border="1px solid white"
        borderRadius="10px"
        marginBottom="20px"
        padding="15px"
        color="white"
      >
        <Text marginBottom="8px" fontSize="32" fontWeight="bold" color="white">
          LOG IN
        </Text>
        <Box display="flex" marginBottom="8px">
          <Center>
            <Text color="white">Username :</Text>
            <Input
              onChange={(event) => inputHandler(event, "username")}
              marginLeft="8px"
              width="400px"
              type="text"
            />
          </Center>
        </Box>
        <Box display="flex" marginBottom="20px">
          <Center>
            <Text color="white">Password :</Text>
            <Input
              type="password"
              onChange={(event) => inputHandler(event, "password")}
              marginLeft="14px"
              width="400px"
            />
          </Center>
        </Box>
        <Box display="flex" flexDirection="column">
          <Text
            width="fit-content"
            marginBottom="8px"
            color="#5c5c5c"
            _hover={{
              color: "white",
              cursor: "pointer",
            }}
          >
            Didn't have an account?
          </Text>
          <Button colorScheme="green" onClick={loginButtonHandler}>Login</Button>
        </Box>
      </Box>
    );
}

export default LoginPage