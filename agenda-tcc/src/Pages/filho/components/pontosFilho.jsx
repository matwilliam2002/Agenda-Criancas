import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import ".//../components/pontosFilho.css";
import Trofeu from "..//..//..//assets/trofeu.png"

const Pontos = forwardRef((props, ref) =>{

    const [dadosFilho, setDadosFilho] = useState([]);

    async function fetchPontosFilho() {

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Você precisa estar logado para cadastrar tarefas");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/users/buscarDadosFilho", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                method: "GET",
            })

            if (!response.ok) throw new Error("Erro ao buscar as tarefas do usuário");

            const dados = await response.json();
            setDadosFilho(dados);

            console.log("dados filho: ", dadosFilho);
        } catch (error) {
            console.error(error);
            alert("Erro ao carregar tarefas");
        }
    }

    useEffect(() => {
        fetchPontosFilho();
    }, []);


    console.log("Aqui estão os dados: ", dadosFilho);




    function atualizarPontos() {
        fetchPontosFilho();
    }

    useImperativeHandle(ref, () => ({
        atualizarPontos,
    }));


    return (
        <div className="pontos-container">
            <div className="pontos-card">
                <div className="pontos-valor">{dadosFilho.pontos ?? 0}</div>
                <div className="pontos-titulo"><p>Pontos</p></div>
            </div>
            <img src={Trofeu} alt="Troféu" />
        </div>
    );
})

export default Pontos;