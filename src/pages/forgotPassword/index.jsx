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
import { BsFillCheckCircleFill } from "react-icons/bs";
import axiosInstance from "../../configs/api";

const forgotPasswordPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const userSelector = useSelector((state) => state.auth);

  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      email: "",

    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required("this field is required"),

    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        await axiosInstance.post("/auth/forgot-password", {
          email : values.email
          
        })

        formik.setSubmitting(false)

        toast({
          position: "bottom",
          render: () => (
            <Box color="white" bg="green" borderRadius="5px" p={3}>
              <Text background="green">email sent!</Text>
              <Text backgroundColor="green">
                please check your email{" "}
                <Icon
                  backgroundColor="green"
                  color="white"
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
              <Text background="red.500">Email not found</Text>
              <Text backgroundColor="red.500">
                please use your registered email{" "}
                <Icon
                  backgroundColor="red.500"
                  color="white"
                  as={BsFillCheckCircleFill}
                />{" "}
              </Text>
            </Box>
          ),
        });

      }
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;

    formik.setFieldValue(name, value);
  };

  // useEffect(() => {
  //   if (userSelector.id) {
  //     router.push("/home");
  //   }
  // }, [userSelector.id]);

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
        Please input your email
      </Text>
      <Stack spacing={10}>
        <FormControl isInvalid={formik.errors.email}>
          <FormLabel htmlFor="inputEmail">email :</FormLabel>
          <Input
            onChange={inputHandler}
            type="text"
            id="inputEmail"
            name="email"
          />
          <FormHelperText>{formik.errors.email}</FormHelperText>
        </FormControl>

        <Box display="flex" flexDirection="column">
          <Button
            colorScheme="green"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
          >
            Send Email
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default forgotPasswordPage;
