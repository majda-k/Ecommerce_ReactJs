
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';


import AppRouter from './routes/AppRouter';
import { store } from './store';
import { Provider } from 'react-redux';



createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <AppRouter />
    </Provider>);
