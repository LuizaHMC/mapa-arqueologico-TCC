
import { useState } from 'react';

export const useLogin = () => {
    const [formState, setFormState] = useState({
      email: "",
      senha: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {email, senha } = formState;
        
        const response = await fetch("http://localhost:5000/api/autenticacao/login-usuario", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                senha
            }),
        });
    
        return response.json();
        
      };
    
      return { formState, setFormState, handleSubmit };
}


