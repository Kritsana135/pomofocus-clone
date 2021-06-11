import useSound from "use-sound"

import sound1 from "../sound/button-press.wav"
import sound2 from "../sound/alarm-bell.mp3"
import { Button } from "@chakra-ui/button"

const sourceOrderMapping = {
  wav_mp3: [sound1, sound2],
  mp3_wav: [sound2, sound1],
}

const MultipleSourcesDemo = () => {
  const [play, test] = useSound(sound2)

  return (
    <>
      {console.log(test)}
      <Button onClick={() => play()}>Play sound</Button>
    </>
  )
}

export default MultipleSourcesDemo
