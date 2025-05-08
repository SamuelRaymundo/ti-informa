FROM node:18-alpine

WORKDIR /app

# Copia somente os arquivos essenciais para instalar dependências
COPY package.json package-lock.json ./

# Instala dependências com cache limpo e força a versão correta do esbuild
RUN npm ci && npm install esbuild@0.18.20 --force

# Copia o restante da aplicação
COPY . .

# Executa o build
RUN npm run build

# Expor a porta padrão do Vite
EXPOSE 3000

# Comando padrão de dev (ou substitua por server estático com nginx se for produção)
CMD ["npm", "run", "dev"]
