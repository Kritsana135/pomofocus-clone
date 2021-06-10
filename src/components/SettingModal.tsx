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
import { Select } from "@chakra-ui/select"
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
          <Select
            width="40%"
            defaultValue={alarmSound.allSound[alarmSound.selectedIndex].name}
            placeholder={alarmSound.allSound[alarmSound.selectedIndex].name}
            size="lg"
            onChange={(e) => {
              setTemptSetting({
                ...temptSetting,
                alarmSound: {
                  ...temptSetting.alarmSound,
                  selectedIndex: parseInt(e.target.value),
                },
              })
            }}
          >
            {alarmSound.allSound.map(({ name }, index) => {
              return (
                <option value={index} key={index}>
                  {name}
                </option>
              )
            })}
          </Select>
        ),
      },
      {
        id: "as2",
        TuneComponent: (
          <Box width="40%">
            <Slider
              aria-label="slider-ex-4"
              defaultValue={alarmSound.level}
              onChange={(val) => {
                console.log(val)
                setTemptSetting({
                  ...temptSetting,
                  alarmSound: {
                    ...temptSetting.alarmSound,
                    level: val,
                  },
                })
              }}
            >
              <SliderTrack bg={theme.bgLow}>
                <SliderFilledTrack bg={theme.background} />
              </SliderTrack>
              <SliderThumb boxSize={6} backgroundColor="black" color="white">
                {alarmSound.level}
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
          <Select
            width="40%"
            size="lg"
            defaultValue={
              tickingSound.allTicking[tickingSound.selectedIndex].name
            }
            placeholder={
              tickingSound.allTicking[tickingSound.selectedIndex].name
            }
            onChange={(e) => {
              setTemptSetting({
                ...temptSetting,
                tickingSound: {
                  ...temptSetting.tickingSound,
                  selectedIndex: parseInt(e.target.value),
                },
              })
            }}
          >
            {tickingSound.allTicking.map(({ name }, index) => {
              return (
                <option value={index} key={index}>
                  {name}
                </option>
              )
            })}
          </Select>
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
                console.log(val)
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
      {console.log(
        alarmSound.selectedIndex,
        alarmSound.allSound[alarmSound.selectedIndex].name
      )}
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
