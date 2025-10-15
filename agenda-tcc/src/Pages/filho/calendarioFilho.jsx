import { useState, useEffect, useRef } from "react";
import "../filho/calendarioFilho.css";
import Pontos from "./components/pontosFilho";
import Check from ".//..//..//assets/verificar.png";
import Wrong from ".//..//..//assets/cruz.png";
import ModalConcluir from "./components/modalConcluirTarefa";
import ModalMostrarTarefa from "./components/modalMostrarTarefa";
import { useNavigate } from 'react-router-dom';
import IconAmanha from '../../assets/agenda.png';
import iconHora from '../../assets/clock.png';
import iconValor from '../../assets/coin.png';
import iconTarefa from '../../assets/task.png';



function CalendarioFilho() {

  const [tarefasFilho, setTarefasFilho] = useState([]);
  const [hoje, setHoje] = useState([]);
  const [amanha, setAmanha] = useState([]);
  const [ontem, setOntem] = useState([]);
  const [tarefasConcluidasOntem, setTarefasConcluidasOntem] = useState(0);
  const [tarefasNaoConcluidasOntem, setTarefasNaoConcluidasOntem] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState([]);
  const [modalMostrarTarefa, setmodalMostrartarefa] = useState(false);
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const pontosRef = useRef();



  async function fetchTarefasFilho() {
    const token = localStorage.getItem("token")
    try {
      if (!token) {
        alert("Você precisa estar logado para cadastrar tarefas");
        return;
      }

      const response = await fetch("http://localhost:3000/api/tarefaFilho/mostrarTarefasFilho", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) throw new Error("Erro ao buscar as tarefas do usuário");

      const data = await response.json();
      setTarefasFilho(data);

      const hojeFiltrado = filtrarTarefasHoje(data);
      setHoje(hojeFiltrado);

      const amanhaFiltrada = filtrarTarefasAmanha(data);
      setAmanha(amanhaFiltrada);

      const ontemFiltrada = filtrarTarefasontem(data);
      setOntem(ontemFiltrada);


    } catch (error) {
      console.error(error);
      alert("Erro ao carregar tarefas");

    }
  }

  useEffect(() => {
    fetchTarefasFilho();
  }, []);

  useEffect(() => {
    const filtrada = ontem.filter(tarefa => tarefa.concluida === true);
    setTarefasConcluidasOntem(filtrada.length);
  }, [ontem]);

  useEffect(() => {
    const filtrada = ontem.filter(tarefa => tarefa.concluida === false)
    setTarefasNaoConcluidasOntem(filtrada.length);
  }, [ontem])


  function filtrarTarefasHoje(tarefasFilho) {
    const hoje = new Date();
    return tarefasFilho.filter(tarefaFilho => {
      const dataTarefa = new Date(tarefaFilho.dataHora);
      return (
        dataTarefa.getDate() === hoje.getDate() &&
        dataTarefa.getMonth() === hoje.getMonth() &&
        dataTarefa.getFullYear() === hoje.getFullYear()
      );
    });
  }

  function filtrarTarefasAmanha(tarefasFilho) {
    const hoje = new Date();

    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);

    return tarefasFilho.filter(tarefaFilho => {
      const dataTarefa = new Date(tarefaFilho.dataHora);
      return (
        dataTarefa.getDate() === amanha.getDate() &&
        dataTarefa.getMonth() === amanha.getMonth() &&
        dataTarefa.getFullYear() === amanha.getFullYear()
      );
    })
  }

  function filtrarTarefasontem(tarefasFilho) {
    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(hoje.getDate() - 1)

    return tarefasFilho.filter(tarefaFilho => {
      const dataTarefa = new Date(tarefaFilho.dataHora);

      return (
        dataTarefa.getDate() === ontem.getDate() &&
        dataTarefa.getMonth() === ontem.getMonth() &&
        dataTarefa.getFullYear() === ontem.getFullYear()
      )
    })
  }

  function handleModal(diaHoje) {
    if (diaHoje.concluida==='CONCLUIDA'||diaHoje.concluida==='ANALISE') return; // não deixa abrir de novo
    setIsOpen(true);
    setTarefaSelecionada(diaHoje);
  }

  function handleClose() {
    setIsOpen(false);
    setTarefaSelecionada(null);
    chamarAtualizarPontos();
  }

  function atualizarTarefas() {
    fetchTarefasFilho();
  }

  function chamarAtualizarPontos() {
    if (pontosRef.current) {
      pontosRef.current.atualizarPontos(); // 🔹 chama direto a função do filho
    }
  }

  function handleModalMostrarTarefa(dia) {
    setmodalMostrartarefa(true);
    setDiaSelecionado(dia);
  }

  function handleCloseModalMostrarTarefa() {
    setmodalMostrartarefa(false);
    setDiaSelecionado(null);
  }

  const navigate = useNavigate();

  function handleDirecionamentoPontos() {
    console.log("vOCE ESTA NA PAGINA");
    navigate('/premios');

  }


  return (
    <div className="container">
      <h1 className="tituloCalendario">Suas tarefas</h1>
      <Pontos
        ref={pontosRef}
        onClick={handleDirecionamentoPontos}
      />
      <div className="cards">
        <div className="cardDia"
          onClick={() => handleModalMostrarTarefa("ontem")}
        >
          <h2>Ontem</h2>
          <label><p>Tarefas concluidas ontem: {tarefasConcluidasOntem} </p> <img className="iconStatus" src={Check} alt="Check" /></label>
          <label><p>Tarefas Não Concluidas: {tarefasNaoConcluidasOntem}</p> <img className="iconStatus" src={Wrong} alt="wrong" /> </label>

        </div>

        <div className="cardDiaHoje">
          <h2>Hoje</h2>
          <ul>
            {hoje.map((diaHoje) => {
              const horaFormatada = new Date(diaHoje.dataHora).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <li key={diaHoje.id}
                  onClick={() => handleModal(diaHoje)}
                  className={
                    diaHoje.concluida === "CONCLUIDA"
                      ? "tarefa-concluida"
                      : diaHoje.concluida === "PENDENTE"
                        ? "tarefa-nao-concluida"
                        : diaHoje.concluida === "ANALISE"
                          ? "tarefa-analise"
                          : ""
                  }


                >
                  <div className="card-lista">
                    <img className="icon-lista" src={iconHora} alt="" /> {horaFormatada}
                  </div>

                  <div className="card-lista">
                    <img className="icon-lista" src={iconTarefa} alt="" /> {diaHoje.tarefa?.nomeTarefa}
                  </div>

                  <div className="card-lista">
                    <img className="icon-lista" src={iconValor} alt="" /> {diaHoje.tarefa.valorTarefa} Pontos
                  </div>

                </li>
              );
            })}
          </ul>
        </div>

        <div className="cardDia" onClick={() => handleModalMostrarTarefa("amanha")}>
          <h2>Amanhã <img className="icon-amanha" src={IconAmanha} alt="" /> </h2>
          <label> Amanhã vc terá: {amanha.length} Tarefas</label>

        </div>

        {modalMostrarTarefa && (
          <ModalMostrarTarefa
            diaEscolhido={diaSelecionado}
            diaAmanha={amanha}
            diaOntem={ontem}
            onClose={handleCloseModalMostrarTarefa}
          />
        )}

        {isOpen && tarefaSelecionada && (
          <ModalConcluir
            tarefaEscolhida={tarefaSelecionada}
            onClose={handleClose}
            onTaeraConcluida={atualizarTarefas}
          />
        )}



      </div>
    </div>
  );
}


export default CalendarioFilho;
