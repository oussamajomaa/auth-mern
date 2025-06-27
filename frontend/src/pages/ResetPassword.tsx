import { useState } from "react"
import { useParams } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL
export default function ResetPassword() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState("")

    const token = useParams().token
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/
        if (password !== confirmPassword) {
            setError("Les deux mots de passes ne sont pas identiques!")
        } else if (!regex.test(password)) {
            setError("Le mot de passe doit contenir bla bla bla!")
        } else {
            setError('')
            try {
                const response = await fetch(`${API_URL}/auth/reset-password/${token}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ password })
                })
                const data = await response.json()
                console.log(data)
            } catch (err) {
                setError("Internal server")
            }
        }
    }

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 via-purple-300 to-blue-800">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 p-5 shadow-2xl rounded-2xl w-[400px] bg-white/80 backdrop-blur-md border border-white/30">
                <h1 className="text-3xl font-bold">Reset Password</h1>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    placeholder="Nouveau mot de passe..."
                    type="password" className="input input-primary w-full" />
                <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value.trim())}
                    placeholder="Confirmation de mot de passe..."
                    type="password" className="input input-primary w-full" />


                <button className="btn btn-primary">Submit</button>
                <p className="text-red-500">{error}</p>
            </form>
        </div>
    )
}
