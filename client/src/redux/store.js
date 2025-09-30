import { configureStore } from "@reduxjs/toolkit"
import {persistStore, persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { combineReducers } from "redux"
import customerSlice from "./slice/customerSlice"
import cartSlice from "./slice/cartSlice"
import userSlice from "./slice/userSlice"

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cart", "customer", "user"],
}

const rootReducer = combineReducers({
    customer: customerSlice,
    cart: cartSlice,
    user: userSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: import.meta.env.NODE_ENV !== "production",
})

export const persistor = persistStore(store)