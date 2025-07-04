import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from 'react-toastify';


const API_URL = import.meta.env.VITE_API_URL
export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${API_URL}/auth/forgot-password`, { email })
            toast.success(response?.data?.message, {
                position: 'top-center',
                autoClose: 3000
            })

        } catch (err: any) {
            toast.success(err.response?.data?.message, {
                position: 'top-center',
                autoClose: 3000
            })
        }
    }
    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-800">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 p-5 shadow-2xl rounded-2xl w-[400px] bg-white/80 backdrop-blur-md border border-white/30">
                <h1 className="text-2xl text-center font-bold">Recovery password Form</h1>

                <input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    placeholder="Email..."
                    type="email" className="input input-primary w-full" />


                <div className='flex flex-col gap-1'>
                    <button className="btn btn-primary">Recovery password</button>
                    <p className="text-center">OR</p>
                    <Link className='btn btn-neutral flex items-center ' to={'/'}>
                        <IoMdArrowRoundBack className='mr-2' size={20} />
                        Back to Login
                    </Link>
                </div>
            </form>
        </div>
    )
}
