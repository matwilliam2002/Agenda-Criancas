import { useNavigate } from 'react-router-dom';


function CalendarioPai() {

    const navigate = useNavigate(); 
    
    function handleDirecionamento(){
        navigate('/cadastroFilho')
    }

    function handleTarefa(params) {
        navigate('/cadastroTarefa')
    }
    
    return(
        <div>
            <h1>Voce esta no calendario do Pai</h1>
            <button onClick={handleDirecionamento} >CONFIGURACAO</button>
            <button onClick={handleTarefa}>Tarefas</button>
        </div>
        
    ); 
}

export default CalendarioPai; 