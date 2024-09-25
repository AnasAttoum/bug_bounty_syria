import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy } from "react"

import Header from "./components/Header"
import SignUp from "./pages/SignUp"
import LogIn from "./pages/LogIn"

const LazyMain = lazy(() => import("./pages/Main"))
const LazyCompany = lazy(() => import("./pages/Company"))
const LazyProfile = lazy(() => import("./pages/Profile"))
const LazyBugs = lazy(() => import("./pages/Bugs"))

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>

          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
          <Route index element={<LazyMain />} />
          <Route path="company/:id" element={<LazyCompany />} />
          <Route path="bugs" element={<LazyBugs />} />
          <Route path="profile" element={<LazyProfile />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
