import { Button } from "@chakra-ui/button"
import { Image } from "@chakra-ui/image"
import { Text } from "@chakra-ui/layout"

type NavButtonProps = {
  name: string
  text: string
}

const NavButton = ({ name, text }: NavButtonProps) => {
  return (
    <Button
      color="white"
      variant="solid"
      height="32px"
      fontSize="13px"
      background="rgba(255, 255, 255, 0.2)"
      borderRadius="4px"
    >
      <Image src={name} width={{ base: "18px", sm: "16px" }} />
      <Text display={{ base: "none", sm: "block" }} ml="5px">
        {text}
      </Text>
    </Button>
  )
}

export default NavButton
