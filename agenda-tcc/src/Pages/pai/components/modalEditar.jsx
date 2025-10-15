import './modalEditar.css'; 

function Modal({ filho, onClose}) {
  async function handleSubmit(e) {
    e.preventDefault();
    const usuario = e.target.usuario.value;
    const senha = e.target.senha.value;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Você precisa estar logado");
        return;
      }

      const response = await fetch("http://localhost:3000/api/users/atualizarFilho", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: filho.id, usuario, senha }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Erro: " + (errorData.message || "Não foi possível atualizar."));
        return;
      }

      const data = await response.json();
      alert("Filho atualizado com sucesso!");
      console.log(data);

      // Atualiza o pai
      onClose();

    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro de conexão com o servidor");
    }
  }

  return (
    <div className="container-editar-filho">
      <div className="container-modal-editar-filho">
        <h1>Editar Filho</h1>
        <form onSubmit={handleSubmit}>
          <label>Usuário: </label>
          <input
            type="text"
            defaultValue={filho.usuario}
            name="usuario"
            required
          />

          <label>Senha</label>
          <input
            type="password"
            name="senha"
            required
          />

          <button type="submit">Salvar</button>
          <button type="button" className='btn-cancel-editar-filho' onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
