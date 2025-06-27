import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ResetPassword from "./pages/ResetPassword"
import Login from "./pages/Login"
import Home from "./pages/Home"


function App() {

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/home" element={<Home />} />
				<Route path="/reset-password/:token" element={<ResetPassword />} />
			</Routes>
		</Router>
	)
}

export default App
