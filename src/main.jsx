import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FetchedProvider } from './context/FetchedContext.jsx';
import { DataProvider } from './context/DataContext.jsx';
import App from './App.jsx'

import 'rsuite/dist/rsuite.min.css';
import './index.css';
import './page.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <FetchedProvider>
            <DataProvider>
                <App />
            </DataProvider>
        </FetchedProvider>
    </StrictMode>
)