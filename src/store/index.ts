import { configureStore, combineReducers } from '@reduxjs/toolkit'
import categories from './categories/categoriesSlice'
import products from './products/productsSlice'
import cart from './cart/cartSlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PERSIST, PURGE, REGISTER, REHYDRATE, FLUSH, PAUSE } from "redux-persist";


// const persistConfig = {
//   key: "root",
//   storage,
//   whiteList: ["cart"],
// }
const cartPersistConfig = {
  key: "cart",
  storage,
  whiteList: ["items"],
}
export const rootReducer = combineReducers({

  categories,
  products,
  cart: persistReducer(cartPersistConfig, cart),
});



const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, PURGE,PAUSE, REGISTER, REHYDRATE, FLUSH],
      }
    })
    
  });



 

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
const persistor = persistStore(store);
export { store, persistor };
