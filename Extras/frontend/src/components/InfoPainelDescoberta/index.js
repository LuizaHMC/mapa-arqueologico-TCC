import styled from "styled-components";

const InfoPainel = styled.div`
    background-color: #f9f9f9; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    border-radius: 8px; 
    display: flex;
    flex-direction: column;
    max-width: 360px; 
    padding: 20px; 
    align-items: center;
    color: #333; 
    font-family: 'Roboto', sans-serif; 
    overflow: auto; 

`;

const ImagemWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
`;

const ImagemPainel = styled.img` 
    width: 100%; 
    max-width: 300px; 
    height: auto;
    border-radius: 8px; 
`;

const ArtifactTitle = styled.h1`
    color: #222; 
    font-size: 24px; 
    margin-bottom: 10px;
    font-weight: 700; 
`;

const InfoLabel = styled.h2`
    color: #555; 
    margin-top: 12px;
    font-size: 18px;
    font-weight: 500;
`;

const InfoText = styled.p`
    color: #666; 
    margin-top: 6px;
    font-size: 14px;
    line-height: 1.5; 
`;

const Description = styled.p`
    color: #444;
    margin-top: 12px;
    font-size: 14px;
    line-height: 1.5;
`;

const InfoSection = ({ info }) => {
    return (
        <section>
            <ArtifactTitle>{info.titulo}</ArtifactTitle>
            <InfoLabel>Descoberto por:</InfoLabel>
            <InfoText>{info.autores}</InfoText>
            <InfoLabel>Data da descoberta:</InfoLabel>
            <InfoText>{info.dataDescoberta}</InfoText>
            <InfoLabel>Mais informações:</InfoLabel>
            <Description>{info.descricao}</Description>
        </section>
    );
};

const InfoPainelDescoberta = ({ info }) => {
    if (!info) {
        return null; 
    }
    
    const fotoSrc = info.foto ? `http://localhost:5000/${info.foto}` : 'frontend/src/images/RoboInfoPainel.png';

    return (
        <InfoPainel>
            <ImagemWrapper>
                <ImagemPainel src={fotoSrc} alt="Imagem descoberta"  />
            </ImagemWrapper>
            <InfoSection info={info} />
        </InfoPainel>
    );
};

export default InfoPainelDescoberta;