import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Login from './auth/login';
import Signup from './auth/signup';
import ForgotPassword from './auth/forgotPassword';
import ChangePassword from './auth/changePassword';
import VerifyOtp from './auth/otpVerification';

import HomePage from './pages/home';
import Events from './pages/events';
import CreateEvents from './pages/createEvent';
import EventDetails from './pages/eventDetails';
import NewWithdrawal from './pages/newWithdrawal';
import Withdrawals from './pages/withdrawals';
import Supports from './pages/support';
import CreateSupport from './pages/createSupport';
import Transactions from './pages/transactions';
import Profile from './pages/profile';
import ProtectedRoute from './utils/ProtectedRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* UNPROTECTED ROUTES */}
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        <Route path='/verify-otp' element={<VerifyOtp />}></Route>
        <Route path='/password-reset/:token' element={<ChangePassword />}></Route>
        <Route path="*" element={<Error />} />


        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/dashboard' element={<HomePage />}></Route>
          <Route path='/dashboard/events/create' element={<CreateEvents />}></Route>
          <Route path='/dashboard/events/manage' element={<Events />}></Route>
          <Route path='/dashboard/events/edit/:id' element={<CreateEvents />}></Route>
          <Route path='/dashboard/events/manage/:id' element={<EventDetails />}></Route>

          <Route path='/dashboard/withdrawals/new' element={<NewWithdrawal />}></Route>
          <Route path='/dashboard/withdrawals/history' element={<Withdrawals />}></Route>

          <Route path='/dashboard/support-tickets/create' element={<CreateSupport />}></Route>
          <Route path='/dashboard/support-tickets/manage' element={<Supports />}></Route>

          <Route path='/dashboard/transactions' element={<Transactions />}></Route>
          <Route path='/dashboard/profile' element={<Profile />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App