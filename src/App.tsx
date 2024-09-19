import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import SignUp from "./pages/SignUp"
import LogIn from "./pages/LogIn"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
