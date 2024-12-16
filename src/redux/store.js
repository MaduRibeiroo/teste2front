import { configureStore } from "@reduxjs/toolkit";
import tipoContaReducer from "./tipoContaReducer";
import contaReducer from "./contaReducer";

const store = configureStore({
    reducer:{
        'conta':contaReducer,
        'tipoConta':tipoContaReducer
    }
});

export default store;