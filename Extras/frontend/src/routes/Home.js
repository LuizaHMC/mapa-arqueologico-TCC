import styled from "styled-components";
import Mapa from "../components/Mapa";


const StyledApp = styled.div`

  background-color: var(--cor-secundaria);
  padding: 0;
  color: var(--cor-terciaria);

`;

function Home() {
  return (
    <StyledApp>
      <Mapa />
    </StyledApp>
  );
}

export default Home;

