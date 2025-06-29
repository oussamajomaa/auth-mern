import axios from 'axios'
import { useState } from 'react'

const API_URL=import.meta.env.VITE_API_URL

export default function Register() {
    const [username,setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/
        if (password !== confirmPassword) {
            setError("Les mots de passes ne sont pas identiques!") 
            return
        }
        if (!regex.test(password)) {
            setError("Le mot de passe doit contenir A a 9 $ &...") 
            return
        }
        try {
            const response = await axios.post(`${API_URL}/auth/register`, { username, email, password })
            setError('')
            console.log(response)

        } catch (err:any) {
            console.log(err.response?.data?.message)
        }
    }

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-800">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 p-5 shadow-2xl rounded-2xl w-[400px] bg-white/80 backdrop-blur-md border border-white/30">
                <h1 className="text-2xl text-center font-bold">Register Form</h1>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value.trim())}
                    placeholder="Username..."
                    type="text" className="input input-primary w-full" />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    placeholder="Email..."
                    type="email" className="input input-primary w-full" />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    placeholder="Password..."
                    type="password" className="input input-primary w-full" />
                <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value.trim())}
                    placeholder="COnfirm Password..."
                    type="password" className="input input-primary w-full" />

                <button className="btn btn-primary">Submit</button>
                <p className='text-red-600'>{error}</p>
            </form>
        </div>
    )
}
