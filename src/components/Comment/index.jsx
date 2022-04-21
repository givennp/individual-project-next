import { Box, Text, } from "@chakra-ui/react";

const Comment = ({ username, content }) => {
  return (
    <Box color="white" borderBottom="1px solid gray" marginY="1" display="flex" flexDirection="column">
      <Text fontWeight="bold" marginRight="2" fontSize="sm">
        {username}
      </Text>
      <Text marginBottom="8px" fontSize="sm">
        {content}
      </Text>
      
    </Box>
  );
};

export default Comment;