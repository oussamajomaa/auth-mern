import { useState } from 'react'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa'

interface INPUTPASSWORD {
    password:string
    setPassword: (value:string)=>void
    placeholder?: string
}
export default function InputPassword({ password, setPassword, placeholder="password" }: INPUTPASSWORD) {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className='relative'>
            <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
                placeholder={placeholder}
                type={showPassword ? "text" : "password"}
                className="input input-primary w-full" />
            <div className='absolute top-3 right-3 z-10 cursor-pointer' onClick={()=>setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaRegEye />}
            </div>
        </div>
    )
}
