import './App.css'
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { CreateBlog } from './pages/CreateBlog'
import { Home } from './pages/Home'
import { Landing } from './pages/Landing'
import { Profile } from './pages/Profile'
import { BlogDetails } from './pages/BlogDetails'
import { Navbar } from './components/navbar'
import { Layout } from './components/Layout'
import { useEffect } from 'react'
import axios from 'axios'


function App() {

  useEffect(() => {
    let token = sessionStorage.getItem("User")
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }

  }, [])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route element={<Layout />}>
          <Route path='/home' element={<Home />} />
          <Route path='/createblog' element={<CreateBlog />} />
          <Route path='/blogdetails/:id' element={<BlogDetails />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/profile' element={<Profile />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App
