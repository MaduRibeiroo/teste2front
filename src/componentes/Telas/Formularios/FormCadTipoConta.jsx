import { useState, useEffect } from 'react';
import { Button, Spinner, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { gravarCategoria } from '../../../servicos/servicoCategoria';

import toast, {Toaster} from 'react-hot-toast';
import { gravarTipoConta } from '../../../servicos/servicoTipoConta';

export default function FormCadTipoConta(props) {
    const [tipoconta, setTipoConta] = useState(props.tipoContaSelecionado);
    const [formValidado, setFormValidado] = useState(false);

    useEffect(() => {
        setTipoConta(props.tipoContaSelecionado);
    }, [props.tipoContaSelecionado]);
    

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                gravarTipoConta(tipoconta)
                .then((resultado)=>{
                    if (resultado.status){
                        props.setExibirTabela(true);
                    }
                    else{
                        toast.error(resultado.mensagem);
                    }
                });
            } 
            else {
                props.setListaDeTipoContas(props.listaDeTipoContas.map((item) => 
                    item.codigo !== tipoconta.codigo ? item : tipoconta
                ));
                // Resetar para modo de inclusão
                props.setModoEdicao(false);
                props.setTipoContaSelecionado({ 
                    codigo: 0, 
                    descricao: "" 
                });
                props.setExibirTabela(true);
            }
            
        } 
        else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const { name, value } = evento.target;
        setTipoConta({ ...tipoconta, [name]: value });
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="codigo"
                        name="codigo"
                        value={tipoconta.codigo}
                        disabled={props.modoEdicao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>
                        Por favor, informe o código do tipo de conta!
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="descricao"
                        name="descricao"
                        value={tipoconta.descricao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe a descrição do tipo de conta!
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => props.setExibirTabela(true)}>Voltar</Button>
                </Col>
            </Row>
            <Toaster position="top-right"/>
        </Form>
    );
}