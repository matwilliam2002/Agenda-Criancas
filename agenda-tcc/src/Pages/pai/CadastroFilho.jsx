import { useEffect, useState } from "react";
import ModalEditar from "./components/modalEditar"; 
import './CadastroFilho.css'; 

function CadastroFilho() {
  // Cadastro filho
  const [usuario, setUsuario] = useState(""); 
  const [senha, setSenha] = useState(""); 

  // Listar filhos
  const [filhos, setFilhos] = useState([]); // estado para os filhos
  const [erro, setErro] = useState(""); // estado para erros

  // Modal Editar
  const [modal, setModal] = useState(false); 
  const [filhoSelecionado, setFilhoSelecionado] = useState(null);

  // Função para cadastrar filho
  async function handleSubmit(e) {
    e.preventDefault(); 

    try {
      const token = localStorage.getItem("token"); 
      
      if (!token) {
        alert("Você precisa estar logado!");
        return;
      }

      const response = await fetch('http://localhost:3000/api/users/createFilho', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ usuario, senha, pai: false, pontos: 0 })
      }); 

      if (!response.ok) {
        const erro = await response.json();
        alert(erro.message || "Erro desconhecido");
        return;
      } else {
        const data = await response.json();
        console.log("Filho cadastrado com sucesso: ", data);
        setUsuario(""); 
        setSenha("");

        // Atualiza a lista de filhos depois do cadastro
        fetchFilhos();
      }
    } catch (error) {
      alert(error.message);
    }
  }

  // Função para listar filhos
  const fetchFilhos = async () => {
    try {
      const token = localStorage.getItem("token"); // Tenho que pegar o token para poder validar na hora da rota

      const response = await fetch("http://localhost:3000/api/users/mostrarFilho", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const data = await response.json(); 
      setFilhos(data); 
    } catch (error) {
      console.error(error);
      setErro("Erro ao buscar filhos");
    }
  };

  // Busca filhos assim que o componente monta
  useEffect(() => {
    fetchFilhos();
  }, []);

 function handleEdit(filho) {
  setFilhoSelecionado(filho);
  console.log("Filho selecionado:", filho);
  setModal(true);
 }

 function handleClose() {
  setModal(false);
  setFilhoSelecionado(null); 
  fetchFilhos();
 }
  
 
  return (
    <div className="Container">
      {/* Cadastro de Filho */}
      <div className="formCadastroFilho">
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit}>
          <label>Usuário</label>
          <input 
            type="text" 
            required 
            value={usuario} 
            onChange={e => setUsuario(e.target.value)} 
          />

          <label>Senha</label>
          <input 
            type="password" 
            required 
            value={senha} 
            onChange={e => setSenha(e.target.value)} 
          />

          <button type="submit">Cadastrar</button>
        </form>
      </div>

      {/* Lista de Filhos */} 
      <div className="ListarFilhos">
        <h1>Meus Filhos</h1>
        {erro && <p style={{ color: "red" }}>{erro}</p>} 
        <ul>
          {filhos.map((filho) => (
            <li key={filho.id}>
              Usuário: {filho.usuario} - Pontos: {filho.pontos} <button onClick={() => handleEdit(filho)}>Editar</button>
            </li>
          ))}
        </ul>
        {modal && filhoSelecionado && (
          <ModalEditar 
            filho={filhoSelecionado}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
}

export default CadastroFilho;
