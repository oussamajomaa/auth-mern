import {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { IoMdArrowRoundBack } from "react-icons/io";



const API_URL=import.meta.env.VITE_API_URL
export default function ForgotPassword() {
    const [email,setEmail] = useState('')
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${API_URL}/auth/forgot-password`, {email})
            console.log(response)

        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-800">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 p-5 shadow-2xl rounded-2xl w-[400px] bg-white/80 backdrop-blur-md border border-white/30">
                <h1 className="text-2xl text-center font-bold">Recovery password Form</h1>

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    placeholder="Email..."
                    type="email" className="input input-primary w-full" />
               

                <button className="btn btn-primary">Submit</button>
                    <Link className='link-primary flex items-center justify-end' to={'/'}>
                        <IoMdArrowRoundBack className='mr-2' size={20} /> 
                        Back to Login
                    </Link>
            </form>
        </div>
    )
}
