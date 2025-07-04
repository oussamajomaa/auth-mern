import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL

export default function Navbar() {
    // const { user, setUser } = useContext(UserContext);
    const logout = async () => {
        try {
            const response = await axios.get(`${API_URL}/auth/logout`)
            console.log(response)
            // setUser(null);
            localStorage.clear()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <nav className="h-16 px-5 bg-amber-300 flex justify-between items-center">
            <ul className="flex gap-5">
                <li>
                    <Link to={'/home'}>Home</Link>
                </li>
                <li>
                    <Link to={'/'}>Login</Link>
                </li>
                <li>
                    <Link to={'/register'}>Register</Link>
                </li>
            </ul>
            <div className="flex gap-5 items-center">

                localstorage: {localStorage.getItem('username')}
                <button className="btn btn-primary" onClick={logout}>Logout</button>
                {/* useContext: {user && user.username} */}
            </div>
        </nav>
    )
}
