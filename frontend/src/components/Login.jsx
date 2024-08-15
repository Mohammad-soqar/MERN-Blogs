import { verifyUser } from "../api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"


export function Login() {

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const navigate = useNavigate()

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await verifyUser(user)
        console.log(response)
        if (response) {
            sessionStorage.setItem("User", response)
            axios.defaults.headers.common["Authorization"] = `Bearer ${response}`
            navigate("/home")
        } else {
            
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" onChange={handleChange} maxLength={50} required name="email" />
            <input type="Password" placeholder="password" onChange={handleChange} maxLength={20} required name="password" />
            <button type="submit">Login</button>
        </form>
    )
}