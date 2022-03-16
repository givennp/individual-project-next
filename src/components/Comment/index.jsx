import { Box, Text } from "@chakra-ui/react";

const Comment = ({ username, content }) => {
  return (
    <Box color="white" marginY="1" display="flex" flexDirection="column">
      <Text fontWeight="bold" marginRight="2">
        {username}
      </Text>
      <Text marginBottom="8px">
        {content}
      </Text>
    </Box>
  );
};

export default Comment;