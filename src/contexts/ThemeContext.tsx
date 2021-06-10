import { createContext } from "react"

export type Theme = {
  background: string
  bgLow: string
}

export const themes = {
  focus: {
    background: "rgba(219, 82, 77,1)",
    bgLow: "rgba(219, 82, 77,0.5)",
  },
  shortBreak: {
    background: "rgba(70, 142, 145,1)",
    bgLow: "rgba(70, 142, 145,0.5)",
  },
  longBreak: {
    background: "rgba(67, 126, 168,1)",
    bgLow: "rgba(67, 126, 168,0.5)",
  },
}

export const ThemeContext = createContext({
  theme: themes.focus,
  setStyle: (state: Theme) => {
    console.log("default")
  },
})
