import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';



import Login from './auth/login';
import Signup from './auth/signup';
import ForgotPassword from './auth/forgotPassword';
import ChangePassword from './auth/changePassword';
import VerifyOtp from './auth/otpVerification';

import HomePage from './pages/home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        {/* UNPROTECTED ROUTES */}
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        <Route path='/verify-otp' element={<VerifyOtp />}></Route>
        <Route path='/change-password' element={<ChangePassword />}></Route>
        <Route path='/reset-password' element={<VerifyOtp />}></Route>
        <Route path="*" element={<Error />} />
        
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/dashboard/' element={<HomePage />}></Route>

        {/* PROTECTED ROUTES */}
        {/* <Route element={<ProtectedRoute />}>
          <Route path='/' element={<DashboardHome />}></Route>
        </Route> */}
    </Routes>
    </BrowserRouter>
  )
}

export default App