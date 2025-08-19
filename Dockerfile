# --- Etapa 1: deps (instala dependencias) ---
FROM node:20-bullseye-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# --- Etapa 2: build (compila Nest y genera Prisma Client) ---
FROM node:20-bullseye-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Genera el cliente de Prisma con binarios para Linux (imagen debian slim)
RUN npx prisma generate
# Compila el proyecto Nest a /dist
RUN npm run build

# --- Etapa 3: prod-deps (solo dependencias de producción, más liviano) ---
FROM node:20-bullseye-slim AS prod-deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# --- Etapa 4: runner (imagen final) ---
FROM node:20-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
# Copia solo lo necesario para correr
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder   /app/dist        ./dist
COPY prisma ./prisma

# Expone el puerto de la API (ajusta si usás otro)
EXPOSE 3001

# Al arrancar el contenedor: aplica migraciones y levanta Nest
# (DATABASE_URL debe estar seteada por variables de entorno)
CMD ["sh","-c","npx prisma migrate deploy && node dist/main.js"]

