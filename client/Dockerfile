# Define a imagem base
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

COPY package.json ./

# Instala as dependências do projeto
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm cache clean --force
RUN npm install

# Copia todos os arquivos do diretório atual para o diretório de trabalho
COPY . .

# Compila o aplicativo Next.js para produção
RUN npm run build

# Define a porta em que o aplicativo irá escutar
EXPOSE 3000

# Comando para iniciar o aplicativo quando o contêiner for iniciado
CMD ["npm", "start"]
