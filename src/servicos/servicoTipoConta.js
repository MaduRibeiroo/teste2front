const urlBase = 'https://backend-produto-categoria-5wad.vercel.app/tipoConta';

export async function gravarTipoConta(tipoconta){
    const resposta = await fetch(urlBase,{
        'method':"POST",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(tipoconta)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarTipoConta(tipoconta){
    const resposta = await fetch(urlBase + "/" + tipoconta.codigo,{
        'method':"PUT",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(tipoconta)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function excluirTipoConta(tipoconta){
    const resposta = await fetch(urlBase + "/" + tipoconta.codigo,{
        'method':"DELETE",
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function consultarTipoConta() {
    const resposta = await fetch(urlBase,{
        'method':"GET"
    });
    const resultado = await resposta.json();
    return resultado;
}