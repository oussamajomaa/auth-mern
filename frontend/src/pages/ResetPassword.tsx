import { useState } from "react"
import { useParams } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL
export default function ResetPassword() {
    const [password, setPassword]=useState('')
    const token = useParams().token
    console.log(API_URL)
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('form submitted')
        const response = await fetch(`${API_URL}/auth/reset-password/${token}`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password})
        })
        const data = await response.json()
        console.log(data)
    } 

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 via-purple-300 to-blue-800">
        <form 
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 p-5 shadow-2xl rounded-2xl w-[400px] bg-white/80 backdrop-blur-md border border-white/30">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <input
                onChange={(e)=> setPassword(e.target.value)} 
                placeholder="Nouveau mot de passe..."
                type="text" className="input input-primary w-full" />
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}
