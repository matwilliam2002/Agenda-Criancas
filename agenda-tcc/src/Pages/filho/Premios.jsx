import { useState, useEffect, useRef } from "react";
import ModalResgate from './components/modalResgatePremio';
import Pontos from "./components/pontosFilho"
import './Premio.css';
import { useNavigate } from 'react-router-dom';
import AgendaIcon from './/../../assets/weekly.png';




function Premios() {



    const [dados, setDados] = useState([]);
    const [premioEscolhido, setPremioEscolhido] = useState(null);
    const [modal, setModal] = useState(false);
    const pontosRef = useRef();


    async function fetchPremios() {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Você precisa estar logado");
                return;
            }

            const response = await fetch("http://localhost:3000/api/premios/buscarPremiosFilho", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok) {
                throw new Error("Erro na requisição");
            }

            const dadosTrazidos = await response.json();
            console.log("Dados apresentados:", dadosTrazidos);
            setDados(dadosTrazidos);

        } catch (error) {
            alert(error.message);

        }
    }

    useEffect(() => {
        fetchPremios();
    }, []
    );

    function handlePremio(Premio) {
        setPremioEscolhido(Premio);
        setModal(true);
    }

    function handleClose() {
        setModal(false);
        chamarAtualizarPontos();

    }

    const navigate = useNavigate();

    function handleDirecionamentoAgenda() {
        navigate('/calendarioFilho');

    }

    function chamarAtualizarPontos() {
        if (pontosRef.current) {
            pontosRef.current.atualizarPontos(); // 🔹 chama direto a função do filho
        }
    }

    return (
        <div className="container-page-premio">
            <h1>Resgate Premios</h1>
            <div className="card-nav">
                <Pontos
                    ref={pontosRef}
                />
                <div className="card-direcionamento">
                    <img src={AgendaIcon} alt="" />
                    <button onClick={handleDirecionamentoAgenda}>Agenda</button>
                </div>
            </div>

            <div className="container-premios">
                <ul>
                    {dados.map((premios) => (
                        <li key={premios.id}>
                            {premios.nomePremio} - {premios.valorPremio} Pontos  <img src={premios.imagemUrl} alt="" />
                            <button onClick={() => handlePremio(premios)}>Resgatar Premio</button>
                        </li>
                    ))}
                </ul>
            </div>


            {modal && premioEscolhido && (
                <ModalResgate
                    Premio={premioEscolhido}
                    onClose={handleClose}
                />
            )};


        </div>

    )
}

export default Premios; 