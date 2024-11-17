import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FetchedProvider } from './context/FetchedContext.jsx';
import { DataProvider } from './context/DataContext.jsx';
import App from './App.jsx'

import 'rsuite/dist/rsuite.min.css';
import './index.css';
import './page.css';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <FetchedProvider>
                <DataProvider>
                    <App />
                </DataProvider>
            </FetchedProvider>
        </AuthProvider>
    </StrictMode>
)