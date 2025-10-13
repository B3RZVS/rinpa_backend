# Imagen base
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instala dependencias del sistema necesarias para compilar paquetes
COPY package*.json ./

# Instalar TODAS las dependencias (prod + dev) necesarias para build
RUN npm install


# Copiar todo el código
COPY . .

# Compilar dentro del contenedor
RUN npx nest build

# Expone el puerto 
EXPOSE 8000

# Comando para producción
CMD ["node", "dist/main.js"]
