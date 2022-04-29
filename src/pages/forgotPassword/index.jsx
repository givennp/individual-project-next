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
} from "@chakra-ui/react";
import user_types from "../../redux/reducers/types/user";
import { useRouter } from "next/dist/client/router";
import Cookies from "js-cookie";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userLogin } from "../../redux/actions/auth";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import axiosInstance from "../../configs/api";

const forgotPasswordPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const userSelector = useSelector((state) => state.auth);

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

      } catch (err) {
        console.log(err);
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
