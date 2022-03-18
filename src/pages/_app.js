import { Box, Center, ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../redux/store";
import HomePage from "../pages/home";
import MyProfilePage from "../pages/Myprofile";
import LoginPage from "../pages/login";
import Navbar from "../components/Navbar";
import "./_apps.css";
import AuthProvider from "../components/AuthProvider";

const store = createStore(rootReducer);

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <AuthProvider>
        <ChakraProvider>
          <Navbar />
          <Center>
            <Box paddingX="16">
              <Component {...pageProps} />
            </Box>
          </Center>
        </ChakraProvider>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
