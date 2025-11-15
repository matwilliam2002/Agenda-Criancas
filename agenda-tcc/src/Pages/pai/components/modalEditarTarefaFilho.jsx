//import { useState, useEffect } from "react";
import "../components/modalEditarTarefaFilho.css";

function ModalEditarTarefa({ onClose, tarefa, onTaeraConcluida }) {

  console.log("Valores vindo da tarefa selecionada, ", tarefa);

  const handleConcluirTarefa = async () => {
    try {

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/tarefaFilho/concluirTarefa", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          filhoId: tarefa.filhoId,
          tarefaId: tarefa.id,
          valor: tarefa.valor,
        }),
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

  async function handleDesativar() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/tarefaFilho/desativarTarefaFilho", {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: tarefa.id,
        })
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao desativar tarefa");
      }

      const data = await response.json();
      console.log(data.message); 
      onClose();
      onTaeraConcluida();

    } catch (error) {
      console.error(error);
    }
  }

  console.log("Dados da tarefa vindo do calendario: ", tarefa);

  return (
    <div className="Container">
      <div className="container-modal">
        <h1>Gerenciar Tarefa</h1>
        <button type="button" onClick={handleConcluirTarefa}>Concluir tarefa</button>
        <button type="submit" onClick={handleDesativar}>Desativar tarefa</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );



}





export default ModalEditarTarefa;
