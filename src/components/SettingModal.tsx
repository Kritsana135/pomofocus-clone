import { Button } from "@chakra-ui/button"
import { UseDisclosureProps } from "@chakra-ui/hooks"
import { Box, Flex, Spacer, Text } from "@chakra-ui/layout"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal"
import { NumberInput, NumberInputField } from "@chakra-ui/number-input"
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/slider"
import { Switch } from "@chakra-ui/switch"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { SettingContext } from "../contexts/SettingContext"
import { ThemeContext } from "../contexts/ThemeContext"
import SubSetting from "./SubSetting"

// sound import
import useSound from "use-sound"
import switchSfx from "../sound/switch-1.wav"
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu"
import { ChevronDownIcon } from "@chakra-ui/icons"
import useAlarmSound from "../hooks/useAlarmSound"

const SettingModal = ({
  isOpen = false,
  onClose = () => {},
}: UseDisclosureProps) => {
  const inputStyle = {
    backgroundColor: "rgb(239, 239, 239)",
    borderRadius: "4px",
  }

  const { theme } = useContext(ThemeContext)
  const { setting, updateSetting } = useContext(SettingContext)
  const [temptSetting, setTemptSetting] = useState(setting)
  const { time, alarmSound, tickingSound } = temptSetting
  const alarmVol = alarmSound.level
  const selectedIndex = alarmSound.selectedIndex
  const [playSwitch] = useSound(switchSfx, { volume: alarmVol })
  const [play] = useAlarmSound({
    alarmVol,
    selectedIndex,
    repeat: 1,
  })

  const realUpdate = () => {
    onClose()
    updateSetting(temptSetting)
  }

  const handleChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    let key = e.target.name as keyof typeof temptSetting.time
    let temptVar = {
      ...temptSetting.time[key],
      min: parseInt(e.target.value),
    }
    setTemptSetting({
      ...temptSetting,
      time: {
        ...temptSetting.time,
        [key]: temptVar,
      },
    })
  }

  useEffect(() => {
    console.log("call clear setting effect")
    setTemptSetting(setting)
  }, [isOpen, setting])

  const subSetting = [
    [
      {
        id: "atb",
        keySetting: "Auto start Breaks?",
        TuneComponent: (
          <Switch
            size="lg"
            defaultChecked={setting.autoStartBreak}
            onChange={() => {
              setTemptSetting({
                ...temptSetting,
                autoStartBreak: !temptSetting.autoStartBreak,
              })
              playSwitch()
            }}
          />
        ),
      },
    ],
    [
      {
        id: "atp",
        keySetting: "Auto start Pomodoros?",
        TuneComponent: (
          <Switch
            size="lg"
            defaultChecked={setting.autoStartFocus}
            onChange={() => {
              setTemptSetting({
                ...temptSetting,
                autoStartFocus: !temptSetting.autoStartFocus,
              })
              playSwitch()
            }}
          />
        ),
      },
    ],
    [
      {
        id: "lbi",
        keySetting: "Long Break interval",
        TuneComponent: (
          <NumberInput
            defaultValue={setting.longBreakInterval}
            min={0}
            {...inputStyle}
            width="70px"
          >
            <NumberInputField
              onChange={(e) => {
                setTemptSetting({
                  ...temptSetting,
                  longBreakInterval: parseInt(e.target.value),
                })
              }}
            />
          </NumberInput>
        ),
      },
    ],
    [
      {
        id: "as",
        keySetting: "Alarm Sound",
        TuneComponent: (
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {alarmSound.allSound[alarmSound.selectedIndex]}
            </MenuButton>
            <MenuList zIndex="100">
              {alarmSound.allSound.map((name, index) => {
                return (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      setTemptSetting({
                        ...temptSetting,
                        alarmSound: {
                          ...temptSetting.alarmSound,
                          selectedIndex: index,
                        },
                      })
                      play()
                    }}
                  >
                    {name}
                  </MenuItem>
                )
              })}
            </MenuList>
          </Menu>
        ),
      },
      {
        id: "as2",
        TuneComponent: (
          <Box width="40%">
            <Slider
              aria-label="slider-ex-4"
              defaultValue={alarmSound.level * 100}
              onChangeEnd={(val) => {
                setTemptSetting({
                  ...temptSetting,
                  alarmSound: {
                    ...temptSetting.alarmSound,
                    level: val / 100,
                  },
                })
                play()
              }}
            >
              <SliderTrack bg={theme.bgLow}>
                <SliderFilledTrack bg={theme.background} />
              </SliderTrack>
              <SliderThumb boxSize={6} backgroundColor="black" color="white">
                {Math.floor(alarmSound.level * 100)}
              </SliderThumb>
            </Slider>
          </Box>
        ),
      },
      {
        id: "as3",
        TuneComponent: (
          <Flex flexDirection="row" alignItems="center" width="40%">
            <Text>repeat</Text>
            <Spacer />
            <NumberInput
              defaultValue={setting.alarmSound.repeat}
              min={0}
              {...inputStyle}
              width="70px"
            >
              <NumberInputField
                onChange={(e) => {
                  setTemptSetting({
                    ...temptSetting,
                    alarmSound: {
                      ...temptSetting.alarmSound,
                      repeat: parseInt(e.target.value),
                    },
                  })
                }}
              />
            </NumberInput>
          </Flex>
        ),
      },
    ],
    [
      {
        id: "ts",
        keySetting: "Ticking Sound",
        TuneComponent: (
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {tickingSound.allTicking[tickingSound.selectedIndex].name}
            </MenuButton>
            <MenuList zIndex="100">
              {tickingSound.allTicking.map(({ name }, index) => {
                return (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      setTemptSetting({
                        ...temptSetting,
                        tickingSound: {
                          ...temptSetting.tickingSound,
                          selectedIndex: index,
                        },
                      })
                    }}
                  >
                    {name}
                  </MenuItem>
                )
              })}
            </MenuList>
          </Menu>
        ),
      },
      {
        id: "ts2",
        TuneComponent: (
          <Box width="40%">
            <Slider
              aria-label="slider-ex-4"
              defaultValue={tickingSound.level}
              onChange={(val) => {
                setTemptSetting({
                  ...temptSetting,
                  tickingSound: {
                    ...temptSetting.tickingSound,
                    level: val,
                  },
                })
              }}
            >
              <SliderTrack bg={theme.bgLow}>
                <SliderFilledTrack bg={theme.background} />
              </SliderTrack>
              <SliderThumb boxSize={6} backgroundColor="black" color="white">
                {tickingSound.level}
              </SliderThumb>
            </Slider>
          </Box>
        ),
      },
    ],
  ]

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="16px" color="rgb(187, 187, 187)">
            TIMER SETTING
          </ModalHeader>
          <ModalCloseButton color="rgb(187, 187, 187)" />
          <ModalBody>
            <Box
              borderTop="1px solid rgba(182, 165, 166, 0.2)"
              padding="20px 0px"
              minHeight="30px"
            >
              <Text>Time (minutes)</Text>
              <Flex justifyContent="space-between">
                <Box width="98px">
                  <Text>Pomodoro</Text>
                  <NumberInput
                    defaultValue={time.focus.min}
                    min={0}
                    {...inputStyle}
                  >
                    <NumberInputField
                      name="focus"
                      onChange={handleChangeTime}
                    />
                  </NumberInput>
                </Box>
                <Box width="98px">
                  <Text>ShortBreak</Text>
                  <NumberInput
                    defaultValue={time.shortBreak.min}
                    min={0}
                    {...inputStyle}
                  >
                    <NumberInputField
                      name="shortBreak"
                      onChange={handleChangeTime}
                    />
                  </NumberInput>
                </Box>
                <Box width="98px">
                  <Text>Long Break</Text>
                  <NumberInput
                    defaultValue={time.longBreak.min}
                    min={0}
                    {...inputStyle}
                  >
                    <NumberInputField
                      name="longBreak"
                      onChange={handleChangeTime}
                    />
                  </NumberInput>
                </Box>
              </Flex>
            </Box>
            <SubSetting setting={subSetting} />
          </ModalBody>

          <ModalFooter backgroundColor="rgb(239, 239, 239)" borderRadius="4px">
            <Button
              color="white"
              backgroundColor="rgba(34, 34, 34,0.9)"
              mr={3}
              onClick={realUpdate}
              _hover={{
                backgroundColor: "rgba(34, 34, 34,1)",
              }}
            >
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SettingModal
