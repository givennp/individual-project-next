import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContentCard from "../../components/ContentCard";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Text,
  Center,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Container,
} from "@chakra-ui/react";
import axiosInstance from "../../configs/api";
import user_types from "../../redux/reducers/types/user";
import { useRouter } from "next/dist/client/router";
import { useDisclosure } from "@chakra-ui/react";
import moment from "moment";


const Upload = () => {
  const authSelector = useSelector((state) => state.auth);
  const [selectedFile, setSelectedFile] = useState(null);

  const router = useRouter()

  const inputFileRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      caption: "",
      location: "",
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
    const { caption, location } = formik.values;

    formData.append("caption", caption);
    formData.append("location", location);
    formData.append("user_id", authSelector.id)
    formData.append("date_created", moment().format('MMMM Do YYYY'));
    formData.append("post_image_file", selectedFile);

    router.push("/")    

    try {
      await axiosInstance.post("/posts", formData);
      setSelectedFile(null);
      formik.setFieldValue("caption", "");
      formik.setFieldValue("location", "");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Box>
        <FormLabel>Caption</FormLabel>
        <Input
          value={formik.values.caption}
          onChange={(e) => formik.setFieldValue("caption", e.target.value)}
        />
        <FormLabel>Location</FormLabel>
        <Input
          value={formik.values.location}
          onChange={(e) => formik.setFieldValue("location", e.target.value)}
        />
        <FormLabel>Image</FormLabel>
        <Input
          accept="image/png, image/jpeg"
          onChange={handleFile}
          ref={inputFileRef}
          type="file"
          display="none"
        />
        <Button
          onClick={() => inputFileRef.current.click()}
          colorScheme="facebook"
        >
          Choose File
        </Button>
        <Button onClick={uploadContentHandler} colorScheme="green" ml={4}>
          Upload Content
        </Button>
      </Box>
    </Container>
  );
};

export default Upload;
