import {
  Box,
  Text,
  Button,
  Stack,
  Collapse,
  Icon,
  Center,
  Avatar,
  Flex
} from "@chakra-ui/react";
import { RiBarChart2Fill } from "react-icons/ri";
import { TiHome } from "react-icons/ti";
import { BiTrendingUp } from "react-icons/bi";
import { FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";

const SideBar = () => {
    return (
      <Box display="flex" color="white" top="5" left="5">
        <Box height="200px" width="fit-content">
          <Text display="flex" alignItem="center">
            <Icon as={TiHome} boxSize="7" />
            Hot
          </Text>
          <Text>
            <Icon as={BiTrendingUp} boxSize="7" />
            Trending
          </Text>
          <Text>
            <Icon as={FiClock} boxSize="7" />
            Fresh
          </Text>
          <Text>
            <Icon as={RiBarChart2Fill} boxSize="7" />
            Top
          </Text>
        </Box>

      </Box>
    );

};

export default SideBar;
