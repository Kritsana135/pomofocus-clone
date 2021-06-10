import { createContext } from "react"

const setting = {
  time: {
    focus: { name: "Pomodoro", min: 25, id: "focus" },
    shortBreak: { name: "Short Break", min: 5, id: "shortBreak" },
    longBreak: { name: "Long Break", min: 15, id: "longBreak" },
  },
  autoStartBreak: false,
  autoStartFocus: false,
  longBreakInterval: 4,
  alarmSound: {
    selectedIndex: 0,
    level: 50,
    repeat: 1,
    allSound: [
      {
        name: "Kitchen",
      },
      {
        name: "Bell",
      },
      {
        name: "Bird",
      },
      {
        name: "Digital",
      },
      {
        name: "Wood",
      },
    ],
  },
  tickingSound: {
    selectedIndex: 0,
    level: 50,
    allTicking: [
      {
        name: "None",
      },
      {
        name: "Ticking Fast",
      },
      {
        name: "Ticking Slow",
      },
    ],
  },
}

const getSettingFromLocal = () => {
  let settingFromLocal = localStorage.getItem("setting")
  if (settingFromLocal == null) {
    return setting
  } else {
    return JSON.parse(settingFromLocal)
  }
}

if (localStorage.getItem("setting") == null) {
  localStorage.setItem("setting", JSON.stringify(setting))
}

export type Setting = typeof setting

const SettingContext = createContext({
  setting,
  updateSetting: (state: Setting) => {
    console.log("default updateSetting Function")
  },
})

export { SettingContext, getSettingFromLocal, setting }
