import React from 'react';
import DashboardHead from './uiComponents/DashboardHead';
import DashboardMenu from './uiComponents/DashboardMenu';

import "./dashboard.css";

function DashboardBase({ children }) {
  return (
    <>
        <DashboardHead />

        <section className='dashboard--base'>
            <DashboardMenu />

            <section className='content--block'>
                {children}
            </section>
        </section>
    </>
  )
}

export default DashboardBase