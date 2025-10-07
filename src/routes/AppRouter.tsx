

import MainLayout from '@layouts/MainLayout/MainLayout';
import Home from '@pages/Home';
import Categories from '@pages/Categories';
import Products from '@pages/Products';
import AboutUs from '@pages/AboutUs';
import Login from '@pages/Login';
import Register from '@pages/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from '@pages/Error';



const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <Error />,
        element: <MainLayout />,


        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'categories',
                element: <Categories />
            },
            {
                path: 'products/:prefix',
                element: <Products />,
                loader: ({ params }) => {
                    if (typeof params.prefix === 'string' && !/^[a-z]+$/i.test(params.prefix)) {

                        throw new Response("bad request", {
                            status: 400,
                            statusText: 'category not found'
                        });
                    }
                    return true;
                },
            },

            {
                path: 'about-us',
                element: <AboutUs />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    },
]);

const AppRouter = () => {

    return <RouterProvider router={router} />;
};

export default AppRouter;