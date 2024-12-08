import styled from 'styled-components';
import setaImg from '../../images/seta_envio.png';
import { Titulo } from '../Styled/Titulo';
import { StyledMain } from '../Styled/FormularioStyledMain';
import { StyledConteudo } from '../Styled/FormularioStyledConteudo';
import { Label } from '../Styled/FormularioLabel';
import { Input } from '../Styled/FormularioInput';
import { StyledDivisao } from '../Styled/FormularioDivisao';
import { GrupoFormulario } from '../Styled/FormularioGrupo';
import { StyledLink } from '../Styled/Link';
import { StyledTextoLink } from '../Styled/TextoLink';
import { StyledTextoFormulario } from '../Styled/FormularioTexto';
import {useLogin} from "../../services/Login";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BotaoFormulario = styled.button`
  background-color: var(--cor-primaria);
  width: 5.658rem;
  height: 5rem;
  border-radius: 2.063rem;
  margin-top: 5%;
  cursor: pointer;

  &:hover {
    background-color: var(--cor-hover_primaria);
  }
`;

const FormularioEstilizado = styled.form`
  display: contents; 
`;

function FormularioLogin() {
  const { formState, setFormState, handleSubmit } = useLogin();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleSubmit(e);
      if (response.status === "ok") {
        localStorage.setItem('token', response.data);
        toast.success('Login realizado com sucesso!');
        window.location.href = '/area-colaborador';
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast.error('Erro ao fazer login. Usuário/senha incorreto');
    }
  };

  return (
    <StyledMain>
      <StyledConteudo>
        <Titulo>Login</Titulo>
        <StyledDivisao />

        <FormularioEstilizado onSubmit={handleFormSubmit}>
          <GrupoFormulario>
            <Label htmlFor="email">Email:</Label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              value={formState.email}
              onChange={e => setFormState({ ...formState, email: e.target.value })}
              required
            />
          </GrupoFormulario>

          <GrupoFormulario>
            <Label htmlFor="senha">Senha:</Label>
            <Input 
              type="password" 
              id="senha" 
              name="senha" 
              minLength={8} 
              value={formState.senha}
              onChange={e => setFormState({ ...formState, senha: e.target.value })}
              required
            />
          </GrupoFormulario>

          <BotaoFormulario type="submit">
            <img src={setaImg} alt="Seta" />
          </BotaoFormulario>
        </FormularioEstilizado>

        <StyledTextoFormulario>
          Não possui uma conta? 
          <StyledLink to="/cadastro">
            <StyledTextoLink>Cadastrar</StyledTextoLink>
          </StyledLink>
        </StyledTextoFormulario>
      </StyledConteudo>
      <ToastContainer />
    </StyledMain>
  );
}

export default FormularioLogin;
