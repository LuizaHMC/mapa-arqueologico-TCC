import React from 'react';
import InfoPainelDescoberta from '../InfoPainelDescoberta';
import InfoPainelVazio from '../InfoPainelVazio';
import styled from 'styled-components';

const PanelWrapper = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: ${props => props.open ? '320px' : '0'};
    background-color: #f9f9f9;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
    transform: translateX(${props => props.open ? '0' : '100%'});
    opacity: ${props => props.open ? '1' : '0'};
    transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 25px;
    border-radius: 8px 0 0 8px;
    overflow-y: auto;
    visibility: ${props => props.open ? 'visible' : 'hidden'};

    @media (max-width: 768px) {
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width: ${props => props.open ? '100%' : '0'};
        border-radius: 0;
        padding: 20px;
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    color: #333;
    font-size: 22px;
    font-weight: bold;
    cursor: pointer;
    padding: 5px;
    transition: color 0.2s;

    &:hover {
        color: #007bff;
    }
`;

const Title = styled.h2`
    margin-top: 10px;
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

const ContentWrapper = styled.div`
    width: 100%;
    padding: 15px 0;
    font-size: 16px;
    line-height: 1.6;
    color: #555;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 10px 0;
    }
`;

const InfoPainel = ({ info, onClose }) => {
    return (
        <PanelWrapper open={!!info}>
            <CloseButton onClick={onClose}>×</CloseButton>
            <Title>Detalhes da Descoberta</Title>
            <ContentWrapper>
                {info ? <InfoPainelDescoberta info={info} /> : <InfoPainelVazio />}
            </ContentWrapper>
        </PanelWrapper>
    );
};

export default InfoPainel;