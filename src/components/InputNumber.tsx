import { Input } from "@chakra-ui/react"
import { ChangeEvent, useState } from "react"

type InputNumberProps = {
  value: number
  width: string
  isDecimal: boolean
  callback: (changeNum: number) => void
}

function InputNumber({ value, width, isDecimal, callback }: InputNumberProps) {
  const [val, setVal] = useState(value)

  const handleValChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setVal(0)
      return callback(0)
    }

    const newVal = isDecimal
      ? parseInt(e.target.value)
      : parseFloat(e.target.value)
    if (!isNaN(newVal)) {
      callback(newVal)
      return setVal(newVal)
    }
  }

  return (
    <Input value={val} onChange={(e) => handleValChange(e)} width={width} />
  )
}

export default InputNumber
