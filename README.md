<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Chat Backend with Gemini AI

Un backend NestJS con integración a Google Gemini AI para un sistema de chat inteligente.

## Arquitectura

- **NestJS**: Framework para Node.js con arquitectura modular
- **Prisma**: ORM para PostgreSQL
- **Google Gemini AI**: Integración para respuestas inteligentes
- **Docker**: Containerización completa
- **PostgreSQL**: Base de datos relacional

## Servicios Principales

- `ConversationService`: Manejo de conversaciones CRUD
- `MessageService`: Procesamiento de mensajes y integración con Gemini
- `GeminiService`: Conexión con API de Google Gemini
- `PrismaService`: Conexión a base de datos

## Setup del Proyecto

### 1. Configuración Inicial

```bash
# Clonar e instalar dependencias
git clone <repo-url>
cd chat-backend
npm install
```

### 2. Variables de Entorno

Copiar `.env.example` a `.env` y configurar:

```bash
cp .env.example .env
```

Editar `.env`:

```bash
# --- App (Nest/Prisma) ---
PORT=3001
GEMINI_API_KEY=tu_api_key_aqui
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/chatdb?schema=public"

# --- Docker/Postgres ---
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=chatdb
PGHOST_PORT=5432
```

### 3. Desarrollo Local

```bash
# Ejecutar con Docker (recomendado)
docker-compose up --build

# O desarrollo local
npm run start:dev
```

## Comandos Docker

### Construcción y Ejecución

```bash
# Construir y ejecutar todo
docker-compose up --build

# Solo construir
docker-compose build

# Ejecutar en background
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar servicios
docker-compose down
```

### Comandos de Desarrollo

```bash
# Reconstruir solo la app
docker-compose build app

# Resetear base de datos
docker-compose down -v
docker-compose up --build

# Ejecutar migraciones
docker-compose exec app npx prisma migrate dev

# Ver estado de la base de datos
docker-compose exec app npx prisma studio
```

## Comandos NPM Locales

```bash
# Desarrollo
npm run start:dev

# Construcción
npm run build

# Producción
npm run start:prod

# Prisma
npx prisma generate
npx prisma migrate dev
npx prisma studio

# Tests
npm run test
npm run test:e2e
```

## Estructura del Proyecto

```
src/
├── app.module.ts          # Módulo principal
├── main.ts               # Entry point
├── conversation/         # Módulo de conversaciones
│   ├── conversation.service.ts
│   └── conversation.module.ts
├── messages/            # Módulo de mensajes
│   ├── message.service.ts
│   └── message.module.ts
├── gemini/              # Integración Gemini AI
│   ├── gemini.service.ts
│   └── gemini.module.ts
└── prisma/              # Configuración Prisma
    ├── prisma.service.ts
    └── prisma.module.ts
```

## Troubleshooting

### Problemas Comunes

1. **Error de conexión a base de datos**: Verificar que `DATABASE_URL` use `postgres:5432` (no `localhost`)
2. **Puerto ocupado**: Cambiar `PGHOST_PORT` en `.env`
3. **Error de Gemini API**: Verificar `GEMINI_API_KEY` en `.env`

### Logs útiles

```bash
# Ver logs de la aplicación
docker-compose logs app

# Ver logs de la base de datos
docker-compose logs postgres

# Entrar al contenedor
docker-compose exec app sh
```

## Descripción Original NestJS

$ npm run test

# e2e tests

$ npm run test:e2e

# test coverage

$ npm run test:cov

````

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
````

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
