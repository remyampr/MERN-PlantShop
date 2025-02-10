

import { Outlet } from "react-router-dom"
import "./App.css"
import HeaderSection from "./component/HeaderSection"
import FooterSection from "./component/FooterSection"
import ScrollToTop from "./component/ScrollToTop"

const App = () => {
  return (
    <>
    <ScrollToTop/>
      <HeaderSection/>
      <main className="content-container">
        <Outlet/>
      </main>
      <FooterSection/>
      </>
  )
}

export default App