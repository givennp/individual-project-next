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
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import axiosInstance from "../../configs/api";

const resetPasswordPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const router = useRouter();

  const toast = useToast();

  const { fp_token } = router.query;

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
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
        await axiosInstance.patch("/auth/reset-password", {
          password: values.password,
          forgotPasswordToken: fp_token,
        });

        formik.setSubmitting(false);

        router.push("/login");

        toast({
          position: "bottom",
          render: () => (
            <Box color="white" bg="green" borderRadius="5px" p={3}>
              <Text background="green">Change password success!</Text>
              <Text backgroundColor="green">
                Now you can login with your new password{" "}
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
      }
    },
  });

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
      w="500px"
      mt="100px"
    >
      <Text marginBottom="8px" fontSize="32" fontWeight="bold" color="black">
        Please input your password
      </Text>
      <Stack spacing={10}>
        <Box display="flex" marginBottom="20px">
          <FormControl isInvalid={formik.errors.password}>
            <Text>Password :</Text>
            <InputGroup>
              <Input
                type={showPass ? "text" : "password"}
                onChange={(event) =>
                  formik.setFieldValue("password", event.target.value)
                }
                marginLeft="14px"
                width="100%"
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
        </Box>
        <Box display="flex" marginBottom="20px">
          <FormControl isInvalid={formik.errors.confirmPassword}>
            <Text>Confirm Password :</Text>
            <InputGroup>
              <Input
                type={showConfirmPass ? "text" : "password"}
                onChange={(event) =>
                  formik.setFieldValue("confirmPassword", event.target.value)
                }
                marginLeft="14px"
                width="100%"
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
        </Box>
        <Button onClick={formik.handleSubmit}>Reset Password</Button>
      </Stack>
    </Box>
  );
};

export default resetPasswordPage;
