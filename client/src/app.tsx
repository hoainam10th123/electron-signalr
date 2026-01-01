import './index.css'; // import css

import React from 'react';
import { createRoot } from 'react-dom/client';
import { SignalRProvider } from './SignalRProvider';
import Main from './main';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <SignalRProvider>
        <h2>Hello electron</h2>
        <Main />
    </SignalRProvider>
);