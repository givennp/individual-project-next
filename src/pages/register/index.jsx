import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContentCard from "../../components/ContentCard";
import axios from "axios";
import {
  Box,
  Button,
  Text,
  Center,
  Input,
  FormLabel,
  FormControl,
  FormHelperText,
  useToast,
  background,
  Icon,
  Flex,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import axiosInstance from "../../configs/api";
import { useRouter } from "next/dist/client/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Router from "next/router";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { ImCross } from "react-icons/im"

const RegisterPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const router = useRouter();

  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      fullname: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("please use a valid email")
        .required("this field is required"),
      username: Yup.string()
        .min(8, "minimum length of username is 8")
        .max(15, "max length of username is 15")
        .required("this field is required"),
      fullname: Yup.string(),
      password: Yup.string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "your password must contain atleast 8 characters, one uppercase, one lowercase, one number, and one special case character"
        ),
      confirmPassword: Yup.string()
        .required("please confirm your password")
        .oneOf([Yup.ref("password"), null], "your password does not match"),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const newUser = {
          email: values.email,
          username: values.username,
          full_name: values.fullname,
          password: values.password,
        };
        await axiosInstance.post("/auth/register", newUser);
        formik.setSubmitting(false);
        Router.push("/login");
        toast({
          position: "bottom",
          render: () => (
            <Box color="white" bg="green" borderRadius="5px" p={3}>
              <Text background="green">Sign Up Success</Text>
              <Text backgroundColor="green">
                we have sent you a verification link. please check your email{" "}
                <Icon
                  backgroundColor="green"
                  color="green"
                  as={BsFillCheckCircleFill}
                />{" "}
              </Text>
            </Box>
          ),
        });
      } catch (err) {
        console.log(err);
        toast({
          position: "bottom",
          render: () => (
            <Box color="white" bg="red.500" borderRadius="5px" p={3}>
              <Text background="red.500">Sign Up Failed</Text>
              <Text backgroundColor="red.500">
                username or email already taken{" "}
                <Icon backgroundColor="red.500" color="white" as={ImCross} />{" "}
              </Text>
            </Box>
          ),
        });
      }
    },
  });


  //   const inputHandler = (event) => {
  //       formik.setFieldValue(name,value)
  //   }

  return (
    <Box
      border="1px solid black"
      borderRadius="10px"
      marginBottom="20px"
      padding="15px"
      mt="80px"
    >
      <Text marginBottom="8px" fontSize="32px" fontWeight="bold">
        SIGN UP
      </Text>
      <Box display="flex" marginBottom="8px">
        <Center>
          <FormControl isInvalid={formik.errors.username}>
            <Text>Username :</Text>
            <Input
              onChange={(event) =>
                formik.setFieldValue("username", event.target.value)
              }
              marginLeft="8px"
              width="400px"
              type="text"
              name="username"
            />
            <FormHelperText>{formik.errors.username}</FormHelperText>
          </FormControl>
        </Center>
      </Box>
      <Box display="flex" marginBottom="8px">
        <Center>
          <FormControl isInvalid={formik.errors.fullname}>
            <Text>Fullname :</Text>
            <Input
              onChange={(event) =>
                formik.setFieldValue("fullname", event.target.value)
              }
              marginLeft="8px"
              width="400px"
              type="text"
              name="fullname"
            />
            <FormHelperText>{formik.errors.fullname}</FormHelperText>
          </FormControl>
        </Center>
      </Box>
      <Box display="flex" marginBottom="8px">
        <Center>
          <FormControl isInvalid={formik.errors.email}>
            <Text>email :</Text>
            <Input
              onChange={(event) =>
                formik.setFieldValue("email", event.target.value)
              }
              marginLeft="8px"
              width="400px"
              type="text"
              name="email"
            />
            <FormHelperText>{formik.errors.email}</FormHelperText>
          </FormControl>
        </Center>
      </Box>
      <Box display="flex" marginBottom="20px" w="200px">
        <Center>
          <FormControl isInvalid={formik.errors.password}>
            <Text>Password :</Text>
            <InputGroup>
              <Input
                type={showPass ? "text" : "password"}
                onChange={(event) =>
                  formik.setFieldValue("password", event.target.value)
                }
                marginLeft="14px"
                width="400px"
                name="password"
              />
              <InputRightElement>
                <Icon
                  as={showPass ? IoMdEyeOff : IoMdEye}
                  onClick={() => setShowPass(!showPass)}
                />
              </InputRightElement>
            </InputGroup>
            <FormHelperText>{formik.errors.password}</FormHelperText>
          </FormControl>
        </Center>
      </Box>
      <Box display="flex" marginBottom="20px">
        <Center>
          <FormControl isInvalid={formik.errors.confirmPassword}>
            <Text>Confirm Password :</Text>
            <InputGroup>
              <Input
                type={showConfirmPass ? "text" : "password"}
                onChange={(event) =>
                  formik.setFieldValue("confirmPassword", event.target.value)
                }
                marginLeft="14px"
                width="400px"
                name="confirmPassword"
              />
              <InputRightElement>
                <Icon
                  as={showConfirmPass ? IoMdEyeOff : IoMdEye}
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                />
              </InputRightElement>
            </InputGroup>
            <FormHelperText>{formik.errors.confirmPassword}</FormHelperText>
          </FormControl>
        </Center>
      </Box>
      <Box display="flex" flexDirection="column">
        <Button colorScheme="green" onClick={formik.handleSubmit}>
          REGISTER
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterPage;
