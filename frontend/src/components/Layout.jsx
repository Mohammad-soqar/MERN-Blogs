import { useEffect } from "react"
import { Navbar } from "./navbar"
import { Outlet, useNavigate } from "react-router-dom"


export function Layout() {

    const navigate = useNavigate()

    let user = sessionStorage.getItem("User")

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])


    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}