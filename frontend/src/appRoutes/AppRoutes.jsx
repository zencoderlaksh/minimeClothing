import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home"
import Layout from "../layout/Layout"
import Login from '../pages/auth/Login'
import SignUp from '../pages/auth/SignUp'
import Contact from '../pages/contact/Contact';
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path='/contact' element={<Contact />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  )
}

export default AppRoutes