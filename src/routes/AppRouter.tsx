

import MainLayout from '@layouts/MainLayout/MainLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from '@pages/Error';
import { lazy , Suspense } from "react";
import CategorySkeleton from '@components/feedback/skeletons/CategorySkeleton/CategorySkeleton';
import ProductSkeleton from '@components/feedback/skeletons/ProductSkeleton/ProductSkeleton';
import CartSkeleton from '@components/feedback/skeletons/CartSkeleton/CartSkeleton';
import LottieHandler from '@components/feedback/lottieHandler/lottieHandler';
const Home = lazy(() => import('@pages/Home'));
const Categories = lazy(() => import('@pages/Categories'));
const Products = lazy(() => import('@pages/Products'));
const AboutUs = lazy(() => import('@pages/AboutUs'));
const Login = lazy(() => import('@pages/Login'));
const Register = lazy(() => import('@pages/Register'));
const Cart = lazy(() => import('@pages/Cart'));
const WishList = lazy(() => import('@pages/wishList'));
const Account = lazy(() => import('@pages/Account'));
const ProtectedRoute = lazy(() => import('@components/Auth/ProtectedRoute'));
const ProfileLayout = lazy(() => import('@layouts/ProfileLayout/ProfileLayout'));
const Orders = lazy(() => import('@pages/Orders'));
const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <Error />,
        element: <Suspense fallback={
            <ProductSkeleton/>
        }><MainLayout /></Suspense>,


        children: [
            {
                index: true,
                element: <Suspense fallback={<LottieHandler type="loading" message="Loading , Please wait..." />}><Home /></Suspense>
            },
            {
                path: 'categories',
                element: <Suspense fallback={<CategorySkeleton/>} ><Categories /></Suspense>
            },
            {
                path: 'categories/products/:prefix',
                element: <Suspense fallback={<ProductSkeleton/>}><Products /></Suspense>,
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
                element: <Suspense fallback={<LottieHandler type="loading" message="Loading , Please wait..." />}><AboutUs /></Suspense>
            },
            {
                path: 'login',
                element: <Suspense fallback={<LottieHandler type="loading" message="Loading , Please wait..." />}><Login /></Suspense>
            },
            {
                path: 'register',
                element: <Suspense fallback={<LottieHandler type="loading" message="Loading , Please wait..." />}><Register /></Suspense>
            },
            {
                path: 'cart',
                element: <Suspense fallback={<CartSkeleton/>}><Cart /></Suspense>
            },
            {
                path: 'wishList',
                element: <ProtectedRoute><Suspense fallback={<ProductSkeleton/>}><WishList /></Suspense></ProtectedRoute>
            },
            {
                path: 'profile',
                element: <ProtectedRoute><Suspense fallback={<LottieHandler type="loading" message="Loading , Please wait..." />}>
                    <ProfileLayout/></Suspense></ProtectedRoute>,
                    children: [
                        {
                            index: true,
                            element: <Suspense fallback={<LottieHandler type="loading" message="Loading , Please wait..." />}><Account /></Suspense>
                        },
                        {
                            path: 'orders',
                            element: <Suspense fallback={<LottieHandler type="loading" message="Loading , Please wait..." />}><Orders /></Suspense>
                        }]
            }
        ]
    },
]);

const AppRouter = () => {

    return <RouterProvider router={router} />;
};

export default AppRouter;