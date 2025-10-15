import { useEffect, useState } from "react";
import NavBar from './components/navBar'; 
import './cadastroPremio.css'; 


function CadastroPremio() {
  const [nomePremio, setNomePremio] = useState("");
  const [valorPremio, setValorPremio] = useState(0);
  const [imagem, setImagem] = useState(null);
  const [dados, setDados] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault(); // importante para não recarregar a página

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Você precisa estar logado");
      return;
    }

    // Criar objeto FormData (para enviar arquivo + campos normais)
    const formData = new FormData();
    formData.append("nomePremio", nomePremio);
    formData.append("valorPremio", valorPremio);
    formData.append("imagem", imagem); // aqui vai o arquivo real

    const response = await fetch("http://localhost:3000/api/premios/createPremio", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    const data = await response.json();
    console.log("Cadastro de prêmio realizado com sucesso:", data);
    fetchPremios(); 

    // resetar os states
    setNomePremio("");
    setValorPremio(0);
    setImagem(null);
  }

  async function fetchPremios() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Você precisa estar logado");
        return;
      }

      const response = await fetch("http://localhost:3000/api/premios/buscarPremio", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const dadosTrazidos = await response.json();
      console.log("Dados apresentados:", dadosTrazidos);
      setDados(dadosTrazidos);

    } catch (error) {
      alert(error.message);

    }
  }

  useEffect(() => {
    fetchPremios();
  }, []
  );

  async function handleExcluir(premio) {
        try {
            const token = localStorage.getItem("token"); 

            const response = await fetch("http://localhost:3000/api/premios/desativarPremio", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    idPremio : premio.id, 
                })
            })

            if (!response.ok) {
                throw new Error("Erro na requisição");
            }

            fetchPremios()

        } catch (error) {
            console.error(error);
        }
  }

    async function handleReativar(premioEscolhido) {
        const token = localStorage.getItem("token"); 
        console.log("ai o premio: ", premioEscolhido);
        

        try {
            const response = await fetch("http://localhost:3000/api/premios/reativarPremio", {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({premioId: premioEscolhido.id}),
            })

            if (!response.ok) throw new Error("Erro ao reativar");
            console.log("Premio reativado com sucesso");
            fetchPremios(); 
        } catch (error) {
            console.error(error);
        }
   }
  

  console.log(dados);


  return (
    <div className="container-cadastro-premios">
      <NavBar />
      <h1>Cadastro Prêmio</h1>
      <div className="blocos">
        <div className="container-premios">
          <form className="formulario-adicionar-premio" onSubmit={handleSubmit}>
            <label>Nome prêmio</label>
            <input
              type="text"
              required
              value={nomePremio}
              onChange={(e) => setNomePremio(e.target.value)}
            />

            <label>Valor prêmio</label>
            <input
              type="number"
              required
              value={valorPremio}
              onChange={(e) => setValorPremio(e.target.value)}
            />

            <label>Imagem prêmio</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => setImagem(e.target.files[0])}
            />

            <button type="submit">Enviar</button>
          </form>
        </div>
        <div className="container-lista-premios">
          <h2>PRÊMIOS</h2>
          <ul>
            {dados.map((premio) => (
              premio.statusPremio==="ATIVA" ? (
                <li className="premios-ativos" key={premio.id}>
                {premio.nomePremio} || {premio.valorPremio} Pontos <img src={premio.imagemUrl}  />
                    <button className="botao-desativar" onClick={()=> handleExcluir(premio)} >Desativar</button>
              </li>
              ) : (
                <li className="premios-desativados" key={premio.id}>
                {premio.nomePremio} || {premio.valorPremio} Pontos <img src={premio.imagemUrl}  />
                    <button className="botao-ativar" onClick={()=>handleReativar(premio)}>Reativar</button>
              </li>
              )
              
            ))}
          </ul>

          <div className="cardPremios">

          </div>
        </div>
      </div>

    </div>
  );
}

export default CadastroPremio;
