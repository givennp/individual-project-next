import {
  Avatar,
  defaultStandaloneParam,
  Text,
  Box,
  Center,
  Icon,
  Flex,
  Spacer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Button,
  AvatarBadge,
  Link,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { IconBase } from "react-icons/lib";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { RiPencilFill } from "react-icons/Ri";
import { FaSave } from "react-icons/fa";
import MyPost from "../../components/pages/Posts";
import RenderBio from "../../components/pages/Bio";
import MyComments from "../../components/pages/Comments";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import axiosInstance from "../../configs/api";

// 1. Bikin component untuk setiap tab
// 2. Beri nama state untuk setiap tab
// 3. If (nama state = nama tab) render component

const MyProfilePage = () => {
  const userSelector = useSelector((state) => state.auth);
  console.log(userSelector);
  const [menuTab, setMenuTab] = useState("bio");
  const [selectedFile, setSelectedFile] = useState(null);
  const [userData, setUserData] = useState({});

  const router = useRouter();

  // console.log(userSelector, "USER SELECTORRRR");
  const inputFileRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      newUsername: "",
      newBio: "",
      newFullName: "",
    },
    validationSchema: Yup.object().shape({
      newUsername: Yup.string().max(70),
      newBio: Yup.string().max(50),
      newFullName: Yup.string().max(25),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const editedUser = {
          username: values.newUsername || userSelector.username,
          bio: values.newBio || userSelector.bio,
          full_name: values.newFullName || userSelector.full_name,
        };

        // console.log(editedUser)
        if (userSelector.username === editedUser.username) {
          delete editedUser.username;
        }

        const test = await axiosInstance.patch(
          `/users/${userSelector.id}`,
          editedUser
        );
        // console.log(test);
        formik.setSubmitting(false);
        onClose();
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    alert(event.target.files[0].name);
  };

  const uploadContentHandler = async () => {
    // Proteksi jika file belum dipilih
    if (!selectedFile) {
      alert("Anda belum pilih file");
      return;
    }

    const formData = new FormData();

    formData.append("avatar", selectedFile);

    try {
      await axiosInstance.patch(`/users/${userSelector.id}`, formData);
      setSelectedFile(null);
    } catch (err) {
      console.log(err);
    }
  };

  const resendEmailVerification = async () => {
    try {
      await axiosInstance.post("/auth/resend-verification");
    } catch (err) {
      console.log(err);
    }
  };

  const renderTabContent = () => {
    if (menuTab === "bio") {
      return <RenderBio />;
    } else if (menuTab === "posts") {
      return <MyPost />;
    } else if (menuTab === "comments") {
      return <MyComments />;
    }
  };

  return (
    <Box display="flex" flexDirection="column" color="black" width="70vh">
      <Box display="flex">
        <Center>
          <Input
            accept="image/png, image/jpeg"
            onChange={handleFile}
            ref={inputFileRef}
            type="file"
            display="none"
          />
          {!selectedFile ? (
            <Avatar
              boxSize="100px"
              margin="25px 25px 25px 0px"
              src={userSelector.avatar}
              onClick={() => inputFileRef.current.click()}
              sx={{
                _hover: {
                  cursor: "pointer",
                  border: "2px solid black",
                },
              }}
            />
          ) : (
            <Avatar
              boxSize="100px"
              margin="25px 25px 25px 0px"
              src={URL.createObjectURL(selectedFile)}
            >
              <AvatarBadge>
                <Icon
                  as={FaSave}
                  sx={{
                    _hover: { cursor: "pointer" },
                  }}
                  onClick={() => {
                    uploadContentHandler();
                    router.reload(window.location.pathname);
                  }}
                />
              </AvatarBadge>
            </Avatar>
          )}

          <Box>
            <Flex>
              <Text fontSize="24px" fontWeight="bold" mr="5px">
                {userSelector.username}
              </Text>
              <Box
                onClick={onOpen}
                boxSize="15px"
                sx={{
                  _hover: {
                    cursor: "pointer",
                  },
                }}
              >
                <Icon boxSize="15px" as={RiPencilFill} margin="10px" />
              </Box>
            </Flex>
            <Text marginY="2px" fontSize="20px" fontWeight="light">
              {userSelector.full_name}
            </Text>

            <Text color="grey" fontSize="16px">
              {userSelector.email}
            </Text>
          </Box>

          {/* modal */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent h="600px" w="700px">
              <ModalHeader fontSize="24px" fontWeight="600">
                Edit
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody fontWeight="500">
                <Stack spacing={8}>
                  <FormControl isInvalid={formik.errors.newUsername}>
                    <FormLabel htmlFor="inputNewUsername">Username</FormLabel>
                    <Input
                      id="inputNewUsername"
                      // defaultValue={userSelector.username}
                      value={formik.values.newUsername}
                      onChange={(event) =>
                        formik.setFieldValue("newUsername", event.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl isInvalid={formik.errors.newFullName}>
                    <FormLabel htmlFor="inputNewFullName">Full Name</FormLabel>
                    <Input
                      id="inputNewFullName"
                      // defaultValue={userSelector.full_name}
                      value={formik.values.newFullName}
                      onChange={(event) =>
                        formik.setFieldValue("newFullName", event.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl isInvalid={formik.errors.newBio}>
                    <FormLabel htmlFor="inputNewBio">Bio</FormLabel>
                    <Input
                      id="inputNewBio"
                      // defaultValue={userSelector.bio}
                      value={formik.values.newBio}
                      onChange={(event) =>
                        formik.setFieldValue("newBio", event.target.value)
                      }
                    />
                  </FormControl>
                  <Link href="/forgotPassword">
                    <Button>Reset Password</Button>
                  </Link>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="green"
                  onClick={formik.handleSubmit}
                  type="submit"
                  margin={3}
                >
                  Yes
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Center>
      </Box>
      <Text fontSize="24px">My Collection</Text>
      {userSelector.is_verified ? null : (
        <Button marginY="20px" onClick={() => resendEmailVerification()}>
          Send Email Verification
        </Button>
      )}
      <Box
        fontSize="16px"
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
            boxSize="5"
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
};

// export const getServerSideProps = requiresAuth(async (context) => {
//   // Dapetin route params
//   // Fetch user profile based on ID dari route params
//   // passing data lewat props

//   try {
//     const id = context.req.cookies.auth_token.id;
//     const authToken = context.req.cookies.auth_token;

//     const res = await axios.get(`http://localhost:2000/users/`, {
//       params: {
//         id,
//       },
//       headers: {
//         authorization: authToken,
//       },
//     });

//     return {
//       props: {
//         userData: res.data.result.rows[0],
//       },
//     };
//   } catch (err) {
//     console.log(err);
//     return {
//       props: {
//         postDetailData: null,
//       },
//     };
//   }
// });

export default MyProfilePage;
