
import React, { useEffect, useState } from 'react';
import MenuColaborador from '../MenuColaborador';
import styled from "styled-components";
import edit_icon from '../../images/edit-icon.png';
import delete_icon from '../../images/delete-icon.png';
import { listarDescobertasColaborador } from '../../services/Descobertas';
import {Titulo} from "../Styled/Titulo";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Content = styled.div`
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 18px;
`;

const Divisor = styled.hr`
  width: 40%;
  border: 3px solid var(--cor-primaria);
  background-color: var(--cor-primaria);
  margin-top: 24px;
`;

const LogoutButton = styled.button`
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    color: white;
    background-color: var(--cor-primaria);
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    margin-bottom: 2rem;
    margin-top: 18px;

    &:hover {
        background-color: var(--cor-hover_primaria);
    }
`;

const TabelaContainer = styled.div`
    width: 100%;
    background-color: #fff;
    border-radius: 0.25rem;
    overflow-x: auto;
    padding-bottom: 2rem;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        padding: 0.75rem;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    th {
        background-color: #f5f5f5;
    }

    
    @media (max-width: 455px) {
        td, th {
            font-size: 0.875rem; 
            padding: 0.5rem; 
        }

        
        th:nth-child(2), td:nth-child(2),
        th:nth-child(3), td:nth-child(3),
        th:nth-child(4), td:nth-child(4) {
            display: none;
        }

        
        th:nth-child(1), td:nth-child(1),
        th:nth-child(5), td:nth-child(5) {
            width: 50%; 
        }
    }
`;

const ActionButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    margin-right: 0.5rem;

    img {
        width: 24px;
        height: 24px;
    }

    &:hover {
       transition: transform 0.3s ease;
       transform: scale(1.10);
    }
`;

const AreaColaborador = () => {
    const [userID, setID] = useState('');
    const [userName, setUserName] = useState('');
    const [descobertas, setDescobertas] = useState([]);
    const [editWindow, setEditWindow] = useState(null); 
    const [deleteWindow, setDeleteWindow] = useState(null); 
    const [loading, setLoading] = useState(true); 
    
    
    const fetchDescobertas = async () => {
        setLoading(true);
        try {
            const data = await listarDescobertasColaborador(userID);  
            setDescobertas(data);
        } catch (error) {
            console.error("Erro ao buscar descobertas:", error);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        
        async function fetchUser() {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token não encontrado');
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/autenticacao/usuario-logged", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token }),
                });

                const data = await response.json();
                if (data.status === "success") {
                    setID(data.data._id);  
                    setUserName(data.data.nome);  
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error("Erro ao buscar o usuário:", error);
            }
        }

        fetchUser();
    }, []);

    useEffect(() => {
        
        if (userID) {
            fetchDescobertas(); 
        }
    }, [userID]);

    useEffect(() => {
        
        const handleStorageChange = (event) => {
            if (event.key === 'descobertaAtualizada' || event.key === 'descobertaDeletada') {
                fetchDescobertas(); 
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleEdit = (descoberta) => {
        if (editWindow && !editWindow.closed) {
           
            editWindow.focus();
        } else {
           
            localStorage.setItem('descobertaEdit', JSON.stringify(descoberta));
            const newWindow = window.open(`/atualizar-descoberta/${descoberta._id}`, '_blank', 'width=452,height=700');
            setEditWindow(newWindow); 
        }
    };

    const handleDelete = (descoberta) => {
        if (deleteWindow && !deleteWindow.closed) {
            
            deleteWindow.focus();
        } else {
            
            localStorage.setItem('descobertaDelete', JSON.stringify(descoberta));
            const newWindow = window.open(`/deletar-descoberta/${descoberta._id}`, '_blank', 'width=452,height=700');
            setDeleteWindow(newWindow); 
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <Container>
            <MenuColaborador />
            <Content>
                <Titulo>Olá, {userName}!</Titulo>
                <Divisor />
                <LogoutButton onClick={handleLogout}>Deslogar</LogoutButton>
                <TabelaContainer>
                    <Table>
                        <thead>
                            <tr>
                                <th>Nome da Descoberta</th>
                                <th>Latitude (DD)</th>
                                <th>Longitude (DD)</th>
                                <th>Descrição</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {descobertas.length > 0 ? (
                                descobertas.map((descoberta) => (
                                    <tr key={descoberta._id}>
                                        <td>{descoberta.titulo}</td>
                                        <td>{descoberta.latitude}</td>
                                        <td>{descoberta.longitude}</td>
                                        <td>{descoberta.descricao}</td>
                                        <td>
                                            <ActionButton onClick={() => handleEdit(descoberta)}>
                                                <img src={edit_icon} alt="Editar" />
                                            </ActionButton>
                                            <ActionButton onClick={() => handleDelete(descoberta)}>
                                                <img src={delete_icon} alt="Deletar" />
                                            </ActionButton>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">Nenhuma descoberta encontrada.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </TabelaContainer>
            </Content>
        </Container>
    );
};

export default AreaColaborador;



