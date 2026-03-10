FROM node:18
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto 4000
EXPOSE 4000

# Arrancar el servidor (ajusta si usas otro comando)
CMD ["npm", "start"]