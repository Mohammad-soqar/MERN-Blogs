import { BlogCard } from "../components/BlogCard"
import { useState, useEffect } from "react"
import { getPosts } from "../api"
import * as jwt_decode from "jwt-decode"


export function Profile() {

    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        async function loadUserData() {
            const token = sessionStorage.getItem("User")
            const decodedUser = jwt_decode.jwtDecode(token)
            const allPosts = await getPosts()
            const filteredPosts = allPosts.filter((post) => post.author == decodedUser.id)
            setPosts(filteredPosts)
            setUser(decodedUser)
        }
        loadUserData()
    }, [])

       // Format the createdAt date
       const formattedJoinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""


    return (
        <>
            <label>Name</label>
            <h2>{user.name}</h2>
            <label>Email</label>
            <h2>{user.email}</h2>
            <label>Join Date</label>
            <h2>{formattedJoinDate}</h2>
            {posts.map((post)=>{
                return(
                    <BlogCard post={post} />
                )
            })}
        </>
    )
}