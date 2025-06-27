import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ResetPassword from "./pages/ResetPassword"


function App() {

	return (
		<Router>
			<Routes>
				<Route path="/reset-password/:token" element={<ResetPassword />} />
			</Routes>
		</Router>
	)
}

export default App
