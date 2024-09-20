import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import SignUp from "./pages/SignUp"
import LogIn from "./pages/LogIn"
import Main from "./pages/Main"
import Company from "./pages/Company"
import Profile from "./pages/Profile"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route index element={<Main />} />
          <Route path="company/:id" element={<Company />} />
          <Route path="profile" element={<Profile />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
