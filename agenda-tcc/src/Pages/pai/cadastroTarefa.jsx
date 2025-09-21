import ModalCriarTarefa from "./components/modalEditarTarefa";
import { useState, useEffect } from "react";
import './cadastroTarefa.css'; 

function CadastroTarefa() {
    const [nomeTarefa, setNomeTarefa] = useState(""); 
    const [valorTarefa, setValorTarefa] = useState(0); 
    const [erro, setErro] = useState(""); // estado para erros
    const [tarefas, setTarefas] = useState([]);
    const [tarefaSelecionada, setTarefaSelecionada] = useState([]); 
    const [isOpen, setIsOpen] = useState(false); 


    async function handleSubmit(e){
        e.preventDefault(); 
        try {

            const token = localStorage.getItem("token"); 

            if (!token) {
                alert("Voce precisa estar logado"); 
            }

            const response = await fetch("http://localhost:3000/api/tarefas/criarTarefa", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },     
                body: JSON.stringify({nomeTarefa, valorTarefa})   
            }); 

            if (!response.ok) {
                const erro = await response.json();
            alert(erro.message || "Erro desconhecido");
            return;
            }

            const data = response.json(); 
            console.log("Tarefa cadastrada com sucesso: ", data);
            setNomeTarefa(""); 
            setValorTarefa(0); 
            fecthTarefas(); 
        } catch (error) {
            alert(error.message);
        }
    }

    async function fecthTarefas() {
        try {
            const token = localStorage.getItem("token")
            if (!token) {
                alert("Você precisa estar logado ");
                return;
            }
            
            const response = await fetch("http://localhost:3000/api/tarefas/buscarTarefa", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }  
            })
            
            if (!response.ok) {
                throw new Error("Erro na requisição");
            }

            const data = await response.json();
            setTarefas(data); 
        } catch (error) {
            console.error(error);
            setErro("Erro ao buscar tarefas");
        }
    }

    useEffect(() => {
        fecthTarefas();
      }, []
    );

    function handleModal(tarefa) {
        setTarefaSelecionada(tarefa); 
        console.log("Tarefa selecionado: ", tarefa);
        setIsOpen(!isOpen); 
    }

    function handleClose() {
        setIsOpen(!isOpen); 
        setTarefaSelecionada(null); 
        fecthTarefas(); 
    }


    return(
        <div>
            <form className="formularioCriarTarefa" onSubmit={handleSubmit}>
                <h1>Criar Tarefa</h1>
                <label>Nome tarefa</label>
                <input 
                    type="text" 
                    placeholder="Insira o nome da tarefa"
                    value={nomeTarefa}
                    onChange={e => setNomeTarefa(e.target.value)}
                    required 
                />
                <label>Valor Tarefa</label>
                <input 
                    type="number"
                    placeholder="Insira o valor da tarefa"
                    value={valorTarefa}
                    onChange={e => setValorTarefa(e.target.value)}
                    required 
                />
                <button 
                    type="submit"
                >
                    Adicionar
                </button>
            </form>

            <div className="listaTarefas">
                <h1>Minhas tarefas</h1>
                <ul>
                    {tarefas.map((tarefa) => 
                        <li key={tarefa.id}>
                            Nome Tarefa: {tarefa.nomeTarefa} - Valor tarefa: {tarefa.valorTarefa} <button onClick={() => handleModal(tarefa)}>Editar</button>
                        </li>
                    )}
                </ul>
            </div>

            {isOpen && tarefaSelecionada &&(
                <ModalCriarTarefa 
                onClose = {handleClose}
                tarefa = {tarefaSelecionada}
            />
            )}
            
        
            
        </div>
    ); 
}

export default CadastroTarefa; 