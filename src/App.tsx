import { Box } from "@chakra-ui/layout"
import { useState } from "react"
import Content from "./components/Content"
import Nav from "./components/Nav"
import { ThemeContext, themes } from "./contexts/ThemeContext"
import {
  getSettingFromLocal,
  Setting,
  SettingContext,
} from "./contexts/SettingContext"

function App() {
  const updateSetting = (updatedValue: Setting) => {
    localStorage.setItem("setting", JSON.stringify(updatedValue))
    setConfig(updatedValue)
  }

  const settingFromLocal = getSettingFromLocal()
  const [style, setStyle] = useState(themes.focus)
  const [config, setConfig] = useState(settingFromLocal)

  return (
    <ThemeContext.Provider value={{ theme: style, setStyle }}>
      <SettingContext.Provider value={{ setting: config, updateSetting }}>
        <Box
          backgroundColor={style.background}
          height="100vh"
          transition="background-color 0.5s ease-in-out 0s"
        >
          <Nav />
          <Content />
        </Box>
      </SettingContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App
