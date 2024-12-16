import { Alert } from "react-bootstrap";
import Pagina from "../layouts/Pagina";
import FormCadTipoConta from "./Formularios/FormCadTipoConta";
export default function TelaCadastroTipoConta(props) {
    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Categoria
                    </h2>
                </Alert>
                <FormCadTipoConta />
            </Pagina>
        </div>
    );
}