import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ResetPassword from "./pages/ResetPassword"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import Navbar from "./components/Navbar"
import UserContext, { type USER } from "./UserContext";
import { useState } from "react"
import { ToastContainer } from "react-toastify"





function App() {
	const [user, setUser] = useState<USER | null>(null)

	return (
		// <UserContext.Provider value={{ user, setUser }}>
		<Router>
			{/* <Navbar /> */}
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/home" element={<Home />} />
				<Route path="/reset-password/:token" element={<ResetPassword />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
			</Routes>
			<ToastContainer />
		</Router>
		// </UserContext.Provider>
	)
}

export default App
