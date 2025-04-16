# Imagem base para o frontend (Vite + React)
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar os arquivos de configuração e dependências do frontend
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar todo o código-fonte
COPY . .

# Rodar o build da aplicação
RUN npm run build

# Expor a porta para o servidor (ajuste se necessário)
EXPOSE 3000

# Iniciar o servidor do Vite
CMD ["npm", "run", "dev"]
