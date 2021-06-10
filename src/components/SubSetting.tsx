import { Box, Flex, Spacer, Text } from "@chakra-ui/layout"

export interface SubSettingProps {
  keySetting?: string
  TuneComponent: React.ReactNode
  id: string
}

const SubSetting = (props: { setting: Array<SubSettingProps[]> }) => {
  const { setting } = props
  return (
    <>
      {setting.map((item, index) => {
        return (
          <Flex
            borderTop="1px solid rgba(182, 165, 166, 0.2)"
            padding="20px 0px"
            minHeight="30px"
            flexDirection="column"
            key={index}
          >
            {item.map(({ TuneComponent, keySetting, id }, index2) => {
              return (
                <Flex
                  alignItems="center"
                  key={id}
                  mt={index2 > 0 ? "1rem" : "none"}
                >
                  <Box>
                    <Text>{keySetting}</Text>
                  </Box>
                  <Spacer />
                  <>{TuneComponent}</>
                </Flex>
              )
            })}
          </Flex>
        )
      })}
    </>
  )
}

export default SubSetting
