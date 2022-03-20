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
} from "@chakra-ui/react";
import { axiosInstance } from "../../configs/api";
import { useRouter } from "next/dist/client/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Router from "next/router";

const LoginPage = () => {
  const router = useRouter();

  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      avatar: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("please use a valid email")
        .required("this field is required"),
      username: Yup.string()
        .min(8, "minimum length of username is 8")
        .max(15, "max length of username is 15")
        .required("this field is required"),
      avatar: Yup.string().required("this field is required"),
      password: Yup.string().min(8, "min length of password is 8").required(),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      const newUser = {
        email: values.email,
        username: values.username,
        avatar: values.avatar,
        password: values.password,
      };
      await axiosInstance.post("/users", newUser);
      formik.setSubmitting(false);
      Router.push("/login");
      toast({
        position: "bottom",
        render: () => (
          <Box color="white" bg="green" borderRadius="5px" p={3}>
            <Text background="green">Sign Up Success</Text>
            <Text backgroundColor="green">
              Now you can use your new account{" "}
              <Icon
                backgroundColor="green"
                color="green"
                as={BsFillCheckCircleFill}
              />{" "}
            </Text>
          </Box>
        ),
      });
    },
  });

  //   const inputHandler = (event) => {
  //       formik.setFieldValue(name,value)
  //   }

  return (
    <Box
      border="1px solid white"
      borderRadius="10px"
      marginBottom="20px"
      padding="15px"
      color="white"
    >
      <Text marginBottom="8px" fontSize="32" fontWeight="bold" color="white">
        SIGN UP
      </Text>
      <Box display="flex" marginBottom="8px">
        <Center>
          <FormControl isInvalid={formik.errors.username}>
            <Text color="white">Username :</Text>
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
          <FormControl isInvalid={formik.errors.username}>
            <Text color="white">email :</Text>
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
      <Box display="flex" marginBottom="8px">
        <Center>
          <FormControl isInvalid={formik.errors.avatar}>
            <Text color="white">Avatar :</Text>
            <Input
              onChange={(event) =>
                formik.setFieldValue("avatar", event.target.value)
              }
              marginLeft="8px"
              width="400px"
              type="text"
              name="avatar"
            />
            <FormHelperText>{formik.errors.avatar}</FormHelperText>
          </FormControl>
        </Center>
      </Box>
      <Box display="flex" marginBottom="20px">
        <Center>
          <FormControl isInvalid={formik.errors.password}>
            <Text color="white">Password :</Text>
            <Input
              type="password"
              onChange={(event) =>
                formik.setFieldValue("password", event.target.value)
              }
              marginLeft="14px"
              width="400px"
              name="password"
            />
            <FormHelperText>{formik.errors.password}</FormHelperText>
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

export default LoginPage;
