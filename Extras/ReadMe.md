<h1 align="center"> Manual para execução do código </h1>

Para o código ser executado, será necessário algumas alterações e instalações:
[Node.js](https://nodejs.org/en/).
Editor para trabalhar com o código: [VSCode](https://code.visualstudio.com/)

## Rodando o código

### Primeiro, deverá acessar a pasta frontend do projeto:
$cd frontend

### Dentro do frontend deverá instalar os pacotes e bibliotecas utilizando o seguinte comando:
$npm i

### Após isso, acessar a pasta backend do projeto e fazer o mesmo:
$cd backend e $npm i

### Agora, será necessário acessar a plataforma [MapTiler](https://www.maptiler.com/) e criar uma conta.

### Dentro da plataforma, escolher o mapa e copiar a seguinte seleção:

![image](https://github.com/user-attachments/assets/da999c73-c311-407b-893c-797760b2c502)

### Após isso, colar a url dentro da pasta /frontend/src/components/Mapa/index.js

![image](https://github.com/user-attachments/assets/8a46c463-a9fa-4c6d-a959-b929148ae392)

### Agora, será necessário criar uma conta no banco de dados [MongoDB](https://www.mongodb.com/pt-br/cloud/atlas/register)

### Após isso, Deverá criar um novo projeto chamado mapa_arqueologico:

![image](https://github.com/user-attachments/assets/e8d46395-b33c-46f6-b6af-f9868297e92d)

### Dentro desse projeto, clique na opção "Clusters" na barra lateral, depois "Build a Cluster" e selecione a opção gratuita e "Create Deployment"

### Após o cluster criado clique na opção "Connect" e siga as instruções:

![image](https://github.com/user-attachments/assets/0276eed0-d1cf-4c38-bbe3-711082c11e9a)

### Crie um username e uma password e em sequência, clique na opção "Drivers"

![image](https://github.com/user-attachments/assets/96c651c8-b88a-46a6-b48f-40db59b0a0c3)

### Depois, siga as instruções e copie a connection string e altere o dbUser com o usuário criado e db_password com a senha criada.

### Cole a connection string dentro da pasta /backend/config/databaseConnection no seguinte campo: 

![image](https://github.com/user-attachments/assets/fa528894-6414-47b3-869b-ac3b1b9c300d)

### Após isso, para iniciar o sistema, é necessário executar os seguintes comandos: $npm start dentro da pasta frontend ($cd frontend) e $nodemon app.js dentro da pasta backend ($cd backend)

Desta, maneira, o sistema funcionará em sua máquina.





