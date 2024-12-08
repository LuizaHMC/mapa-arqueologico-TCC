
export const listarDescobertas = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/descoberta/listar-descobertas', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (!response.ok) {
        throw new Error('Erro ao listar descobertas.');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao listar descobertas:", error);
      throw error;
    }
  
  };


  export const listarDescobertasColaborador = async (userID) => {
    try {
        const response = await fetch('http://localhost:5000/api/descoberta/listar-descobertas-colaborador', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ colaborador: userID }) 
        });

        if (!response.ok) {
            throw new Error('Erro ao listar descobertas.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao listar descobertas:", error);
        throw error;
    }
};

export const atualizarDescoberta = async (id, updatedData) => {
  try {
      const response = await fetch(`http://localhost:5000/api/descoberta/atualizar-descoberta/${id}`, {
          method: "PUT",
          body: updatedData
      });

      if (!response.ok) {
          const errorText = await response.text();
          console.error('Erro na resposta da API:', errorText);
          throw new Error('Erro ao atualizar descoberta.');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Erro ao atualizar descoberta:", error);
      throw error;
  }
};

export const deletarDescoberta = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/descoberta/deletar-descoberta/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro na resposta da API:", errorText);
      throw new Error("Erro ao deletar descoberta.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao deletar descoberta:", error);
    throw error;
  }
};
  