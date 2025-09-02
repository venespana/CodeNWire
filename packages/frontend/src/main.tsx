import React from 'react';

import { Buffer } from 'buffer';

import { createRoot } from 'react-dom/client';

import { NextUIProvider } from '@nextui-org/react';

import App from './App';
import './index.css';

if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>
);
