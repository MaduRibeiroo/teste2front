import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { gravarTipoConta, consultarTipoConta, alterarTipoConta, excluirTipoConta } from "../servicos/servicoTipoConta";

import ESTADO from "./estado";

export const buscarTipoConta = createAsyncThunk('buscarTipoConta', async ()=>{
    const resultado = await consultarTipoConta();
    try {
        if (Array.isArray(resultado)){
            return {
                "status":true,
                "mensagem":"Tipos de contas recuperados com sucesso",
                "listaDeTipoConta": resultado
            }
        }
        else
        {
            return {
                "status":false,
                "mensagem":"Erro ao recuperar os tipos de contas do backend.",
                "listaDeTipoConta":[]
            }
        }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
            "listaDeTipoConta":[]
        }
    }
});

export const apagarTipoConta = createAsyncThunk('apagarTipoConta', async (tipoconta)=>{
    const resultado = await excluirTipoConta(tipoconta);
    console.log(resultado);
    console.log(tipoconta);
    try {
            return {
                "status":resultado.status,
                "mensagem":resultado.mensagem,
            }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
        }
    } 
});
export const inserirTipoConta = createAsyncThunk('inserirTipoConta', async (tipoconta)=>{
   
    try{
        const resultado=await gravarTipoConta(tipoconta);
        if(resultado.status)
        {
            tipoconta.codigo=resultado.codigo;
            return{
                "status":resultado.status,
                "mensagem":resultado.mensagem,
                "tipoconta":tipoconta
            };
        }
        else{
            return{
                "status":resultado.status,
                "mensagem":resultado.mensagem
            };
        }
    } catch(erro){
        //esse o é o payload retornado para o redutor
        return{
            "status":false,
            "mensagem":"Nao foi possivel se comunicar com o backend" + erro.message
        };
    }
});

export const atualizarTipoConta = createAsyncThunk('atualizarTipoConta', async (tipoconta)=>{
    
    try{
        const resultado=await alterarTipoConta(tipoconta);
        return{
            "status":resultado.status,
            "mensagem":resultado.mensagem,
            "tipoconta":tipoconta
        };
    } catch(erro){
        return{
            "status":false,
            "mensagem":"Nao foi possivel se comunicar com o backend" + erro.message
        };
    }
});


const tipoContaReducer = createSlice({
    name:'tipoconta',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeTipoConta:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarTipoConta.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando tipo de contas)"
        })
        .addCase(buscarTipoConta.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            state.listaDeTipoConta=action.payload.listaDeTipoConta;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeTipoConta=action.payload.listaDeTipoConta;
          } 
        })
        .addCase(buscarTipoConta.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeTipoConta=action.payload.listaDeTipoConta;
        })
        .addCase(apagarTipoConta.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando a requsição(excluindo o tipo de conta do backend";
        })
        .addCase(apagarTipoConta.fulfilled,(state,action) =>{
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            if(action.payload.status){                        
                state.listaDeTipoConta=state.listaDeTipoConta.filter((item)=> item.codigo !== action.payload.codigo);
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(apagarTipoConta.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(inserirTipoConta.pending, (state, action)=>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando a requsição(incluindo o tipo de conta no backend";
        })
        .addCase(inserirTipoConta.fulfilled,(state,action) =>{
            if(action.payload.status){     
                state.estado=ESTADO.OCIOSO; 
                state.mensagem=action.payload.mensagem;
                state.listaDeTipoConta.push(action.payload.tipoconta);
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(inserirTipoConta.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(atualizarTipoConta.pending, (state,action)=>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando a requsição(alterando o tipo de conta no backend";
        })
        .addCase(atualizarTipoConta.fulfilled, (state,action)=>{
            if(action.payload.status){     
                state.estado=ESTADO.OCIOSO; 
                state.mensagem=action.payload.mensagem;
                state.listaDeTipoConta=state.listaDeTipoConta.map((item)=> item.codigo===action.payload.tipoconta.codigo ? action.payload.tipoconta : item);
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(atualizarTipoConta.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
    }
});

export default tipoContaReducer.reducer;