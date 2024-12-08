import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './routes/Home';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from './components/Header';
import Login from './routes/Login';
import Cadastro from './routes/Cadastro';
import Colaborador from './routes/Colaborador';
import ColaboradorFormulario from './routes/ColaboradorFormulario';
import EdicaoDescoberta from './components/EdicaoDescoberta';
import DeletarDescoberta from './components/DeletarDescoberta';


const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inria+Serif:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inria+Serif:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  :root {
      --cor-primaria: #CF5C36;
      --cor-secundaria: white;
      --cor-terciaria: black;
      --cor-hover_primaria: Maroon;
      --cor-hover_secundaria: antiquewhite;
      --fonte-primaria: "Inria Serif", serif;
      --fonte-secundaria: "Poppins", sans-serif;
  }

  * {
      margin: 0;
      padding: 0;
  }

  .leaflet-control-logo {
    display: none !important;
}
`;

const App = () => {
  const location = useLocation();
  const showHeader = !location.pathname.includes('/atualizar-descoberta') && !location.pathname.includes('/deletar-descoberta');

  return (
    <>
      <GlobalStyle />
      {showHeader && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/area-colaborador" element={<Colaborador />} />
        <Route path="/formulario-colaborador" element={<ColaboradorFormulario />} />
        <Route path="/atualizar-descoberta/:id" element={<EdicaoDescoberta />} />
        <Route path="/deletar-descoberta/:id" element={<DeletarDescoberta />} />
      </Routes>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

