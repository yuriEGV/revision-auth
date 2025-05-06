# Imagen base de Node
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto (ajusta si usas otro)
EXPOSE 3000

# Comando para correr la app
CMD ["npm", "start"]
