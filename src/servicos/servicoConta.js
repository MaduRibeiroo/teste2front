const urlBase = 'https://backend-produto-categoria-5wad.vercel.app/conta';

export async function gravarConta(conta){
    const resposta = await fetch(urlBase,{
        'method':"POST",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(conta)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarConta(conta){
    const resposta = await fetch(urlBase + "/" + conta.codigo,{
        'method':"PUT",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify({...conta, dataValidade: new Date(conta.dataValidade).toLocaleDateString()})
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function excluirConta(conta){
    const resposta = await fetch(urlBase + "/" + conta.codigo,{
        'method':"DELETE",
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function consultarConta() {
    const resposta = await fetch(urlBase,{
        'method':"GET"
    });
    const resultado = await resposta.json();
    return resultado;
}