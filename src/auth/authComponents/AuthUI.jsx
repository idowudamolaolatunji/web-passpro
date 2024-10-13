import React from 'react';

import logo from '../../assets/logo/logo-img.png';
import img from '../../assets/resources/auth-img.png';
import '../auth.css'

function AuthUI({ children }) {

    return (
        <section className='auth--section'>
            <div className="auth--container">
                <div className="auth--image">
                    <img src={img} alt="authentication women image" />
                </div>

                <div className="auth--form-box">
                    <img className='auth--logo' src={logo} alt="logo image" />
                    {children}
                </div>
            </div>
        </section>
  )
}

export default AuthUI