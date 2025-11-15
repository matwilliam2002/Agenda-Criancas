import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocate from "@fullcalendar/core/locales/pt-br";
import ModalCriarTarefa from ".//components/modalCriarTarefaCalendario";
import ModalEditarTarefa from "../pai/components/modalEditarTarefaFilho";
import NavBar from '../pai/components/navBar';
import './calendarioPai.css';


function CalendarioPai() {
    const [eventos, setEventos] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [filhoSelecionado, setFilhoSelecionado] = useState(null);
    const [dadosFetch, setDadosFetch] = useState([]);
    const [isOpenModalEditar, setIsOpenModalEditar] = useState(false);
    const [tarefaSelecionada, setTarefaSelecionada] = useState([]);
    const [dadosResgate, setDadosResgate] = useState([])

    async function fetchFilhos() {
        const token = localStorage.getItem("token")
        if (!token) {
            alert("Você precisa estar logado para cadastrar tarefas");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/users/mostrarFilhosAtivos", {
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


            const eventosFormatados = data.map(a => {
                const inicio = new Date(a.dataHora);
                const fim = new Date(inicio.getTime() + 1 * 60000); // +1 minuto
                return {
                    id: a.id,
                    title: a.tarefa ? a.tarefa.nomeTarefa : "Sem nome",
                    start: inicio,
                    end: fim,
                    extendedProps: {
                        concluida: a.concluida,
                        tarefaId: a.tarefaId,
                        valor: a.tarefa ? a.tarefa.valorTarefa : "sem valor",
                        status: a.status,
                    }
                };
            });


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


    const handleOpenModalCriar = () => setIsOpen(true);
    const handleCloseModalCriar = () => setIsOpen(false);

    const handleOpenModalEditar = (tarefa) => {
        setTarefaSelecionada(tarefa);
        setIsOpenModalEditar(true);
    };
    const handleCloseModalEditar = () => setIsOpenModalEditar(false);

    const atualizarEventos = async () => {
        if (filhoSelecionado?.id) {
            await fetchTarefasFilho();
        }
    };

    const eventClick = (info) => {
        const tarefa = {
            id: info.event.id,
            title: info.event.title,
            start: info.event.start,
            ...info.event.extendedProps,
            filhoId: filhoSelecionado.id
        };
        handleOpenModalEditar(tarefa);
    };


    console.log("Filho selecionado: ", filhoSelecionado);

    async function fetchResgistros() {

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Você precisa estar logado para cadastrar tarefas");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/resgate/mostrarHistorico", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'idFilho': `${filhoSelecionado.id}`
                }
            })

            if (!response.ok) throw new Error("Erro ao buscar filhos");

            const data = await response.json();
            console.log("Dados de log", data);
            setDadosResgate(data);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchResgistros();
    }, [filhoSelecionado]);

    console.log("Resgate: ", dadosResgate);






    return (
        <div className='container-calendario-pai'>
            <NavBar />
            <h1 className='saudacao'>Bem vindo(a) ao calendário</h1>

            <ul className='lista-filhos'>
                <h2>Escolha seu filho</h2>
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

            <div className='calendarioPai'>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    height={900}
                    locale={ptBrLocate}
                    events={eventos}
                    aspectRatio={1.35}
                    customButtons={{
                        botaoAdicionar: {
                            text: "Adicionar",
                            click: handleOpenModalCriar
                        }
                    }}
                    headerToolbar={{
                        left: "title",
                        center: "botaoAdicionar",
                        right: "prev,next today"
                    }}

                    eventClassNames={(info) => {
                        const {concluida, status}  = info.event.extendedProps;
                        console.log("Status tarefa: ", status);
                        

                        if (status === "ATIVA") {
                            if (concluida === 'CONCLUIDA') {
                                return ["evento-concluido"];
                            }
                            if (concluida === 'PENDENTE') {
                                return ["evento-pendente"];
                            }
                            if (concluida === "ANALISE") {
                                return ["evento-analise"];
                            }
                        }else{
                            return ["evento-desativado"];
                        }
                        

                    }}

                    eventClick={eventClick}
                />

                {isOpen && filhoSelecionado && (
                    <ModalCriarTarefa
                        dadosFilho={filhoSelecionado}
                        onClose={handleCloseModalCriar}
                        onTarefaCriada={atualizarEventos}

                    />
                )}

                {
                    isOpenModalEditar && tarefaSelecionada && (
                        <ModalEditarTarefa
                            tarefa={tarefaSelecionada}
                            onClose={handleCloseModalEditar}
                            onTaeraConcluida={atualizarEventos}
                        />
                    )
                }
            </div>

            <div>
                <ul className='lista-filhos'>
                    <h2>Lista de resgates de premios</h2>

                    
                    {dadosResgate.map((log) => {
                        return (
                            <li key={log.id}>
                                {log.premio?.nomePremio || `${log.premioId || "Premio indisponível"}`} - {log.pontosGastos} Pontos - {log.dataResgate}
                            </li>
                        );
                    })}
                    <h2>-----------------</h2>
                </ul>
            </div>
        </div>
    );
}

export default CalendarioPai; 