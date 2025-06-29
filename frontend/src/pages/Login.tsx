import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_URL=import.meta.env.VITE_API_URL
export default function Login() {
    
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {email,password})
            console.log(response)
            navigate('/home')

        } catch (e:any) {
            console.log(e.response?.data?.message)
        }
    }

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-800">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 p-5 shadow-2xl rounded-2xl w-[400px] bg-white/80 backdrop-blur-md border border-white/30">
                <h1 className="text-2xl text-center font-bold">Login Form</h1>
                
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

                <button className="btn btn-primary">Submit</button>
                <div className='flex justify-between'>
                    <Link className='link-primary' to={'/forgot-password'}>Forgot password word?</Link>
                    <Link className='link-primary' to={'/register'}>Sign up</Link>
                </div>
            </form>
        </div>
    )
}
