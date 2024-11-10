import React from 'react';
import DashboardHead from './uiComponents/DashboardHead';
import DashboardMenu from './uiComponents/DashboardMenu';

import "./dashboard.css";

function DashboardBase({ children }) {
  return (
    <section className='dashboard--base'>
        <DashboardMenu />

        <main>
            <DashboardHead />

            <section className='content--block'>
              {children}
            </section>
        </main>
    </section>
  )
}

export default DashboardBase