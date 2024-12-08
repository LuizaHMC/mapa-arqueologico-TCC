import styled from 'styled-components';

export const StyledDivisao = styled.hr `
    border: none;
    height: 0.188rem;
    background-color: var(--cor-primaria);
    width: 70%;
    margin-bottom: 1%;
    margin-top: 1%; 

    @media (max-width: 991px) {
        max-width: 100%;
        margin-top: 2.5rem;
    }
`;