import { useNavigate } from 'react-router-dom';


function CalendarioPai() {

    const navigate = useNavigate(); 
    
    function handleDirecionamento(){
        navigate('/cadastroFilho')
    }

    function handlePremio(params) {
        navigate('/CadastroPremio')
    }
    
    return(
        <div>
            <h1>Voce esta no calendario do Pai</h1>
            <button onClick={handleDirecionamento} >CONFIGURACAO</button>
            <button onClick={handlePremio} >Premios</button>
        </div>
        
    ); 
}

export default CalendarioPai; 