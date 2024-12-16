import { Alert } from "react-bootstrap";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaConta from "./Tabelas/TabelaConta";
import { contas } from "../../dados/mockConta";
import FormCadConta from "./Formularios/FormCadConta";

export default function TelaCadastroConta(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeContas, setListaDeContas] = useState(contas);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [contaSelecionada, setContaSelecionada] = useState({
        codigo:0,
        email:"",
        nome:"",
        senha:"",
        confsenha:"",
        ano:""

    });

   
    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Criar Conta
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaConta listaDeContas={listaDeContas}
                                        setListaDeContas={setListaDeContas} 
                                        setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setContaSelecionada={setContaSelecionada} /> :
                        <FormCadConta listaDeContas={listaDeContas}
                                         setListaDeContas={setListaDeProdutos}
                                         setExibirTabela={setExibirTabela}
                                         contaSelecionada={contaSelecionada}
                                         setContaSelecionada={setContaSelecionada}
                                         modoEdicao={modoEdicao}
                                         setModoEdicao={setModoEdicao}

                                         />
                }
            </Pagina>
        </div>
    );

}