import { useState, useEffect  } from "react";
import './modalCriarTarefaFilho.css';

function ModalCriarTarefa({onClose, dadosFilho, onTarefaCriada}) {

  const [dadosTarefas, setDadosTarefas] = useState([]); 
  const [tarefaEscolhida, setTarefaEscolhida] = useState([]); 
  const [dataHora, setDataHora] = useState(""); 
  const [tarefaCadastrada, setTarefaCadastrada] = useState([]);

  console.log("dados filho: ", dadosFilho);
  


  async function fetchTarefas() {
    const token = localStorage.getItem("token"); 
    try {
      const response = await fetch("http://localhost:3000/api/tarefas/buscarTarefasAtivas", {
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
      const response = await fetch("http://localhost:3000/api/tarefaFilho/criarTarefaPai", {
        method:'POST',  
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }, 
        body: JSON.stringify({
          tarefaId : tarefaEscolhida.id,
          dataHora: dataHoraFormatada,
          filhoId: dadosFilho.id,
        }),
      })

      if (!response.ok) throw new Error("Erro ao cadastrar tarefa");

      const data = await response.json(); 
      console.log("Tarefa cadstrada com sucesso", data);
      setTarefaCadastrada(data); 

      setDataHora("");
      setTarefaEscolhida(null);
      onTarefaCriada(); 
      onClose(); 
      
    } catch (error) {
      console.error(error);
      console.log("Tarefa id", dataHoraFormatada);

    }
  }

  return (
    <div className="Container-all-modal-criar-tarefa">
      <div className="container-modal-criar-tarefa">
        <h1>Adicionar tarefa</h1>
        <form className="form-adicionar-tarefa" onSubmit={handleSubmit}>
          <div className="container-data">
            <label>Dia e horário</label>
            <input
              type="datetime-local"
              name="usuario"
              onChange={(e) => setDataHora(e.target.value)}
              required
            />
          </div>

          <div className="container-lista-tarefas">
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
                      required
                    />
                    {dadosTarefa.nomeTarefa}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          
          <label >Valor tarefa: {tarefaEscolhida?.valorTarefa} pontos</label>

          <div className="container-btns">
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default ModalCriarTarefa;
