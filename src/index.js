import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

const supabase = createClient(
  "https://rjfcmedbaghtqkerzcoo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqZmNtZWRiYWdodHFrZXJ6Y29vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMjEwMzcsImV4cCI6MjA1Mjg5NzAzN30.7jpok0VzBooVgG8Dfr72mQgcCe_bFoaMtQOMrbG_KSk"
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
    <App />
    </SessionContextProvider>
  </React.StrictMode>
);


