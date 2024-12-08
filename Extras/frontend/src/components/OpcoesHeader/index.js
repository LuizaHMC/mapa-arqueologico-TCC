import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Botao = styled.div`

    display: flex;
    gap: 2.5rem;
    

    button {
        width: 10.625rem;
        height: 1.75rem;
        color: var(--cor-primaria);
        background-color: var(--cor-secundaria);
        font-family: var(--fonte-secundaria);
        font-size: 1rem;
        text-align: center;
        border-radius: 0.313rem;
        cursor: pointer;
    }

    button:hover {
        background-color: var(--cor-hover_secundaria);
    }

    @media (max-width: 991px) {
        display: grid;
        gap: 10px;
    }

`;

function OpcoesMenu() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleColaboradorClick = () => {
        if (token) {
            navigate('/area-colaborador');
        } else {
            navigate('/cadastro');
        }
    };

    return (
        <Botao>
            <Link to="/"><button>Mapa Geral</button></Link>
            <button onClick={handleColaboradorClick}>Colaborador</button>
        </Botao>
    );
}

export default OpcoesMenu;