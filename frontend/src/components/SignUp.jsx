import { createUser } from "../api"
import { useState } from "react"


export function SignUp() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await createUser(user) 
        if(response.status !== 200){
            alert("Error happened")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="name" placeholder="Name" onChange={handleChange} maxLength={20} required name="name" />
            <input type="email" placeholder="Email" onChange={handleChange} maxLength={50} required name="email"  />
            <input type="Password" placeholder="password" onChange={handleChange} maxLength={20} required name="password"/>
            <button type="submit">Sign Up</button>
        </form>
    )
}