import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { deletarDescoberta } from '../../services/Descobertas';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  max-width: 800px; 
  height: 100vh; 
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

  
  @media (max-width: 600px) {
    max-width: 90%; 
    padding: 15px; 
    height: auto; 
  }
`;

export const Button = styled.button`
  padding: 12px 25px;
  margin-top: 15px;
  background-color: var(--cor-primaria);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%; 
  
  &:hover {
    background-color: var(--cor-hover_primaria);
  }

  
  @media (max-width: 600px) {
    font-size: 14px; 
    padding: 10px 20px; 
  }
`;

const DeletarDescoberta = () => {

  const { id } = useParams(); 

  const handleDeletar = async () => {
    try {
      await deletarDescoberta(id);
      
      alert('Descoberta deletada com sucesso!');
      window.close(); 
    } catch (error) {
      console.error('Erro ao deletar a descoberta:', error);
      alert('Ocorreu um erro ao tentar deletar.');
    }
  };

  
  const handleCancelar = () => {
    window.close(); 
  };

  return (
    <Container>
      <h1>Deseja mesmo deletar a descoberta?</h1>
      <p>Essa ação não poderá ser desfeita</p>
      <Button type="button" onClick={handleDeletar}>Deletar</Button>
      <Button type="button" onClick={handleCancelar}>Não Deletar</Button>
    </Container>
  );
};

export default DeletarDescoberta;

