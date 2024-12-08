import React from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Titulo } from '../Styled/Titulo';
import { StyledMain } from '../Styled/FormularioStyledMain';
import { StyledConteudo } from '../Styled/FormularioStyledConteudo';
import { Input } from '../Styled/FormularioInput';
import { Label } from '../Styled/FormularioLabel';
import { StyledDivisao } from '../Styled/FormularioDivisao';
import { GrupoFormulario } from '../Styled/FormularioGrupo';
import { StyledLink } from '../Styled/Link';
import { StyledTextoLink } from '../Styled/TextoLink';
import { StyledTextoFormulario } from '../Styled/FormularioTexto';
import { useCadastro } from "../../services/Cadastro";
import { useValidacaoFormulario } from '../FormularioCadastro/ValidacaoFormulario';

const GrupoLinhaFormulario = styled.div`
  display: flex;
  margin-top: 0.625rem;
  gap: 2.5rem;
  
  @media (max-width: 991px) {
    justify-content: space-between;
  }
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
  
  @media (max-width: 991px) {
    margin-top: 2.5rem;
    padding: 0 1.25rem;
  }

  &:hover {
    background-color: var(--cor-hover_primaria);
  }
`;

const FormularioEstilizado = styled.form`
  display: contents;
`;

const MensagemErro = styled.span`
  color: red;
  font-size: 0.875rem;
  margin-left: 0.5rem;
`;

function FormularioCadastro() {

  const { formState, setFormState, handleSubmit } = useCadastro();

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
        toast.error('Erro inesperado ao cadastrar usuário.'); 
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      toast.error(error.message || 'Erro ao cadastrar usuário.'); 
    }

};


  return (
    <StyledMain>
      <StyledConteudo>
        <Titulo>Criar conta</Titulo>
        <StyledDivisao />
        <FormularioEstilizado onSubmit={handleFormSubmit}>

          <GrupoFormulario>
            <Label htmlFor="name">Nome/Instituição</Label>
            <Input
              type="text"
              id="name"
              name="nome"
              required
              onChange={e => setFormState({ ...formState, nome: e.target.value })}
            />
            <MensagemErro className="error-message"></MensagemErro>
          </GrupoFormulario>

          <GrupoLinhaFormulario>
            <GrupoFormulario>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                required
                onChange={e => setFormState({ ...formState, email: e.target.value })}
              />
              <MensagemErro className="error-message"></MensagemErro>
            </GrupoFormulario>

            <GrupoFormulario>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                type="tel"
                id="phone"
                name="telefone"
                required
                onChange={e => setFormState({ ...formState, telefone: e.target.value })}
              />
              <MensagemErro className="error-message"></MensagemErro>
            </GrupoFormulario>
          </GrupoLinhaFormulario>

          <GrupoFormulario>
            <Label htmlFor="birthdate">Data nascimento/fundação</Label>
            <Input
              type="date"
              id="birthdate"
              name="dataRegistro"
              required
              onChange={e => setFormState({ ...formState, dataRegistro: e.target.value })}
            />
            <MensagemErro className="error-message"></MensagemErro>
          </GrupoFormulario>

          <GrupoFormulario>
            <Label htmlFor="password">Senha (Mínimo 8 caracteres):</Label>
            <Input
              type="password"
              id="password"
              name="senha"
              required
              onChange={e => setFormState({ ...formState, senha: e.target.value })}
            />
            <MensagemErro className="error-message"></MensagemErro>
          </GrupoFormulario>

          <BotaoFormulario type="submit">Criar Conta</BotaoFormulario>

        </FormularioEstilizado>

        <StyledTextoFormulario>
          Já possui uma conta? 
          <StyledLink to="/login">
            <StyledTextoLink>Login</StyledTextoLink>
          </StyledLink>
        </StyledTextoFormulario>
      </StyledConteudo>

      <ToastContainer /> 
    </StyledMain>
  );
}

export default FormularioCadastro;



