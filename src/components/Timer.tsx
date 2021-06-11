import { Button } from "@chakra-ui/button"
import { Box, Center, Flex, Text } from "@chakra-ui/layout"
import { useCallback, useContext, useEffect, useState } from "react"
import { SettingContext } from "../contexts/SettingContext"
import { ThemeContext, themes } from "../contexts/ThemeContext"
import { secondToString } from "../utils"

function Timer() {
  type timerState = "stop" | "start" | "pause"
  type menu = "focus" | "shortBreak" | "longBreak"

  // context state
  const { theme, setStyle } = useContext(ThemeContext)
  const { setting } = useContext(SettingContext)
  const { time, autoStartBreak, autoStartFocus } = setting

  // component state
  const [selectedMenu, setSelectedMenu] = useState<menu>("focus")
  const [second, setSecond] = useState<number>(
    setting.time[selectedMenu].min * 60
  )
  const [breakCount, setBreakCount] = useState(0)
  const [isStart, setIsStart] = useState<timerState>("stop")

  const handleChangeMode = useCallback(
    (key: menu, second: number) => {
      setIsStart("stop")
      setSelectedMenu(key)
      setSecond(second)
      setStyle(themes[key])

      if (key !== "focus") {
        document.title = secondToString(second) + " - Time for a break"
      } else {
        document.title = secondToString(second) + " - Time to work!"
      }
    },
    [setStyle]
  )

  useEffect(() => {
    let interValSeccond: NodeJS.Timeout
    if (isStart === "start") {
      if (second === 0) {
        if (selectedMenu === "focus") {
          if (breakCount === setting.longBreakInterval) {
            handleChangeMode("longBreak", time["longBreak"].min * 60)
            setBreakCount(0)
          } else {
            setBreakCount((breakCount) => breakCount + 1)
            handleChangeMode("shortBreak", time["shortBreak"].min * 60)
          }
          autoStartBreak && setIsStart("start")
        } else {
          handleChangeMode("focus", time["focus"].min * 60)
          autoStartFocus && setIsStart("start")
        }
      }
      interValSeccond = setInterval(() => {
        setSecond((second) => second - 1)
      }, 1000)
      document.title = secondToString(second) + " - Time for a break"
    }
    if (isStart === "stop") {
      setSecond(setting.time[selectedMenu].min * 60)
    }

    return () => {
      clearInterval(interValSeccond)
    }
  }, [
    isStart,
    second,
    selectedMenu,
    setting,
    breakCount,
    handleChangeMode,
    time,
    autoStartBreak,
    autoStartFocus,
  ])

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
          {Object.entries(setting.time).map(([key, { id, min, name }]) => (
            <Button
              fontSize="16px"
              height="28px"
              key={id}
              background={
                selectedMenu === key ? "rgba(0, 0, 0, 0.15)" : "transparent"
              }
              padding="2px 12px"
              _hover={{}}
              _active={{
                paddingTop: "6px",
              }}
              onClick={() => handleChangeMode(key as menu, min * 60)}
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
          {secondToString(second)}
        </Text>
        <Center>
          <Button
            color={theme.background}
            borderRadius="4px"
            width="200px"
            fontSize="22px"
            height="55px"
            boxShadow="rgb(235 235 235) 0px 6px 0px"
            backgroundColor="white"
            _hover={{}}
            _active={
              {
                // boxShadow: "rgb(235 235 235) 0px 6px 0px",
              }
            }
            onClick={() => {
              if (isStart === "stop" || isStart === "pause") setIsStart("start")
              else setIsStart("pause")
            }}
          >
            {isStart !== "start" ? "START" : "PAUSE"}
          </Button>
        </Center>
      </Flex>
    </Center>
  )
}

export default Timer
