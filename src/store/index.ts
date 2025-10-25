import { configureStore, combineReducers } from '@reduxjs/toolkit'
import categories from './categories/categoriesSlice'
import products from './products/productsSlice'
import cart from './cart/cartSlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PERSIST, PURGE, REGISTER, REHYDRATE, FLUSH, PAUSE } from "redux-persist";
import wishList from './wishLIst/wishListSlice';
import auth from './auth/authSlice';
import orders from './orders/orderSlice';

const rootPersistConfig = {
  key: "root",
  storage,
  whiteList: ["cart", "auth"],
}

const authPersistConfig = {
  key: "auth",
  storage,
  whiteList: ["accessToken", "user"],
}

const cartPersistConfig = {
  key: "cart",
  storage,
  whiteList: ["items"],
}


const wishListPersistConfig = {
  key: "wishList",
  storage,
  whiteList: ["itemsId"],
}

const ordersPersistConfig = {
  key: "orders",
  storage,
  whiteList: ["orders"],
}

export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  categories,
  products,
  cart: persistReducer(cartPersistConfig, cart),
  wishList: persistReducer(wishListPersistConfig, wishList),
  orders: persistReducer(ordersPersistConfig, orders),

});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [PERSIST, PURGE, PAUSE, REGISTER, REHYDRATE, FLUSH],
    }
  })

});





// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
const persistor = persistStore(store);
export { store, persistor };
