import TickingSlow from "../sound/ticking-slow.mp3"
import TickingFast from "../sound/ticking-fast.mp3"
import useSound from "use-sound"
import { useEffect, useMemo, useState } from "react"

type useTickingSoundProps = {
  vol: number
  selectedIndex: number
}
function useTickingSound({ vol, selectedIndex }: useTickingSoundProps) {
  const [isPlay, setIsPlay] = useState(false)
  vol = vol / 100

  const [playSlow, slow] = useSound(TickingSlow, {
    volume: vol,
    interrupt: true,
  })
  const [playFast, fast] = useSound(TickingFast, {
    volume: vol,
    interrupt: true,
  })

  const AllSound = [
    { play: () => {}, option: { stop: () => {} } },
    { play: playFast, option: fast },
    { play: playSlow, option: slow },
  ]

  useEffect(() => {
    let playInterval: NodeJS.Timeout

    function playSound() {
      console.log(vol)
      const player = AllSound[selectedIndex]
      player.play()
      playInterval = setTimeout(() => {
        console.log("stop")
        player.option.stop()
        setIsPlay(false)
      }, 4000)
    }

    if (isPlay === true) playSound()
    return () => {
      clearTimeout(playInterval)
    }
  }, [isPlay])

  const playTicking = () => {
    setIsPlay(true)
  }

  return [playTicking] as const
}

export default useTickingSound
