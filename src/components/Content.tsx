import { Box } from "@chakra-ui/layout"
import Timer from "./Timer"

function Content() {
  return (
    <Box padding="0px 12px" maxWidth="620" margin="auto">
      <Box
        borderBottom="1px"
        borderColor="rgba(0, 0, 0, 0.1)"
        maxWidth="620"
        margin="auto"
        padding="0px 12px"
        marginBottom="40px"
      />
      <Timer />
    </Box>
  )
}

export default Content
