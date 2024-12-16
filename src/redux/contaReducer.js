import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarConta, excluirConta, gravarConta, alterarConta } from "../servicos/servicoConta.js";
import ESTADO from "./estado.js";

export const buscarConta = createAsyncThunk('buscarConta', async ()=>{
    const resultado = await consultarConta();
    try {
        if (Array.isArray(resultado)){
            return {
                "status":true,
                "mensagem":"Contas recuperadas com sucesso",
                "listaDeContas":resultado
            }
        }
        else
        {
            return {
                "status":false,
                "mensagem":"Erro ao recuperar as contas do backend.",
                "listaDeContas":[]
            }
        }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
            "listaDeContas":[]
        }
    }
});

export const apagarConta = createAsyncThunk('apagarConta', async (conta)=>{

    console.log(conta);
    const resultado = await excluirConta(conta);
    console.log(resultado);
    try {
            return {
                "status":resultado.status,
                "mensagem":resultado.mensagem,
                "codigo":conta.codigo
            }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
        }
    } 
});

export const inserirConta = createAsyncThunk('inserirConta', async (conta)=>{
    try{
        const resultado=await gravarConta(conta);
        if(resultado.status)
        {
            conta.codigo=resultado.codigo;
            return{
                "status":resultado.status,
                "mensagem":resultado.mensagem,
                "conta":conta
            };
        }
        else{
            return{
                "status":resultado.status,
                "mensagem":resultado.mensagem
            };
        }
    } catch(erro){
        return{
            "status":false,
            "mensagem":"Nao foi possivel se comunicar com o backend" + erro.message
        };
    }
});

export const atualizarConta = createAsyncThunk('atualizarConta', async (conta)=>{
    try{
        const resultado=await alterarConta(conta);
        return{
            "status":resultado.status,
            "mensagem":resultado.mensagem,
            "conta":conta
        };
    } catch(erro){
        return{
            "status":false,
            "mensagem":"Nao foi possivel se comunicar com o backend" + erro.message
        };
    }
});

const contaReducer = createSlice({
    name:'conta',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeContas:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarConta.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando contas)"
        })
        .addCase(buscarConta.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            state.listaDeContas=action.payload.listaDeContas;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeContas=action.payload.listaDeContas;
          } 
        })
        .addCase(buscarConta.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeContas=action.payload.listaDeContas;
        })
        .addCase(apagarConta.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando a requsição(excluindo a conta do backend";
        })
        .addCase(apagarConta.fulfilled,(state,action) =>{
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            if(action.payload.status){                        
                state.listaDeContas=state.listaDeContas.filter((item)=> item.codigo !== action.payload.codigo);
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(apagarConta.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(inserirConta.pending, (state, action)=>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando a requisição(incluindo a conta no backend";
        })
        .addCase(inserirConta.fulfilled,(state,action) =>{
            if(action.payload.status){     
                state.estado=ESTADO.OCIOSO; 
                state.mensagem=action.payload.mensagem;
                state.listaDeContas.push(action.payload.conta);
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(inserirConta.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(atualizarConta.pending, (state,action)=>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando a requsição(alterando a conta no backend";
        })
        .addCase(atualizarConta.fulfilled, (state,action)=>{
            if(action.payload.status){     
                state.estado=ESTADO.OCIOSO; 
                state.mensagem=action.payload.mensagem;
                state.listaDeContas=state.listaDeContas.map((item)=> item.codigo===action.payload.conta.codigo ? action.payload.conta : item);
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(atualizarConta.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
    }
});

export default contaReducer.reducer;