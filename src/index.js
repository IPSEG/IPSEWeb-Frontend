import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RecoilRoot} from "recoil";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            </RecoilRoot>
        </QueryClientProvider>

    </div>
);

reportWebVitals();
