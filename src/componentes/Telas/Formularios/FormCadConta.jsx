import { Button, Spinner, Col, Form, InputGroup, Row, Alert} from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import { consultarTipoConta } from "../../../servicos/servicoTipoConta.js"
import { alterarConta } from '../../../servicos/servicoConta.js';
import ESTADO from '../../../redux/estado.js';
import toast, {Toaster} from 'react-hot-toast';
import {useSelector, useDispatch } from 'react-redux';
import { inserirConta, atualizarConta } from '../../../redux/contaReducer.js';

export default function FormCadConta(props) {
const [conta, setConta] = useState(props.contaSelecionada);
const [formValidado, setFormValidado] = useState(false);
const [tipoconta, setTipoConta] = useState([]);
const [temTipoConta, setTemTipoConta] = useState(false);
const {estado,mensagem,listaDeContas}=useSelector((state)=>state.conta);
const [mensagemExibida, setMensagemExibida]= useState("");
const despachante = useDispatch();


useEffect(()=>{
   consultarTipoConta().then((resultado)=>{
       if (Array.isArray(resultado)){
           setTipoConta(resultado);
           setTemTipoConta(true);
       }
       else{
           toast.error("Não foi possível carregar os tipos de contas");
       }
   }).catch((erro)=>{
       setTemTipoConta(false);
       toast.error("Não foi possível carregar os tipos de contas");
   });
   
},[]); 

function selecionarTipoConta(evento){
   setConta({...conta, 
                  tipoconta:{
                   codigo: evento.currentTarget.value

                  }});
}

function manipularSubmissao(evento) {
   const form = evento.currentTarget;
   if (form.checkValidity()) {
       if (!props.modoEdicao) {
           despachante(inserirConta(conta));
           setMensagemExibida(mensagem);
           setTimeout(()=>{
               setMensagemExibida("");
               setConta({
                   codigo: 0,
                   email: "",
                   nome: "",
                   senha: "",
                   confsenha: "",
                   ano: "",
                   tipoconta:""
               });
           },5000);
       }
       else {
           despachante(atualizarConta(conta));
           setMensagemExibida(mensagem);
           setTimeout(()=>{
               props.setModoEdicao(false);
               props.setContaSelecionada({
                   codigo: 0,
                   email: "",
                   nome: "",
                   senha: "",
                   confsenha: "",
                   ano: "",
                   tipoconta:""
               });
               props.setExibirTabela(true);
           },5000);
       }

   }
   else {
       setFormValidado(true);
   }
   evento.preventDefault();
   evento.stopPropagation();

}

function manipularMudanca(evento) {
   const elemento = evento.target.name;
   const valor = evento.target.value;
   setConta({ ...conta, [elemento]: valor });
}


if(estado==ESTADO.PENDENTE){
   return (
       <div>
           <Spinner animation="border" role="status"></Spinner>
           <Alert variant="primary">{ mensagem }</Alert>
       </div>
   );
}
else if(estado==ESTADO.ERRO){
   return(
       <div>
           <Alert variant="danger">{ mensagem }</Alert>
           <Button onClick={() => {
                       props.setExibirTabela(true);
                   }}>Voltar</Button>
       </div>
   );
}
else if(estado==ESTADO.OCIOSO){
   return (
            <div>
                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="8">
                            <Form.Label>Código</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="codigo"
                                name="codigo"
                                value={conta.codigo}
                                disabled={props.modoEdicao}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type='invalid'>Por favor, informe o código da conta!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="8">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="email"
                                name="email"
                                value={conta.email}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe o email da conta!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="8">
                            <Form.Label>Nome:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="nome"
                                name="nome"
                                value={conta.nome}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe seu nome completo!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="8">
                            <Form.Label>Senha:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="senha"
                                name="senha"
                                value={conta.senha}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe a senha da conta!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="8">
                            <Form.Label>Confirme a senha:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="confsenha"
                                name="confsenha"
                                value={conta.confsenha}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, confirme a senha corretamente!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                    <Form.Group as={Col} md={8}>
                        <Form.Label>Ano:</Form.Label>
                        <Form.Select id='ano' 
                                    name='ano'
                                    value={conta.ano}
                                    onChange={manipularMudanca}>
                                        <option value="">Selecione o ano do seu nascimento</option>
                                        <option value="2006">2006</option>
                                        <option value="2005">2005</option>
                                        <option value="2004">2004</option>
                                        <option value="2003">2003</option>
                                        <option value="2002">2002</option>
                                        <option value="2001">2001</option>
                                        <option value="2000">2000</option>
                                        <option value="1999">1999</option>
                                        <option value="1998">1998</option>
                                        <option value="1997">1997</option>
                                        <option value="1996">1996</option>
                                        <option value="1995">1995</option>
                                        <option value="1994">1994</option>
                                        <option value="1993">1993</option>
                                        <option value="1992">1992</option>
                                        <option value="1991">1991</option>
                                        <option value="1990">1990</option>
                                        <option value="1989">1989</option>
                                        <option value="1988">1988</option>
                                        <option value="1987">1987</option>
                                        <option value="1986">1986</option>
                                        <option value="1985">1985</option>
                                        <option value="1984">1984</option>
                                        <option value="1983">1983</option>
                                        <option value="1982">1982</option>
                                        <option value="1981">1981</option>
                                        <option value="1980">1980</option>
                                        <option value="1979">1979</option>
                                        <option value="1978">1978</option>
                                        <option value="1977">1977</option>
                                        <option value="1976">1976</option>
                                        <option value="1975">1975</option>
                                        <option value="1974">1974</option>
                                        <option value="1973">1973</option>
                                        <option value="1972">1972</option>
                                        <option value="1971">1971</option>
                                        <option value="1970">1970</option>
                                        <option value="1969">1969</option>
                                        <option value="1968">1968</option>
                                        <option value="1967">1967</option>
                                        <option value="1966">1966</option>
                                        <option value="1965">1965</option>
                                        <option value="1964">1964</option>
                                        <option value="1963">1963</option>
                                        <option value="1962">1962</option>
                                        <option value="1961">1961</option>
                                        <option value="1960">1960</option>
                                        <option value="1959">1959</option>
                                        <option value="1958">1958</option>
                                        <option value="1957">1957</option>
                                        <option value="1956">1956</option>
                                        <option value="1955">1955</option>
                                        <option value="1954">1954</option>
                                        <option value="1953">1953</option>
                                        <option value="1952">1952</option>
                                        <option value="1951">1951</option>
                                        <option value="1950">1950</option>
                                        <option value="1949">1949</option>
                                        <option value="1948">1948</option>
                                        <option value="1947">1947</option>
                                        <option value="1946">1946</option>
                                        <option value="1945">1945</option>
                                        <option value="1944">1944</option>
                                        <option value="1943">1943</option>
                                        <option value="1942">1942</option>
                                        <option value="1941">1941</option>
                                        <option value="1940">1940</option>
                                        <option value="1939">1939</option>
                                        <option value="1938">1938</option>
                                        <option value="1937">1937</option>
                                        <option value="1936">1936</option>
                                        <option value="1935">1935</option>
                                        <option value="1934">1934</option>
                                        <option value="1933">1933</option>
                                        <option value="1932">1932</option>
                                        <option value="1931">1931</option>
                                        <option value="1930">1930</option>
                                        <option value="1929">1929</option>
                                        <option value="1928">1928</option>
                                        <option value="1927">1927</option>
                                        <option value="1926">1926</option>
                                        <option value="1925">1925</option>
                                        <option value="1924">1924</option>
                                        <option value="1923">1923</option>
                                        <option value="1922">1922</option>
                                        <option value="1921">1921</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md={7}>
                        <Form.Label>Tipo de Conta:</Form.Label>
                        <Form.Select id='tipoconta' 
                                    name='tipoconta'
                                    onChange={selecionarTipoConta}>
                                    <option value="">Selecione um tipo</option>
                            {
                                tipoconta.map((tipoconta) =>{
                                    return <option value={tipoconta.codigo}>
                                                {tipoconta.descricao}
                                        </option>
                                })
                            }
                            
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md={1}>
                        {
                        !temTipoConta ? <Spinner className='mt-4' animation="border" variant="success" />
                        : ""
                        }
                    </Form.Group>
                </Row>
                <Row className='mt-2 mb-2'>
                    <Col md={1}>
                        <Button type="submit" disabled={!temTipoConta}>{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                    </Col>
                    <Col md={{ offset: 1 }}>
                        <Button onClick={() => {
                            props.setExibirTabela(true);
                        }}>Voltar</Button>
                    </Col>
                </Row>
                <Toaster position="top-right"/>
            </Form>
            {
                mensagemExibida ? <Alert variant='succeess'>{mensagem}</Alert>:""
            }
            </div>
        );
    }
}