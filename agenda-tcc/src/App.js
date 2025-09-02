import './App.css';
import React from 'react';
import Login from './Pages/login';
import CalendarioPai from './Pages/pai/CalendarioPai';
import CadastroFilho from './Pages/pai/CadastroFilho'; 
import { Routes, Route } from 'react-router-dom';
import CalendarioFilho from './Pages/filho/calendarioFilho';
import CadastroPremio from './Pages/pai/CadastroPremio'; 


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/calendarioPai' element={< CalendarioPai/>} />
      <Route path='/calendarioFilho' element={< CalendarioFilho />}/>
      <Route path='/cadastroFilho' element={<CadastroFilho />} />
      <Route path='/cadastroPremio' element={<CadastroPremio />} /> 
    </Routes>
  );
}

export default App;
