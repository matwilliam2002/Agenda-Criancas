//import { useState, useEffect } from "react";
import "./modalConcluirTarefa.css";

function ModalEditarTarefa({ tarefaEscolhida, onClose, onTaeraConcluida }) {
  console.log("Tarefa selecionada: ", tarefaEscolhida);

  async function handleConcluir() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/tarefaFilho/concluirTarefaFilho", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          tarefaId: tarefaEscolhida.id,
          valor: tarefaEscolhida.tarefa.valorTarefa
        })
      })

      if (!response.ok) throw new Error("Erro ao cadastrar tarefa");

      const data = await response.json();
      console.log("Tarefa atualizada com sucesso");
      onClose();
      onTaeraConcluida();
      return data;

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="Container">
      <div className="container-modal">
        <h1>Adicionar tarefa</h1>
        <button type="button"  onClick={handleConcluir}>Concluir tarefa</button>
        <button type="button" onClick={onClose} >Cancelar</button>
      </div>
    </div>
  );
}

export default ModalEditarTarefa;
