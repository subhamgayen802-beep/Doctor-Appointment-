
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import store from "../src/app/store.js"
import { Provider } from 'react-redux';
import AppContextProvider from './context/AppContext.jsx';

createRoot(document.getElementById('root')).render(

    <Provider store={store}>
    <BrowserRouter>
    <AppContextProvider>
    <App />
   </AppContextProvider>
    </BrowserRouter>
    </Provider>
  
)
