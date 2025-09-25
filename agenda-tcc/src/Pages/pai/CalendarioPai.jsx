import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocate from "@fullcalendar/core/locales/pt-br";
import ModalCriarTarefa from ".//components/modalCriarTarefaCalendarioFilho";




function CalendarioPai() {
    const [eventos, setEventos] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [filhoSelecionado, setFilhoSelecionado] = useState(null);
    const [dadosFetch, setDadosFetch] = useState([]);
    const navigate = useNavigate();

    async function fetchFilhos() {
        const token = localStorage.getItem("token")
        if (!token) {
            alert("Você precisa estar logado para cadastrar tarefas");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/users/mostrarFilho", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })

            if (!response.ok) throw new Error("Erro ao buscar filhos");

            const data = await response.json();
            setDadosFetch(data);
            console.log("Dados dos filhos", data);

        } catch (error) {
            console.error(error);
        }
    }

    async function fetchTarefasFilho() {
        const token = localStorage.getItem("token")
        try {
            if (!token) {
                alert("Você precisa estar logado para cadastrar tarefas");
                return;
            }

            const response = await fetch("http://localhost:3000/api/tarefaFilho/mostrarTarefafilhoPai", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'X-Custom-Data': filhoSelecionado?.id || "",
                }
            })

            if (!response.ok) throw new Error("Erro ao buscar as tarefas do usuário");

            const data = await response.json();
            console.log("Tarefas trazidas:", data);

            const eventosFormatados = data.map(a => ({
                id: a.id,
                title: a.tarefa ? a.tarefa.nomeTarefa : "Sem nome",
                start: a.dataHora,
                extendedProps: {
                    concluida: a.concluida,
                    tarefaId: a.tarefaId,
                    valor: a.tarefa ? a.tarefa.valorTarefa : "sem valor",
                }
            }))

            console.log("Eventos formatados: ", eventosFormatados);
            setEventos(eventosFormatados);

        } catch (error) {
            console.error(error);
            alert("Erro ao carregar tarefas");

        }
    }

    useEffect(() => {
        fetchFilhos();
    }, []);

    useEffect(() => {
        if (filhoSelecionado?.id) {
            fetchTarefasFilho();
        } else {
            setEventos([]); // limpa eventos quando nenhum filho estiver selecionado
        }
    }, [filhoSelecionado]);


    function handleDirecionamento() {
        navigate('/cadastroFilho')
    }

    function handleTarefa() {
        navigate('/cadastroTarefa')
    }

    const handleCreate = () => {
        setIsOpen(!isOpen);
    };

    function handleClose() {
        setIsOpen(!isOpen);
    }

    const atualizarEventos = async () => {
        if (filhoSelecionado?.id) {
            await fetchTarefasFilho(); // atualiza os eventos
        }
    };
    
    console.log("Filho selecionado: ", filhoSelecionado);

    return (
        <div>
            <h1>Voce esta no calendario do Pai</h1>
            <button onClick={handleDirecionamento} >CONFIGURACAO</button>
            <button onClick={handleTarefa}>Tarefas</button>
            <ul>
                <h1>Escolha seu filho</h1>
                {dadosFetch.map((dadoFetch) => {
                    return (
                        <li key={dadoFetch.id}>
                            <label>
                                <input
                                    type="radio"
                                    name="filhos"
                                    value={dadoFetch.id}
                                    checked={filhoSelecionado?.id === dadoFetch.id}
                                    onChange={() => setFilhoSelecionado(dadoFetch)}
                                />
                                {dadoFetch.usuario}
                            </label>
                        </li>
                    );
                })}
            </ul>
            <div>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    height={970}
                    locale={ptBrLocate}
                    events={eventos}
                    aspectRatio={1.35}
                    customButtons={{
                        botaoAdicionar: {
                            text: "Adicionar",
                            click: handleCreate
                        }
                    }}
                    headerToolbar={{
                        left: "title",
                        center: "botaoAdicionar",
                        right: "prev,next today"
                    }}
                />

                {isOpen && filhoSelecionado && (
                    <ModalCriarTarefa
                        dadosFilho={filhoSelecionado}
                        onClose={handleClose}
                        onTarefaCriada={atualizarEventos} // <<< função do pai

                    />
                )}

            </div>
        </div>
    );
}

export default CalendarioPai; 