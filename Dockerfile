FROM node:20

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias incluyendo ts-node
RUN npm install

# Copiar código
COPY . .

# Generar Prisma Client
RUN npx prisma generate

EXPOSE 3001

# Usar ts-node directamente para desarrollo
CMD ["npx", "ts-node", "-r", "tsconfig-paths/register", "src/main.ts"]

