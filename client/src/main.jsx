import { createRoot } from "react-dom/client";
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import axios from 'axios'

import {store} from './app/store.js'
import App from "./App.jsx";
import "./index.css";

// axios settings
axios.defaults.baseURL = "http://localhost:5050";
axios.defaults.withCredentials = true

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
    </BrowserRouter>
);
