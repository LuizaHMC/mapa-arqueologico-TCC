import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { atualizarDescoberta } from '../../services/Descobertas';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  max-width: 800px; 
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

  
  @media (max-width: 600px) {
    max-width: 90%; 
    padding: 15px; 
    height: auto; 
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    border-color: #007bff;
    outline: none;
  }

  
  @media (max-width: 600px) {
    font-size: 14px; 
    padding: 10px; 
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
  min-height: 120px;
  
  &:focus {
    border-color: #007bff;
    outline: none;
  }

  
  @media (max-width: 600px) {
    font-size: 14px;
    padding: 10px;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  background-color: var(--cor-primaria);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%; 

  &:hover {
    background-color: var(--cor-hover_primaria);
  }


  @media (max-width: 600px) {
    font-size: 14px; 
    padding: 10px 20px; 
  }
`;

const EdicaoDescoberta = () => {

    const { id } = useParams();
    const [formData, setFormData] = useState({
        titulo: '',
        latitude: '',
        longitude: '',
        autores: '',
        dataDescoberta: '',
        descricao: '',
        foto: null
    });

    useEffect(() => {
       
        const descobertaEdit = JSON.parse(localStorage.getItem('descobertaEdit'));
        if (descobertaEdit) {
            setFormData({
                titulo: descobertaEdit.titulo,
                latitude: descobertaEdit.latitude,
                longitude: descobertaEdit.longitude,
                descricao: descobertaEdit.descricao,
                autores: descobertaEdit.autores,
                dataDescoberta: descobertaEdit.dataDescoberta,
                foto: descobertaEdit.foto 
                
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            foto: e.target.files[0] 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const descobertaEdit = JSON.parse(localStorage.getItem('descobertaEdit'));
        
        const updatedData = new FormData();
        updatedData.append('id', id);
        updatedData.append('titulo', formData.titulo);
        updatedData.append('latitude', formData.latitude);
        updatedData.append('longitude', formData.longitude);
        updatedData.append('autores', formData.autores);
        updatedData.append('dataDescoberta', formData.dataDescoberta);
        updatedData.append('descricao', formData.descricao);
        
        
        if (formData.foto && formData.foto !== descobertaEdit.foto) {
            updatedData.append('foto', formData.foto);
        }
    
        try {
            await atualizarDescoberta(id, updatedData);
            alert('Descoberta atualizada com sucesso!');
            window.close();  
        } catch (error) {
            console.error('Erro ao atualizar descoberta:', error);
        }
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <label>Título:</label>
                <Input 
                    type="text" 
                    value={formData.titulo} 
                    onChange={handleChange} 
                    name='titulo'
                    required
                />
                <label>Latitude:</label>
                <Input 
                    type="text" 
                    value={formData.latitude} 
                    name='latitude'
                    onChange={handleChange} 
                    required
                />
                <label>Longitude:</label>
                <Input 
                    type="text" 
                    value={formData.longitude} 
                    name='longitude'
                    onChange={handleChange} 
                    required
                />
                <label>Autores:</label>
                <Input 
                    type="text" 
                    value={formData.autores} 
                    name='autores'
                    onChange={handleChange} 
                    required
                />
                <label>Data Descoberta:</label>
                <Input 
                    type="date" 
                    value={formData.dataDescoberta} 
                    name='dataDescoberta'
                    onChange={handleChange}
                    required 
                />
                <label>Foto:</label>
                <Input 
                    type='file'
                    name='foto'
                    onChange={handleFileChange} 
                    
                />
                <label>Descrição:</label>
                <TextArea 
                    value={formData.descricao} 
                    name='descricao'
                    onChange={handleChange} 
                    required
                />
                
                <Button type="submit">Atualizar Descoberta</Button>
            </form>

        </Container>
        
    );
};

export default EdicaoDescoberta;
