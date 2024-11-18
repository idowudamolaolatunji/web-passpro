import React, { useState } from 'react';

import logo from '../../assets/logo/logo-img.png';
import img from '../../assets/resources/auth-img.png';
import '../auth.css'
import Spinner from '../../components/Spinner';
import CustomAlert from '../../components/CustomAlert';

function AuthUI({ response, loading, children }) {

    return (
        <>
            {loading && <Spinner />}

            {(response?.status || response?.message) && (
                <CustomAlert type={response.status} message={response.message} />
            )}

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
        </>
    )
}

export default AuthUI