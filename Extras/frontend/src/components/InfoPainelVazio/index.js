import ImagemInfoPainel from "../../images/RoboInfoPainel.png";
import styled from "styled-components";

const InfoPainel = styled.div`
    background-color: #f5f5f5; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    border-radius: 8px; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 20px;
    color: #333; 
    font-family: 'Roboto', sans-serif; 
`;

const ImagemPainel = styled.img` 
    width: 80%;
    max-width: 300px; 
    height: auto;
    margin-bottom: 20px;
`;

const TextoPainel = styled.p`
    font-family: 'Roboto', sans-serif; 
    font-size: 18px; 
    color: #555; 
    text-align: center;
`;

function InfoPainelVazio() {

    return ( 

        <InfoPainel>
            <ImagemPainel src={ImagemInfoPainel} alt="Imagem robo"></ImagemPainel>
            <TextoPainel> Clique em um ponto do mapa para informações!</TextoPainel>
        </InfoPainel>
    )

}


export default InfoPainelVazio;
