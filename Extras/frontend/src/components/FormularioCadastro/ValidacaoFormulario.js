import { useEffect } from 'react';

export const useValidacaoFormulario = () => {
  
  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regex)) return false;

    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  
  const validateInput = (input) => {
    switch (input.id) {
      case 'name':
        return input.value.trim() ? '' : 'Nome/Instituição não pode estar vazio';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value) ? '' : 'Email inválido';
      case 'phone':
        return /^\+?\d{10,15}$/.test(input.value) ? '' : 'Telefone inválido';
      case 'dataRegistro':
        return isValidDate(input.value) ? '' : 'Data de nascimento/fundação inválida';
      case 'password':
        return input.value.length >= 8 ? '' : 'Senha deve ter no mínimo 8 caracteres';
      default:
        return '';
    }
  };

  useEffect(() => {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input');

    const handleInputBlur = (e) => {
      const input = e.target;
      const errorMessage = validateInput(input);
      const errorSpan = input.nextElementSibling;

      if (errorMessage) {
        input.style.borderColor = 'red';
        if (errorSpan) {
          errorSpan.textContent = errorMessage;
        } else {
          const errorNode = document.createElement('span');
          errorNode.classList.add('error-message');
          errorNode.textContent = errorMessage;
          input.parentNode.appendChild(errorNode);
        }
      } else {
        input.style.borderColor = '';
        if (errorSpan) {
          errorSpan.textContent = '';
        }
      }
    };

    inputs.forEach((input) => {
      input.addEventListener('blur', handleInputBlur);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('blur', handleInputBlur);
      });
    };
  }, []);

  
  const validarFormulario = () => {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input');
    let isValid = true;

    inputs.forEach((input) => {
      const errorMessage = validateInput(input);
      const errorSpan = input.nextElementSibling;

      if (errorMessage) {
        isValid = false;
        input.style.borderColor = 'red';
        if (errorSpan) {
          errorSpan.textContent = errorMessage;
        } else {
          const errorNode = document.createElement('span');
          errorNode.classList.add('error-message');
          errorNode.textContent = errorMessage;
          input.parentNode.appendChild(errorNode);
        }
      } else {
        input.style.borderColor = '';
        if (errorSpan) {
          errorSpan.textContent = '';
        }
      }
    });

    return isValid;
  };

  return {
    validarFormulario,
  };
};
