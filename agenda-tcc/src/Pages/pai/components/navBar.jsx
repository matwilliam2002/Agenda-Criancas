import './navBar.css'; 
import { useNavigate, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  function handleDirecionamentoConfiguracao() {
    navigate('/cadastroFilho');
  }

  function handleDirecionamentoTarefa() {
    navigate('/cadastroTarefa');
  }

  function handleDirecionamentoPremio() {
    navigate('/cadastroPremio');
  }

  function handleDirecionamentoHome() {
    navigate('/calendarioPai');
  }

  return (
    <div className='container-navbar'>
      <div className='navbar'>
        <button 
          className={`botao-calendario ${location.pathname === '/calendarioPai' ? 'ativo' : ''}`} 
          onClick={handleDirecionamentoHome}
        >
          CALENDÁRIO
        </button>

        <button 
          className={`botao-adicionar-filho ${location.pathname === '/cadastroFilho' ? 'ativo' : ''}`} 
          onClick={handleDirecionamentoConfiguracao}
        >
          CADASTRO FILHO
        </button>

        <button 
          className={`${location.pathname === '/cadastroTarefa' ? 'ativo' : ''}`} 
          onClick={handleDirecionamentoTarefa}
        >
          TAREFAS
        </button>

        <button 
          className={`${location.pathname === '/cadastroPremio' ? 'ativo' : ''}`} 
          onClick={handleDirecionamentoPremio}
        >
          PRÊMIOS
        </button>
      </div>
    </div>
  );
}

export default NavBar;
