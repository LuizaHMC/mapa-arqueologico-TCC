import { useEffect } from 'react';

export const useValidacaoFormulario = () => {

  const isValidCoordinate = (coord, type) => {
    const number = parseFloat(coord);
    if (type === "latitude") {
      return number >= -90 && number <= 90;
    } else if (type === "longitude") {
      return number >= -180 && number <= 180;
    }
    return false;
  };


  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regex)) return false;

    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };


  const validateInput = (input) => {
    switch (input.name) {
      case 'titulo':
        return input.value.trim() ? '' : 'Título da descoberta não pode estar vazio';
      case 'latitude':
        return isValidCoordinate(input.value, 'latitude')
          ? ''
          : `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} inválida (Deve estar entre -180 e 180)`;
      case 'longitude':
        return isValidCoordinate(input.value, 'longitude')
          ? ''
          : `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} inválida (Deve estar entre -180 e 180)`;
      case 'dataDescoberta':
        return isValidDate(input.value) ? '' : 'Data de descoberta inválida';
      default:
        return '';
    }
  };


  useEffect(() => {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input, textarea');

    const handleInputBlur = (e) => {
      const input = e.target;
      const error = validateInput(input);
      const errorMessageElement = input.parentElement.querySelector('.error-message');
      errorMessageElement.textContent = error;
    };

    inputs.forEach((input) => input.addEventListener('blur', handleInputBlur));

    return () => {
      inputs.forEach((input) => input.removeEventListener('blur', handleInputBlur));
    };
  }, []);


  const validarFormulario = () => {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach((input) => {
      const error = validateInput(input);
      const errorMessageElement = input.parentElement.querySelector('.error-message');
      if (error) {
        errorMessageElement.textContent = error;
        input.style.borderColor = 'red';
        isValid = false;
      } else {
        errorMessageElement.textContent = '';
        input.style.borderColor = ''; 
      }
    });

    return isValid;
  };

  return {
    validarFormulario,
  };
};
