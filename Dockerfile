# Imagen base
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instala dependencias del sistema necesarias para compilar paquetes
COPY package*.json ./
RUN npm ci --omit=dev


# Copia los archivos del proyecto
COPY . .

# Instala las dependencias
RUN npm run build

# Expone el puerto 
EXPOSE 8000

# Comando para producción
CMD ["node", "dist/main.js"]
