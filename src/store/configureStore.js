import { configureStore , getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import api from "./middleware/api";

export default function configStore(){
    const store = configureStore({
        reducer : reducer,
        middleware:[
            ...getDefaultMiddleware(),
            api
        ]
    })
    return store
}