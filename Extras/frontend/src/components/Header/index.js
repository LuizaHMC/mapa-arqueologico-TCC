import Logo from '../Logo';
import OpcoesHeader from '../OpcoesHeader';
import styled from "styled-components";

const StyledHeader = styled.header`
    width: 100%;
    overflow: hidden;

    @media (max-width: 768px) {
        flex-wrap: wrap;
    }
`;

const StyledMenu = styled.nav`
    margin: 2%;
    display: flex;
    justify-content: space-between;

    @media (max-width: 991px) {
    padding: 0 20px;
    }

`;

const StyledDivisao = styled.hr`
    border: 0.125rem solid var(--cor-primaria);
    align-self: stretch;
    margin-top: 1.125rem;
    width: 100%; 

    @media (max-width: 991px) {
    max-width: 100%;
    }
`;

function Header () {
    return (
        <StyledHeader>
            <StyledMenu>
                <Logo/>
                <OpcoesHeader/>
            </StyledMenu>
            <StyledDivisao/>
        </StyledHeader>
    )
}


export default Header;

