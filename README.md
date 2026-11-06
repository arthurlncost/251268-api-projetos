# API de Gerenciamento de Projetos



API RESTful desenvolvida em Node.js com Express e MongoDB para o gerenciamento de projetos e tarefas, desenvolvida como requisito de avaliação acadêmica.



## 🛠️ Tecnologias Utilizadas

* **Node.js** e **Express**: Criação do servidor e rotas da API.

* **MongoDB** e **Mongoose**: Banco de dados NoSQL e modelagem de dados (Schema).

* **Nodemon**: Reinicialização automática do servidor durante o desenvolvimento.

* **Dotenv**: Gerenciamento de variáveis de ambiente.



## ⚙️ Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

* [Node.js](https://nodejs.org/en/) (versão 18 ou superior)

* Uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (ou MongoDB rodando localmente)

* Um testador de rotas como [Postman](https://www.postman.com/) ou Thunder Client.



## 🚀 Instalação e Configuração



**1. Clone o repositório:**

```bash

git clone https://github.com/arthurlncost/SEU-REPOSITORIO-AQUI.git

cd NOME-DA-PASTA

```



**2. Instale as dependências:**

```bash

npm install

```



**3. Configure as Variáveis de Ambiente (Banco de Dados):**

* No diretório raiz do projeto, crie um arquivo chamado `.env`.

* Copie o conteúdo do arquivo `.env.example` para o seu novo arquivo `.env`.

* No arquivo `.env`, insira a sua string de conexão privada do MongoDB na variável `MONGO_URI`. 

*(Nota: O arquivo `.env` está ignorado pelo Git por questões de segurança e nunca deve ser "comitado" com senhas reais).*



Exemplo de como deve ficar o `.env`:

```env

PORT=3000

MONGO_URI=mongodb+srv://<usuario>:<senha>@cluster0.mongodb.net/gerenciador-projetos?retryWrites=true&w=majority

```



## 📦 Povoando o Banco de Dados (Seed)

Para facilitar os testes, a aplicação conta com um script que insere 3 projetos iniciais no banco de dados. Para executá-lo, rode o comando abaixo na raiz do projeto:

```bash

node seed.js

```

*Aguarde a mensagem "3 projetos iniciais inseridos com sucesso!".*



## ▶️ Executando a Aplicação

Para iniciar o servidor em modo de desenvolvimento, execute:

```bash

npm run dev

```

O servidor estará rodando em http://localhost:3000. 

A partir deste momento, você pode utilizar o Postman para interagir com as rotas (GET, POST, PUT, DELETE).



---

**Autor:** Arthur Luciano Nascimento da Costa (RA: 251268)