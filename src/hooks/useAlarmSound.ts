import Kitchen from "../sound/alarm-kitchen.mp3"
import Bell from "../sound/alarm-bell.mp3"
import Bird from "../sound/alarm-bird.mp3"
import Digital from "../sound/alarm-digital.mp3"
import Wood from "../sound/alarm-wood.mp3"
import useSound from "use-sound"
import { useEffect, useState } from "react"

type useAlarmSoundProps = {
  alarmVol: number
  selectedIndex: number
  repeat: number
}
function useAlarmSound({
  alarmVol,
  selectedIndex,
  repeat,
}: useAlarmSoundProps) {
  const [isPlayAlarm, setIsPlayAlarm] = useState(false)
  const [repeatCount, setRepeatCount] = useState(0)

  const [playKitchen, kitchen] = useSound(Kitchen, { volume: alarmVol })
  const [playBell, bell] = useSound(Bell, { volume: alarmVol })
  const [playBird, bird] = useSound(Bird, { volume: alarmVol })
  const [playDigital, digital] = useSound(Digital, { volume: alarmVol })
  const [playWood, wood] = useSound(Wood, { volume: alarmVol })

  const AllAlarmSound = [
    { play: playKitchen, option: kitchen },
    { play: playBell, option: bell },
    { play: playBird, option: bird },
    { play: playDigital, option: digital },
    { play: playWood, option: wood },
  ]

  useEffect(() => {
    console.log("call useAlarmSound effect", repeatCount)
    console.log(alarmVol, selectedIndex)
    let playInterval: NodeJS.Timeout
    function playAlarm() {
      const player = AllAlarmSound[selectedIndex]
      const waitTime =
        player.option.duration !== null ? player.option.duration : 0

      if (repeatCount === 0) {
        player.play()
        setRepeatCount((repeatCount) => repeatCount + 1)
      } else {
        playInterval = setInterval(() => {
          player.play()
          setRepeatCount((repeatCount) => repeatCount + 1)
        }, waitTime)
      }
    }

    if (repeatCount < repeat && isPlayAlarm) {
      playAlarm()
    } else {
      setIsPlayAlarm(false)
      setRepeatCount(0)
    }
    return () => {
      clearInterval(playInterval)
    }
  }, [repeatCount, isPlayAlarm])

  const play = () => {
    setIsPlayAlarm(true)
  }

  return [play] as const
}

export default useAlarmSound
