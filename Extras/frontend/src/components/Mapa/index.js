import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Circle, useMap } from 'react-leaflet';
import "../../../node_modules/leaflet/dist/leaflet.css";
import InfoPainel from '../InfoPainel';
import { listarDescobertas } from '../../services/Descobertas.js';

const ContainerMapa = styled.div`
    padding: 0px;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    position: relative;
    width: 100%;
    height: 100vh;

    @media (min-width: 768px) {
        flex-direction: row; 
    }
`;

function MapEvents({ setZoomLevel }) {
    const map = useMap();

    useEffect(() => {
        const handleZoomEnd = () => setZoomLevel(map.getZoom());

        map.on('zoomend', handleZoomEnd);

        return () => {
            map.off('zoomend', handleZoomEnd);
        };
    }, [map, setZoomLevel]);

    return null;
}

function Mapa() {
    const [descobertas, setDescobertas] = useState([]);
    const [selectedDescoberta, setSelectedDescoberta] = useState(null);
    const [mapZoomLevel, setMapZoomLevel] = useState(2);

    useEffect(() => {
        const fetchDescobertas = async () => {
            try {
                const data = await listarDescobertas();
                setDescobertas(data);
            } catch (error) {
                console.error("Erro ao buscar descobertas:", error);
            }
        };

        fetchDescobertas();
    }, []);

    const getCircleRadius = (zoom) => {
        
        if (zoom < 2) return 1000000; 
        if (zoom < 4) return 500000;  
        if (zoom < 6) return 250000;  
        if (zoom < 8) return 100000;  
        if (zoom < 10) return 20000;  
        if (zoom < 12) return 5000;  
        if (zoom < 14) return 2000;  
        if (zoom < 16) return 250;   
        if (zoom < 18) return 100;   
        if (zoom < 20) return 50;   
        return 1;                   
    };

    return (
        <ContainerMapa>
            <MapContainer
                center={[-22.932, -47.106]} 
                zoom={2} 
                style={{ height: "100%", width: "100%" }} 
                attributionControl={true} 
            >
                <TileLayer
                    url="DIGITE_AQUI_API_KEY"
                    attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {descobertas.map((descoberta) => (
                    <React.Fragment key={descoberta._id}>
                        <Circle
                            center={[descoberta.latitude, descoberta.longitude]}
                            radius={getCircleRadius(mapZoomLevel)}
                            color="red"
                            fillColor="red"
                            fillOpacity={0.3}
                            eventHandlers={{
                                click: () => {
                                    setSelectedDescoberta(descoberta);
                                },
                            }}
                        />
                    </React.Fragment>
                ))}
                <MapEvents setZoomLevel={setMapZoomLevel} />
            </MapContainer>
            <InfoPainel info={selectedDescoberta} onClose={() => setSelectedDescoberta(null)} />
        </ContainerMapa>
    );
}

export default Mapa;