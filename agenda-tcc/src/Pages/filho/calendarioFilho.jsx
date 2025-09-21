import React, { useState } from "react";
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

      {isOpen&& (
      <ModalCriarTarefa 
      
      onClose = {handleClose}
      />
      )}

    </div>
  );
}

export default CalendarioFilho;
