import { useState } from 'react';


export const useCadastro = () => {
  const [formState, setFormState] = useState({
    nome: "",
    email: "",
    telefone: "",
    dataRegistro: "",
    senha: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nome, email, telefone, dataRegistro, senha } = formState;
  
    try {
      const response = await fetch("http://localhost:5000/api/usuario/cadastrar", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, telefone, dataRegistro, senha }),
      });
  
      const data = await response.json();
      
      if (response.ok) {
        return data; 
      } else {
        throw new Error(data.error || 'Erro ao cadastrar usuário.');
      }
    } catch (error) {
      throw new Error(error.message || 'Erro ao cadastrar usuário.'); // Re-throw para ser capturado pelo handleFormSubmit
    }
  };

  return { formState, setFormState, handleSubmit };
};


