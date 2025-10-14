

import MainLayout from '@layouts/MainLayout/MainLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from '@pages/Error';
import { lazy , Suspense } from "react";


const Home = lazy(() => import('@pages/Home'));
const Categories = lazy(() => import('@pages/Categories'));
const Products = lazy(() => import('@pages/Products'));
const AboutUs = lazy(() => import('@pages/AboutUs'));
const Login = lazy(() => import('@pages/Login'));
const Register = lazy(() => import('@pages/Register'));
const Cart = lazy(() => import('@pages/Cart'));
const WishList = lazy(() => import('@pages/wishList'));

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <Error />,
        element: <Suspense fallback={<div>Loading , Please wait...</div>}><MainLayout /></Suspense>,


        children: [
            {
                index: true,
                element: <Suspense fallback={<div>Loading , Please wait...</div>}><Home /></Suspense>
            },
            {
                path: 'categories',
                element: <Suspense fallback={<div>Loading , Please wait...</div>}><Categories /></Suspense>
            },
            {
                path: 'categories/products/:prefix',
                element: <Suspense fallback={<div>Loading , Please wait...</div>}><Products /></Suspense>,
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
                element: <Suspense fallback={<div>Loading , Please wait...</div>}><AboutUs /></Suspense>
            },
            {
                path: 'login',
                element: <Suspense fallback={<div>Loading , Please wait...</div>}><Login /></Suspense>
            },
            {
                path: 'register',
                element: <Suspense fallback={<div>Loading , Please wait...</div>}><Register /></Suspense>
            },
            {
                path: 'cart',
                element: <Suspense fallback={<div>Loading , Please wait...</div>}><Cart /></Suspense>
            },
            {
                path: 'wishList',
                element: <Suspense fallback={<div>Loading , Please wait...</div>}><WishList /></Suspense>
            }
        ]
    },
]);

const AppRouter = () => {

    return <RouterProvider router={router} />;
};

export default AppRouter;