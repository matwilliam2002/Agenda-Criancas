import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocate from "@fullcalendar/core/locales/pt-br";
import "../filho/calendarioFilho.css"
import ModalCriarTarefa from "./components/modalCriarTarefaCrianca";


function CalendarioFilho() {
  const [eventos, setEventos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Exemplo de função para abrir modal ou adicionar evento
  const handleCreate = () => {
    setIsOpen(!isOpen);
  };

  function handleClose() {
    setIsOpen(!isOpen);
  }

  async function fetchTarefasFilho() {
    const token = localStorage.getItem("token")
    try {
      if (!token) {
        alert("Você precisa estar logado para cadastrar tarefas");
        return;
      }

      const response = await fetch("http://localhost:3000/api/tarefaFilho/mostrarTarefaFilho", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
    fetchTarefasFilho();
  }, []);

  const atualizarEventos = async () => {
    await fetchTarefasFilho();
  };



  return (
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

      {isOpen && (
        <ModalCriarTarefa
          onTarefaCriada={atualizarEventos}
          onClose={handleClose}
        />
      )}

    </div>
  );
}


export default CalendarioFilho;
