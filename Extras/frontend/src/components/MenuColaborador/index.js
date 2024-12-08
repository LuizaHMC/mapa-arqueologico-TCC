import styled from "styled-components";
import { Link } from "react-router-dom";

const Menu = styled.header`
    width: 100%;
    background-color: var(--cor-primaria);
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 24px;
    text-align: center;
    padding: 12px 20px;
    box-sizing: border-box;
    gap: 20px;
    justify-content: center;

    @media (max-width: 991px) {
        flex-wrap: wrap;
        justify-content: center;
    }
`;

const Botao = styled.div`
    display: flex;
  
  button {
    width: 353px;
    height: 63px;
   
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border: 1px solid black;
    margin-top: 18px;
    background-color: var(--cor-primaria);
    color: var(--cor-secundaria);
    font-family: var(--fonte-secundaria);
    font-size: 18px;
    cursor: pointer;
    }

  button:hover {
        background-color: var(--cor-hover_primaria);
    }
`;

const Divisor = styled.div`
  border: 1px solid var(--cor-secundaria);
  height: 60px;

  @media (max-width: 991px) {
        display: none;
    }
`;

function MenuColaborador () {
    return (
        <Menu>
        
        <Botao>
            <Link to="/area-colaborador"> <button>Área Colaborador</button></Link>
        </Botao>
        <Divisor />
        <Botao>
            <Link to="/formulario-colaborador"><button>Adicionar Descoberta</button></Link>
        </Botao>
        
      </Menu>
    )
}


export default MenuColaborador;