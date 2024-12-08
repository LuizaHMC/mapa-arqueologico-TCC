import logo from '../../images/logo_mapa.jpg';
import styled from "styled-components";

const StyledLogo = styled.section`
    display: flex;
    gap: 0.75rem;

    img {
        @media (max-width: 991px) {
            display: none;
        }
    }
`;

const Titulo = styled.h1 `
    font-size: 2rem;
    font-family: var(--fonte-primaria);
`;

function Logo () {
    return (
        <StyledLogo>
            <img src={logo} alt="Foto de um pin em um mapa" />
            <Titulo>Mapa Arqueológico</Titulo>
        </StyledLogo>
    )
}

export default Logo;