import { Button } from "@chakra-ui/button"
import { Box, Center, Flex, Text } from "@chakra-ui/layout"
import { useState } from "react"
import Nav from "./components/Nav"

const bgColor = "rgb(219, 82, 77)"

function App() {
  return (
    <Box backgroundColor={bgColor} height="100vh">
      <Nav />
      <Content />
    </Box>
  )
}

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

function Timer() {
  // type menuType = "podomoro" | "short-break" | "long-break"
  const Menu = [
    {
      id: "#startWork",
      name: "Pomodoro",
    },
    {
      id: "#takeShortBreak",
      name: "Short Break",
    },
    {
      id: "#takeLongBreak",
      name: "Long Break",
    },
  ]
  const [selectedMenu, setSelectedMenu] = useState<number>(0)

  return (
    <Center>
      <Flex
        backgroundColor="rgba(255, 255, 255, 0.1)"
        color="white"
        maxWidth="480px"
        width="100%"
        borderRadius="6px"
        textAlign="center"
        flexDirection="column"
        justifyContent="center"
        padding="20px 0px 30px;"
      >
        <Box>
          {Menu.map(({ id, name }, index) => (
            <Button
              fontSize="16px"
              height="28px"
              key={id}
              background={
                selectedMenu === index ? "rgba(0, 0, 0, 0.15)" : "transparent"
              }
              padding="2px 12px"
              _hover={{}}
              onClick={() => setSelectedMenu(index)}
            >
              {name}
            </Button>
          ))}
        </Box>
        <Text
          marginTop="20px"
          fontSize={{ base: "100px", md: "120px" }}
          width="100%"
        >
          25:00
        </Text>

        <Center>
          <Button
            color="rgb(219, 82, 77)"
            borderRadius="4px"
            width="200px"
            fontSize="22px"
            height="55px"
            boxShadow="rgb(235 235 235) 0px 6px 0px"
            backgroundColor="white"
          >
            START
          </Button>
        </Center>
      </Flex>
    </Center>
  )
}

export default App
