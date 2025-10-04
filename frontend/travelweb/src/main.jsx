import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';



import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { Bagprovider } from './context/Bagcontext.jsx';
import Userprovider from './context/Usercontext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>


    <Userprovider>
    <BrowserRouter>

    <Bagprovider>

      <App />
    </Bagprovider>
    </BrowserRouter>
    </Userprovider>
  

  </StrictMode>,
)
