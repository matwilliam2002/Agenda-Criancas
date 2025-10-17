import './navBar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import IconSair from '..//../../assets/logout.png'; 


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

 function handleDirecionamentoSair() {
  localStorage.removeItem("token");
  navigate('/');
}

  return (
    <div className='container-navbar'>
      <div className='btns-direcionamento'>
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
      <div className='container-sair'>
        <h1>Sair</h1>
        <button className='btn-sair' onClick={handleDirecionamentoSair} > <img className='icon-sair' src={IconSair} alt="" /> </button>
      </div>
    </div>
  );
}

export default NavBar;
