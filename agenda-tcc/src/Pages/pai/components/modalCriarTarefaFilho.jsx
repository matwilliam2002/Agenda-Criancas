import { useState, useEffect  } from "react";
import "../../filho/components/modalCriarTarefaCrianca.css";

function ModalCriarTarefa({onClose}) {

  const [dadosTarefas, setDadosTarefas] = useState([]); 
  const [tarefaEscolhida, setTarefaEscolhida] = useState([]); 
  const [dataHora, setDataHora] = useState(""); 
  const [tarefaCadastrada, setTarefaCadastrada] = useState([]);

  

  async function fetchTarefas() {
    const token = localStorage.getItem("token"); 
    try {
      const response = await fetch("http://localhost:3000/api/tarefas/BuscarTiposTarefas", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json(); 
      console.log("Dados tarefas: ", data);
      setDadosTarefas(data); 
      
    } catch (error) {
      alert("Deu erro")
    }
  }

    useEffect(() => {
    fetchTarefas();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token")

    if (!token) {
      alert("Você precisa estar logado para cadastrar tarefas");
      return;
    }

    const dataHoraFormatada = dataHora.replace('T', ' ') + ':00';

    try {
      const response = await fetch("http://localhost:3000/api/tarefaFilho/criarTarefaFilho", {
        method:'POST',  
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }, 
        body: JSON.stringify({
          tarefaId : tarefaEscolhida.id,
          dataHora: dataHoraFormatada,
        }),
      })

      if (!response.ok) throw new Error("Erro ao cadastrar tarefa");

      const data = await response.json(); 
      console.log("Tarefa cadstrada com sucesso", data);
      setTarefaCadastrada(data); 

      setDataHora("");
      setTarefaEscolhida(null);
      onClose(); 
      
    } catch (error) {
      console.error(error);
      console.log("Tarefa id", dataHoraFormatada);

    }
  }

  return (
    <div className="Container">
      <div className="container-modal">
        <h1>Adicionar tarefa</h1>
        <form onSubmit={handleSubmit}>
          <label>Dia e horário</label>
          <input
            type="datetime-local"
            name="usuario"
            onChange={(e) => setDataHora(e.target.value)}
            required
          />
          <label>Tarefas</label>
          <ul>
            {dadosTarefas.map((dadosTarefa) => (
              <li key={dadosTarefa.id}>
                <label>
                  <input
                    type="radio"
                    name="tarefa"   
                    value={dadosTarefa.id}
                    checked={tarefaEscolhida?.id === dadosTarefa.id}
                    onChange={() => setTarefaEscolhida(dadosTarefa)}
                  />
                  {dadosTarefa.nomeTarefa}
                </label>
              </li>
            ))}
          </ul>
          <label >Valor tarefa: {tarefaEscolhida?.valorTarefa}</label>
          <button type="submit">Salvar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default ModalCriarTarefa;
