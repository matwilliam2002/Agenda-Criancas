import { useState } from 'react';
import './modalEditarTarefa.css'; 

function ModalCriarTarefa({tarefa, onClose}) {

    const [nomeTarefa, setNomeTarefa] = useState(tarefa.nomeTarefa); 
    const [valorTarefa, setValorTarefa] = useState(tarefa.valorTarefa); 
    
    console.log(tarefa);
    
    async function handleSubmit(e) {
        e.preventDefault(); 

        try {
            const token = localStorage.getItem("token"); 
            if (!token) {
                alert("Você precisar estar logado para acessar"); 
                return; 
            }

            const response = await fetch("http://localhost:3000/api/tarefas/atualizarTarefa/", {
                method: "PATCH", 
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    idTarefa: tarefa.id, 
                    nomeTarefa, 
                    valorTarefa,
                }),
            })

            
            if (!response.ok) {
                const erro = await response.json();
                alert(erro.message || "Erro desconhecido");
                return;
            }

            const data = await response.json(); 
            console.log("Dados atualizados: ", data);
            onClose(); 
            
        } catch (error) {
            alert(error.message);
        }
    }


    return(
        <div className="modalCriarTarefa" onSubmit={handleSubmit}>
            <form className='form-editar-tarefa'>
                <h1>Editar tarefa</h1>
                <label> Nome Tarefa</label>
                <input 
                    type="text"
                    required
                    value={nomeTarefa}
                    onChange={e => setNomeTarefa(e.target.value)}
                />
                <label>Pontos</label>
                <input type="number" 
                value={valorTarefa}
                onChange={e=> setValorTarefa(e.target.value)}
                required
                />
                <button 
                    className='confirmar-editar-tarefa'
                    type='submit'
                >
                    Salvar
                </button>
                <button 
                className='btn-cancelar-editar-tarefa'
                type="button" 
                onClick={onClose}
                >
                Cancelar
                </button>

            </form>
            
        </div>
    ); 
}

export default ModalCriarTarefa; 