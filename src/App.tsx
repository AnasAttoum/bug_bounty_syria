import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy } from "react"

import Header from "./components/Header"
import SignUp from "./pages/SignUp"
import LogIn from "./pages/LogIn"
import ProfileHeader from "./components/ProfileHeader"

const LazyMain = lazy(() => import("./pages/Main"))
const LazyCompany = lazy(() => import("./pages/Company"))
const LazyProfile = lazy(() => import("./pages/Profile/Profile"))
const LazyProfileSecurity = lazy(() => import("./pages/Profile/ProfileSecurity"))

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>

          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
          <Route index element={<LazyMain />} />
          <Route path="company/:id" element={<LazyCompany />} />

          <Route path="profile" element={<ProfileHeader />} >
            <Route index element={<LazyProfile />} />
            <Route path="security" element={<LazyProfileSecurity />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
