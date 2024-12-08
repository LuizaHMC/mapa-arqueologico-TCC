import React, { useEffect } from 'react';
import styled from 'styled-components';
import MenuColaborador from '../MenuColaborador';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useValidacaoFormulario } from "./ValidacaoFormulario";
import { useCadastroDescoberta } from "../../services/CadastroDescobertas";
import { Titulo } from "../Styled/Titulo";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContainerFormulario = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 18px;
  padding: 20px 20px;
  box-sizing: border-box; 
`;

const Divisor = styled.hr`
  width: 80%;
  border: 3px solid var(--cor-primaria);
  background-color: var(--cor-primaria);
  margin-top: 24px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  margin-top: 37px;
  
  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  color: #000;
  font-weight: 400;
`;

const InputLabel = styled.label`
  font-family: var(--fonte-secundaria);
`;

const StyledInput = styled.input`
  display: flex;
  align-items: center;
  border: 1px solid #000;
  margin-top: 10px;
  height: 30px; 
  padding: 5px;
  font-size: 14px; 
  width: 100%; 
  box-sizing: border-box; 
  
  @media (max-width: 500px) {
    height: 28px; 
    font-size: 12px; 
  }
`;

const StyledTextarea = styled.textarea`
  border: 1px solid #000;
  margin-top: 10px;
  height: 150px;
  padding: 5px;
  font-size: 16px;
  resize: vertical;
  width: 100%; 
  box-sizing: border-box; 
  
  @media (max-width: 500px) {
    height: 120px; 
    font-size: 14px; 
  }
`;

const DescriptionSection = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const PhotoSection = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const BotaoFormulario = styled.button`
  font-family: var(--fonte-secundaria);
  font-size: 1.25rem;
  border-radius: 1.563rem;
  background-color: var(--cor-primaria);
  margin-top: 2.5rem;
  width: 22.063rem;
  max-width: 100%;
  align-items: center;
  color: var(--cor-secundaria);
  text-align: center;
  justify-content: center;
  padding: 1.75rem 3.75rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--cor-hover_primaria);
  }
`;

const MensagemErro = styled.span`
  color: red;
  font-size: 0.875rem;
  margin-left: 0.5rem;
`;

function FormularioDescoberta() {

  const { formState, setFormState, handleSubmit } = useCadastroDescoberta();
  const { validarFormulario } = useValidacaoFormulario();  

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = validarFormulario();

    if (!isFormValid) {
      toast.error('Por favor, corrija os erros no formulário antes de prosseguir.');
      return; 
    }

    try {
      const response = await handleSubmit(e);
      if (response && response.message) {
        toast.success(response.message);
      } else {
        toast.error('Erro ao cadastrar descoberta');
      }
    } catch (error) {
      console.error('Erro ao cadastrar descoberta:', error);
      toast.error(error.message || 'Erro ao cadastrar descoberta.');
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
          setFormState((prevState) => ({
            ...prevState,
            colaborador: data.data._id, 
          }));
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Erro ao buscar o usuário:", error);
      }
    }

    fetchUser();
  }, [setFormState]);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const handleInput = debounce((e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, 300);

  return (
    <>
      <AppWrapper>
        <MenuColaborador />
        <main>
          <ContainerFormulario id='formulario' onSubmit={handleFormSubmit}>
            <Titulo>Formulário de Descoberta</Titulo>
            <Divisor />
            <FormGrid>
              <InputWrapper>
                <InputLabel htmlFor="titulo">Título da Descoberta</InputLabel>
                <StyledInput 
                  type="text"
                  id="titulo"
                  name="titulo"
                  onChange={handleInput}
                  required
                />
                <MensagemErro className="error-message"></MensagemErro>
              </InputWrapper>
              <InputWrapper>
                <InputLabel htmlFor="dataDescoberta">Data da Descoberta</InputLabel>
                <StyledInput 
                  type="date"
                  id="dataDescoberta"
                  name="dataDescoberta"
                  onChange={handleInput}
                  required
                />
                <MensagemErro className="error-message"></MensagemErro>
              </InputWrapper>
              <InputWrapper>
                <InputLabel htmlFor="latitude">Latitude</InputLabel>
                <StyledInput 
                  type="number"
                  step="any"
                  id="latitude"
                  name="latitude"
                  onChange={handleInput}
                  required
                />
                <MensagemErro className="error-message"></MensagemErro>
              </InputWrapper>
              <InputWrapper>
                <InputLabel htmlFor="longitude">Longitude</InputLabel>
                <StyledInput 
                  type="number"
                  step="any"
                  id="longitude"
                  name="longitude"
                  onChange={handleInput}
                  required
                />
                <MensagemErro className="error-message"></MensagemErro>
              </InputWrapper>
              <InputWrapper>
                <InputLabel htmlFor="autores">Autor(es)</InputLabel>
                <StyledInput 
                  type="text"
                  id="autores"
                  name="autores"
                  onChange={handleInput}
                  required
                />
                <MensagemErro className="error-message"></MensagemErro>
              </InputWrapper>
              <InputWrapper>
                <InputLabel htmlFor="horarioDescoberta">Horário (opcional)</InputLabel>
                <StyledInput 
                  type="time"
                  id="horarioDescoberta"
                  name="horarioDescoberta"
                  onChange={handleInput}
                />
                <MensagemErro className="error-message"></MensagemErro>
              </InputWrapper>
            </FormGrid>
            <PhotoSection>
              <InputLabel>Foto (opcional)</InputLabel>
              <StyledInput 
                type="file" 
                name="foto" 
                accept=".png, .jpg, .webp" 
                onChange={(e) => setFormState({ ...formState, foto: e.target.files[0] })} 
              />
              <MensagemErro className="error-message"></MensagemErro>
            </PhotoSection>
            <DescriptionSection>
            <InputWrapper>
              <InputLabel>Descrição e Análise</InputLabel>
              <StyledTextarea 
              name="descricao" 
              onChange={handleInput}
              />
              <MensagemErro className="error-message"></MensagemErro>
            </InputWrapper>
          </DescriptionSection>
            <BotaoFormulario type="submit">Registrar Descoberta</BotaoFormulario>
          </ContainerFormulario>
        </main>
      </AppWrapper>
      <ToastContainer />
    </>
  );
}

export default FormularioDescoberta;


