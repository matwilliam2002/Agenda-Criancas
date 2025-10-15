import ModalCriarTarefa from "./components/modalEditarTarefa";
import { useState, useEffect } from "react";
import NavBar from './components/navBar';
import './cadastroTarefa.css';

function CadastroTarefa() {
    const [nomeTarefa, setNomeTarefa] = useState("");
    const [valorTarefa, setValorTarefa] = useState(0);
    const [erro, setErro] = useState(""); // estado para erros
    const [tarefas, setTarefas] = useState([]);
    const [tarefaSelecionada, setTarefaSelecionada] = useState([]);
    const [isOpen, setIsOpen] = useState(false);


    async function handleSubmit(e) {
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
                body: JSON.stringify({ nomeTarefa, valorTarefa })
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

            const response = await fetch("http://localhost:3000/api/tarefas/buscarTiposTarefasDoFilho", {
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

   async function handleReativar(tarefaEscolhida) {
        const token = localStorage.getItem("token"); 

        try {
            const response = await fetch("http://localhost:3000/api/tarefas/reativar", {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({tarefaId: tarefaEscolhida.id}),
            })

            if (!response.ok) throw new Error("Erro ao reativar");
            console.log("Tarefa reativada com sucesso");
            fecthTarefas(); 
        } catch (error) {
            console.error(error);
        }
   }

    async function handleExcluir(tarefa) {
        try {
            const token = localStorage.getItem("token"); 

            console.log('Tarefa a ser excluida: ', tarefa);
            

            const response = await fetch("http://localhost:3000/api/tarefas/desativar", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    idTarefa : tarefa.id, 
                    status: 'DESATIVADA',
                })
            })

            if (!response.ok) {
                throw new Error("Erro na requisição");
            }

            fecthTarefas()

        } catch (error) {
            console.error(error);
            setErro("Erro ao desativar a tarefa");
        }
    }

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

    console.log("Tarefas vindas: ", tarefas);
    


    return (
        <div className="container-tarefas">
            <NavBar />
            <h1 className="titulo-pagina" >Cadastro de Tarefas</h1>
            <div className="container-all">
                <div className="card-left">
                    <form className="formulario-criar-tarefa" onSubmit={handleSubmit}>
                        <h1>Criar Tarefa</h1>
                        <label>Tarefa</label>
                        <input
                            type="text"
                            placeholder="Insira o nome da tarefa"
                            value={nomeTarefa}
                            onChange={e => setNomeTarefa(e.target.value)}
                            required
                        />
                        <label>Valor</label>
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
                </div>

                <div className="card-right">
                    <div className="listar-tarefas-criadas">
                        <h1>Tarefas Criadas</h1>
                        <ul>
                            {tarefas.map((tarefa) =>
                                  tarefa.status=== 'ATIVA' ? (
                                        <li className="tarefa-ativa" key={tarefa.id}>
                                            {tarefa.nomeTarefa} - {tarefa.valorTarefa} Pontos<div> <button className="btn-editar-tarefa" onClick={() => handleModal(tarefa)}>Editar</button> <button className="btn-excluir-tarefa" onClick={()=>handleExcluir(tarefa)}>Desativar</button></div> 
                                        </li>
                                ) : (
                                        <li className="tarefa-desativada" key={tarefa.id}>
                                            {tarefa.nomeTarefa} - {tarefa.valorTarefa} Pontos <button className="btn-reativar" onClick={() => handleReativar(tarefa)}> Reativar tarefa</button>
                                        </li>
                                    )   
                            )}
                        </ul>
                    </div>
                </div>
            </div>




            {isOpen && tarefaSelecionada && (
                <ModalCriarTarefa
                    onClose={handleClose}
                    tarefa={tarefaSelecionada}
                />
            )}



        </div>
    );
}

export default CadastroTarefa; 