import { Center, Flex, HStack, Spacer, Text } from "@chakra-ui/layout"
import NavButton from "./NavButton"
import { Image } from "@chakra-ui/image"
// image
import graph from "../images/graph-white.png"
import setting from "../images/config-white.png"
import people from "../images/user-white.png"
import right from "../images/icon-white.png"
import { useDisclosure } from "@chakra-ui/hooks"
import SettingModal from "./SettingModal"

const Nav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Flex maxWidth="620" margin="auto" height="60px" padding="0px 12px">
        <Center>
          <Image src={right} boxSize="5" ml="2px" />
          <Text fontWeight="bold" fontSize="20px" color="white" ml="1">
            Pomofocus
          </Text>
        </Center>
        <Spacer />
        <Center display="flex" width="278.5px" justifyContent="flex-end">
          <HStack>
            <NavButton name={graph} text="Report" />
            <NavButton name={setting} text="Setting" toggleButton={onOpen} />
            <NavButton name={people} text="Login" />
          </HStack>
        </Center>
      </Flex>
      <SettingModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Nav
