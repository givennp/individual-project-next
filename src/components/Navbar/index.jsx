import {
  Box,
  Text,
  Button,
  Stack,
  Collapse,
  Icon,
  Center,
  Avatar,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { GiCorn } from "react-icons/gi";
import { IoIosNotifications, IoMdChatbubbles } from "react-icons/io";
import { BsPlusLg } from "react-icons/bs";
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux";
import {user_types} from "../../redux/reducers/types/user";
import { useRouter } from "next/dist/client/router";
import JsCookie from "js-cookie";


const Navbar = () => {
  const userSelector = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const router = useRouter()

  const logoutButtonHandler = () => {
    dispatch({
      type: user_types.LOGOUT_USER,
    });
    JsCookie.remove("auth_token")
    router.push("/")
    
  };

  const uploadButton = () => {
    if(userSelector.id){
      router.push("/upload")

    } else if(!userSelector.id){
      router.push("/login")
    }
    
  }

  return (
    <Box
      color="white"
      display="flex"
      justifyContent="space-between"
      borderBottom="1px"
      paddingX="15vh"
      position="sticky"
      bg="black"
      top="0"
      zIndex="9"
    >
      <Box display="flex" fontSize="16px" fontWeight="medium" width="50%">
        <Center>
          <Link
            href="/"
            style={{
              display: "flex",
              alignitems: "center",
            }}
          >
            <Box
              _hover={{
                color: "#a6a6a6",
                cursor: "pointer",
              }}
            >
              <Icon
                margin="15px"
                as={GiCorn}
                boxSize="25px"
                display="flex"
                alignitem="center"
                _hover={{
                  color: "#a6a6a6",
                }}
              />
            </Box>
          </Link>
          <Text
            padding="15px"
            _hover={{
              color: "#a6a6a6",
              cursor: "pointer",
            }}
          >
            Shuffle
          </Text>
          <Text
            padding="15px"
            _hover={{
              color: "#a6a6a6",
              cursor: "pointer",
            }}
          >
            Donate
          </Text>
          <Text
            padding="15px"
            _hover={{
              color: "#a6a6a6",
              cursor: "pointer",
            }}
          >
            Trending
          </Text>
        </Center>
      </Box>
      <Box display="flex" flexDirection="row">
        <Center>
          <Icon padding="3px" boxSize="7" as={AiOutlineSearch} />
          <Icon padding="3px" boxSize="7" as={IoIosNotifications} />
          <Icon padding="3px" boxSize="7" as={IoMdChatbubbles} />
          {userSelector.id ? (
            <Menu size="sm">
              <MenuButton>
                <Avatar
                  marginLeft="20px"
                  size="sm"
                  src={userSelector.avatar}
                  _hover={{
                    cursor: "pointer",
                  }}
                />
              </MenuButton>
              <MenuList color="black">
                {userSelector.id ? (
                  <>
                    <Link href="/myProfile">
                      <MenuItem>Profile</MenuItem>
                    </Link>
                    <MenuItem onClick={logoutButtonHandler}>Logout</MenuItem>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <MenuItem>Login</MenuItem>
                    </Link>
                  </>
                )}
              </MenuList>
            </Menu>
          ) : (
            <Link href="/login">
              <Button colorScheme="green" marginLeft="20px">
                Login
              </Button>
            </Link>
          )}
          <Button
            marginLeft="15px"
            borderRadius="50px"
            backgroundColor="#217aff"
            fontSize="16px"
            fontWeight="bold"
            height="70%"
            onClick={() => uploadButton()}
          >
            <Icon marginRight="15px" backgroundColor="inherit" as={BsPlusLg} />
            Upload
          </Button>
        </Center>
      </Box>
    </Box>
  );
};

export default Navbar;
