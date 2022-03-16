import { useSelector } from "react-redux"
import { Box, Text } from "@chakra-ui/react"

const RenderBio = () => {
    const userSelector = useSelector((state)=> state.auth)
    
    return (
        <Box padding="20px" fontSize="24px">
            <Text>{userSelector.bio}</Text>
        </Box>
    )
}

export default RenderBio