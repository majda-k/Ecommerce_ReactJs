
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';


import AppRouter from './routes/AppRouter';
import { store, persistor } from './store/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import "./API/axios-global";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
        </PersistGate>

    </Provider>);
