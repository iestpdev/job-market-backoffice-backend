# Imagen base oficial de Node.js
FROM node:20

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY package*.json ./
COPY . .

# Instalar dependencias
RUN npm install

# Exponer el puerto
EXPOSE 5000

# Iniciar la app
CMD ["node", "index.js"]
