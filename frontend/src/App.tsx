import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ResetPassword from "./pages/ResetPassword"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"


function App() {

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/home" element={<Home />} />
				<Route path="/reset-password/:token" element={<ResetPassword />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
			</Routes>
		</Router>
	)
}

export default App
