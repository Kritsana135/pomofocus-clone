const secondToString = (second: number) => {
  return (second - (second %= 60)) / 60 + (9 < second ? ":" : ":0") + second
}

export { secondToString }
