
import { useState } from 'react';

export const useCadastroDescoberta = () => {
  const [formState, setFormState] = useState({
    titulo: "",
    dataDescoberta: "",
    latitude: "",
    longitude: "",
    autores: "",
    horarioDescoberta: "",
    descricao: "",
    foto: null,
    colaborador: "",
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formState.titulo || !formState.dataDescoberta || !formState.latitude || !formState.longitude) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const { titulo, dataDescoberta, latitude, longitude, autores, horarioDescoberta, descricao, foto, colaborador } = formState;

   
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('dataDescoberta', dataDescoberta);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('autores', autores);
    formData.append('horarioDescoberta', horarioDescoberta);
    formData.append('descricao', descricao);
    if (foto) {
      formData.append('foto', foto); 
    }
    formData.append('colaborador', colaborador);


    try {
      const response = await fetch("http://localhost:5000/api/descoberta/cadastrar-descoberta", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log('Resposta do servidor:', data);

      if (response.ok) {
        return data;
        
      } else {
        throw new Error(data.error || 'Erro ao cadastrar descoberta.');
      }
    } catch (error) {
      throw new Error(error.message || 'Erro ao cadastrar descoberta.');
    }
  };


  return { formState, setFormState, handleSubmit };
};
