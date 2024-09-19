import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import SignUp from "./pages/SignUp"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/signup" element={<SignUp />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
