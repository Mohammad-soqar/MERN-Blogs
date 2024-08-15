import { SignUp } from "../components/SignUp"
import { Login } from "../components/Login"
import { useState } from "react"


export function Landing() {

    const [view, setView] = useState(0)

    return (
        <>
            {!view ?
                <>
                    <Login />
                    <button onClick={() =>setView(!view)}>Sign Up</button>
                </> :
                <>
                    <SignUp />
                    <button onClick={() =>setView(!view)}>Login</button>
                </>
            }


        </>
    )
}