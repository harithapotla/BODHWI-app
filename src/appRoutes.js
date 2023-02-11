import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminComponenet from './components/admin/admin'
import HomeComponent from './components/home/home'
import LoginCompoenent from './components/login/login'

const AppRoutes = () => {

  return (
<BrowserRouter>
<Routes>
<Route path="/" element={<LoginCompoenent/>}></Route>
<Route path="/home" element={<HomeComponent/>}></Route>
<Route path="/admin" element={<AdminComponenet/>}></Route>
</Routes>
</BrowserRouter>

  )
}

export default AppRoutes