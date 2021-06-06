import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "focus-visible/dist/focus-visible"
import { ChakraProvider } from "@chakra-ui/react"
import { css, Global } from "@emotion/react"

const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Global styles={GlobalStyles} />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
