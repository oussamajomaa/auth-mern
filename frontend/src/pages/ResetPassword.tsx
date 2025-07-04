import axios from "axios"
import { useState } from "react"
import { IoMdArrowRoundBack } from "react-icons/io"
import { Link, useParams } from "react-router-dom"
import InputPassword from "../components/InputPassword"
import { toast } from "react-toastify"

const API_URL = import.meta.env.VITE_API_URL
export default function ResetPassword() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const token = useParams().token
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/
        if (password !== confirmPassword) {
            toast.success("Les mots de passes ne sont pas identiques...", { position: 'top-center', autoClose: 3000 })
            return
        }
        if (!regex.test(password)) {
            toast.success("Le mot de passe doit contenir A a 9 $ &...", { position: 'top-center', autoClose: 3000 })
            return
        }
        try {
            const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, { password })
            toast.success(response.data?.message, { position: 'top-center', autoClose: 3000 })
        } catch (err: any) {
            toast.success(err.response?.data?.message || "Internal server", { position: 'top-center', autoClose: 3000 })
        }
    }


    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-800">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 p-5 shadow-2xl rounded-2xl w-[400px] bg-white/80 backdrop-blur-md border border-white/30">
                <h1 className="text-2xl text-center font-bold">Reset Password Form</h1>
                {/* <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    placeholder="Nouveau mot de passe..."
                    type="password" className="input input-primary w-full" /> */}
                {/* <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value.trim())}
                    placeholder="Confirmation de mot de passe..."
                    type="password" className="input input-primary w-full" /> */}
                <InputPassword password={password} setPassword={setPassword} />
                <InputPassword password={confirmPassword} setPassword={setConfirmPassword} placeholder="confirm password" />

                <div className='flex flex-col gap-1'>
                    <button className="btn btn-primary">Reset password</button>
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
