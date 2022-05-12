import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContentCard from "../../components/ContentCard";
import {
  Box,
  Button,
  Text,
  Center,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Icon,
  Stack,
  useToast,
} from "@chakra-ui/react";
import user_types from "../../redux/reducers/types/user";
import { useRouter } from "next/dist/client/router";
import Cookies from "js-cookie";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userLogin } from "../../redux/actions/auth";
import {IoMdEyeOff, IoMdEye} from "react-icons/io"
import {ImCross} from "react-icons/im"

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const userSelector = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("this field is required"),
      password: Yup.string().required("this field is required"),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      setTimeout(() => {
        dispatch(userLogin(values, formik.setSubmitting));
      }, 2000);
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;

    formik.setFieldValue(name, value);
  };


  
  useEffect(() => {
    if (userSelector.id) {
      router.push("/");
    }
  }, [userSelector.id]);

  useEffect(() => {
    if (userSelector.err_message) {
      toast({
        position: "bottom",
        render: () => (
          <Box
            color="white"
            p={3}
            bg="red.500"
            display="flex"
            borderRadius="5px"
            shadow="lg"
            alignItems="center"
            w="fit-content"
          >
            {userSelector.err_message} <Icon bg="inherit" as={ImCross} ml={3} />
          </Box>
        ),
      });
    }
  }, [userSelector.err_message]);

  return (
    <Box
      border="1px solid black"
      borderRadius="10px"
      marginBottom="20px"
      padding="15px"
      color="black"
      w="400px"
      mt="100px"
    >
      <Text marginBottom="8px" fontSize="32" fontWeight="bold" color="black">
        LOG IN
      </Text>
      <Stack>
        <FormControl isInvalid={userSelector.err_message}>
          <FormLabel htmlFor="inputUsername">Username/Email :</FormLabel>
          <Input
            onChange={inputHandler}
            type="text"
            id="inputUsername"
            name="username"
          />
          <FormHelperText>{userSelector.err_message}</FormHelperText>
        </FormControl>
      </Stack>
      <Box display="flex" marginBottom="20px">
        <FormControl isInvalid={userSelector.err_message}>
          <FormLabel mt="4" htmlFor="inputPassword">
            Password
          </FormLabel>
          <InputGroup>
            <Input
              type={passwordVisible ? "text" : "password"}
              id="inputPassword"
              onChange={inputHandler}
              name="password"
            />
            <InputRightElement
              children={
                <Icon
                  fontSize="xl"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  as={passwordVisible ? IoMdEyeOff : IoMdEye}
                  sx={{ _hover: { cursor: "pointer" } }}
                />
              }
            />
          </InputGroup>
          <FormHelperText>{userSelector.err_message}</FormHelperText>
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="column">
        <Link href="/register">
          <Text
            width="fit-content"
            marginBottom="8px"
            color="#5c5c5c"
            _hover={{
              color: "black",
              cursor: "pointer",
            }}
          >
            Didn't have an account?
          </Text>
        </Link>
        <Link href="/forgotPassword">
          <Text
            width="fit-content"
            marginBottom="8px"
            color="#5c5c5c"
            _hover={{
              color: "black",
              cursor: "pointer",
            }}
          >
            Forgot your password?
          </Text>
        </Link>
        <Button
          colorScheme="green"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
