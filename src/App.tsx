import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy } from "react"

import Header from "./components/Header"
import SignUp from "./pages/SignUp"
import LogIn from "./pages/LogIn"
import Code from "./pages/Code"
import HeaderMain from "./components/HeaderMain"

const LazyMain = lazy(() => import("./pages/Main"))
const LazyCompany = lazy(() => import("./pages/Company"))
const LazySR = lazy(() => import("./pages/SecurityResearcher"))
const LazyProfile = lazy(() => import("./pages/Profile"))
const LazyBugs = lazy(() => import("./pages/Bugs"))
const LazyCompanyPrograms = lazy(() => import("./pages/CompanyPrograms"))

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="auth/" element={<Header />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
          <Route path="code/:uuid" element={<Code />} />
        </Route>

        <Route path="/" element={<HeaderMain />}>
          <Route index element={<LazyMain />} />
          <Route path="company/:id" element={<LazyCompany />} />
          <Route path="sr/:id" element={<LazySR />} />
          <Route path="bugs" element={<LazyBugs />} />
          <Route path="profile" element={<LazyProfile />} />
          <Route path="programs" element={<LazyCompanyPrograms />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
