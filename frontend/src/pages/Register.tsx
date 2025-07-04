import axios from 'axios'
import { useState } from 'react'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import InputPassword from '../components/InputPassword'
import { toast } from 'react-toastify'


const API_URL = import.meta.env.VITE_API_URL

export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/
        if (password !== confirmPassword) {
            toast.error('Les mots de passes ne sont pas identiques!', {
                position: 'top-center',
                autoClose: 3000
            })
            return
        }
        if (!regex.test(password)) {
            toast.error('Le mot de passe doit contenir A a 9 $ &...', {
                position: 'top-center',
                autoClose: 3000
            })
            return
        }
        try {
            const response = await axios.post(`${API_URL}/auth/register`, { username, email, password })
            toast.success(response?.data?.message, {
                position: 'top-center',
                autoClose: 3000
            })
            console.log(response)

        } catch (err: any) {
            toast.error(err.response?.data?.message, {
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

                <InputPassword password={password} setPassword={setPassword} />
                <InputPassword password={confirmPassword} setPassword={setConfirmPassword} placeholder='confirm password' />
                {/* <div className='relative'>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value.trim())}
                        placeholder="Password..."
                        type={showPassword ? "text" : "password"}
                        className="input input-primary w-full" />
                    <div className='absolute top-3 right-3 z-10 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                    </div>
                </div> */}

                {/* <div className='relative'>
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value.trim())}
                        placeholder="Password..."
                        type={showPassword ? "text" : "password"}
                        className="input input-primary w-full" />
                    <div className='absolute top-3 right-3 z-10 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                    </div>
                </div> */}

                <div className='flex flex-col gap-1'>
                    <button className="btn btn-primary">SIgn up</button>
                    <p className='text-center'>OR</p>
                    <Link className='btn btn-neutral' to={'/'}>Sign in</Link>
                </div>
            </form>
        </div>
    )
}
