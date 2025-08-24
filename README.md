# NestJS CRM Lite API

[![CI/CD Pipeline](https://github.com/amilcar-laniakea/nestjs-crm-lite-api/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/amilcar-laniakea/nestjs-crm-lite-api/actions/workflows/ci.yml)
[![NestJS](https://img.shields.io/badge/NestJS-10.x-red.svg)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.x-blue.svg)](https://prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org/)

A comprehensive CRM Lite API built with NestJS, Prisma, and PostgreSQL. This application provides a complete backend solution for managing clients and notes with JWT authentication, role-based access control, and comprehensive API documentation.

## ✨ Features

- 🔐 **JWT Authentication** - Secure user authentication and authorization
- 👥 **User Management** - User registration, login, and profile management
- 🏢 **Client Management** - Complete CRUD operations for clients
- 📝 **Notes System** - Notes associated with clients and users
- 🔍 **Advanced Filtering** - Pagination, search, and filtering capabilities
- 📚 **Swagger Documentation** - Complete API documentation with examples
- 🗄️ **Database Integration** - Prisma ORM with PostgreSQL
- 🛡️ **Role-based Access** - Admin and user role management
- ✅ **Input Validation** - Class-validator decorators for data validation
- 🧪 **Testing Ready** - Jest configuration for unit and e2e tests
- 📋 **Code Quality** - ESLint, Prettier, and Husky pre-commit hooks

## 📁 Project Structure

```
nestjs-crm-lite-api/
├── src/
│   ├── auth/                    # Authentication module
│   │   ├── dto/                 # Auth DTOs (login, register)
│   │   ├── auth.controller.ts   # Auth endpoints
│   │   ├── auth.service.ts      # Auth business logic
│   │   └── auth.module.ts       # Auth module definition
│   ├── clients/                 # Client management module
│   │   ├── dto/                 # Client DTOs (create, update, find)
│   │   ├── clients.controller.ts # Client endpoints
│   │   ├── clients.service.ts   # Client business logic
│   │   └── clients.module.ts    # Client module definition
│   ├── notes/                   # Notes management module
│   │   ├── dto/                 # Note DTOs (create, update, find)
│   │   ├── notes.controller.ts  # Note endpoints
│   │   ├── notes.service.ts     # Note business logic
│   │   └── notes.module.ts      # Note module definition
│   ├── users/                   # User management module
│   │   ├── dto/                 # User DTOs
│   │   ├── users.service.ts     # User business logic
│   │   └── users.module.ts      # User module definition
│   ├── guards/                  # Security guards
│   │   ├── auth.guard.ts        # JWT authentication guard
│   │   └── development.guard.ts # Development environment guard
│   ├── prisma/                  # Database module
│   │   ├── prisma.service.ts    # Prisma client service
│   │   └── prisma.module.ts     # Prisma module definition
│   ├── common/                  # Shared components
│   │   ├── dto/                 # Common DTOs
│   │   └── types/               # TypeScript type definitions
│   ├── health/                  # Health check module
│   │   └── health.controller.ts # Health endpoints
│   ├── app.module.ts            # Main application module
│   └── main.ts                  # Application entry point
├── prisma/                      # Database schema and migrations
│   ├── schema.prisma            # Database schema definition
│   ├── seed.ts                  # Database seeding script
│   └── migrations/              # Database migrations
├── test/                        # Test files
├── .github/                     # GitHub Actions workflows
├── .husky/                      # Git hooks configuration
└── docs/                        # Documentation files
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v15 or higher)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/amilcar-laniakea/nestjs-crm-lite-api.git
cd nestjs-crm-lite-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/crm_lite_db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Bcrypt Configuration
BCRYPT_SALT_ROUNDS=10

# Application
PORT=3000
NODE_ENV=development
```

### 4. Database Setup

#### Initialize Prisma

```bash
# Generate Prisma client
npx prisma generate
```

#### Run Database Migrations

```bash
# Apply all pending migrations
npx prisma migrate dev --name init

# Or reset database (development only)
npm run db:reset
```

#### Seed the Database (Optional)

```bash
npm run db:seed
```

### 5. Start the Application

#### Development Mode

```bash
npm run start:dev
```

#### Production Mode

```bash
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

## 📖 API Documentation

### Swagger UI

Once the application is running, visit:

- **Swagger UI**: `http://localhost:3000/openapi`
- **JSON Schema**: `http://localhost:3000/openapi-json`

### Authentication

All endpoints (except auth) require a Bearer token in the Authorization header:

```bash
Authorization: Bearer <your_jwt_token>
```

### API Endpoints

#### Authentication

| Method | Endpoint         | Description       | Body                        |
| ------ | ---------------- | ----------------- | --------------------------- |
| `POST` | `/auth/register` | Register new user | `{ name, email, password }` |
| `POST` | `/auth/login`    | User login        | `{ email, password }`       |

#### Clients

| Method   | Endpoint         | Description                 | Auth Required |
| -------- | ---------------- | --------------------------- | ------------- |
| `GET`    | `/clients`       | Get all clients (paginated) | ✅            |
| `POST`   | `/clients`       | Create new client           | ✅            |
| `GET`    | `/clients/:id`   | Get client by ID            | ✅            |
| `GET`    | `/clients/email` | Get client by email         | ✅            |
| `PATCH`  | `/clients/:id`   | Partially update client     | ✅            |
| `PUT`    | `/clients/:id`   | Fully update client         | ✅            |
| `DELETE` | `/clients/:id`   | Delete client               | ✅            |

#### Notes

| Method   | Endpoint                     | Description                | Auth Required |
| -------- | ---------------------------- | -------------------------- | ------------- |
| `GET`    | `/clients/:id/notes`         | Get all notes (paginated)  | ✅            |
| `POST`   | `/clients/:id/notes`         | Create new note for client | ✅            |
| `GET`    | `/clients/:clientId/notes`   | Get notes by client        | ✅            |
| `PATCH`  | `/clients/:id/notes/:noteId` | Update note                | ✅            |
| `DELETE` | `/clients/:id/notes/:noteId` | Delete note                | ✅            |

#### Health Check

| Method | Endpoint  | Description               | Auth Required |
| ------ | --------- | ------------------------- | ------------- |
| `GET`  | `/health` | Application health status | ❌            |

### Query Parameters

#### Pagination

```bash
GET /clients?page=1&pageSize=10
```

#### Filtering

```bash
GET /clients?name=John&status=ACTIVE&company=ACME
GET /notes?isImportant=true&content=meeting
```

## 🗄️ Database Schema

### User Model

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  role      Role     @default(USER)
  avatar    String?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  clients Client[] @relation("ClientOwner")
  notes   Note[]
}
```

### Client Model

```prisma
model Client {
  id        String       @id @default(cuid())
  name      String
  email     String       @unique
  phone     String?
  company   String?
  status    ClientStatus @default(ACTIVE)
  createdAt DateTime     @default(now())
  updatedAt DateTime     @updatedAt

  ownerId String
  owner   User   @relation("ClientOwner", fields: [ownerId], references: [id])
  notes   Note[]
}
```

### Note Model

```prisma
model Note {
  id          String   @id @default(cuid())
  content     String
  image       String?
  isImportant Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  clientId String
  client   Client @relation(fields: [clientId], references: [id])
  userId   String
  user     User   @relation(fields: [userId], references: [id])
}
```

## 🔧 Development Commands

### Application

```bash
# Start development server
npm run start:dev

# Start debug mode
npm run start:debug

# Build for production
npm run build

# Start production server
npm run start:prod
```

### Database (Prisma)

```bash
# Generate Prisma client
npx prisma generate

# Create and apply migration
npx prisma migrate dev --name migration_name

# Reset database (development only)
npm run db:reset

# Seed database
npm run db:seed

# Open Prisma Studio
npx prisma studio

# Check migration status
npx prisma migrate status

# Deploy migrations (production)
npx prisma migrate deploy
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Run ESLint with auto-fix
npm run lint:fix

# Check code formatting
npm run format:check

# Format code with Prettier
npm run format

# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run e2e tests
npm run test:e2e

# Generate test coverage
npm run test:cov
```

## 🐳 Docker Support

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for secure password storage
- **Role-based Access Control** - Admin and user roles
- **Input Validation** - class-validator for request validation
- **CORS Configuration** - Cross-origin request handling
- **Environment Variables** - Secure configuration management

## 📋 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

## 🚀 Deployment

### Environment Variables

Ensure these environment variables are set in production:

```env
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-production-jwt-secret
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12
PORT=3000
NODE_ENV=production
```

### Production Deployment

```bash
# Build the application
npm run build

# Run database migrations
npx prisma migrate deploy

# Start the production server
npm run start:prod
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions or modifications
- `chore:` Build process or auxiliary tool changes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Amilcar Barahona**

- GitHub: [@amilcar-laniakea](https://github.com/amilcar-laniakea)
- Email: amilcar.laniakea@gmail.com

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - The progressive Node.js framework
- [Prisma](https://prisma.io/) - Next-generation ORM for TypeScript
- [PostgreSQL](https://www.postgresql.org/) - Advanced open source database

## Project setup

```bash
$ npm install
```

## Code Quality & Git Hooks

This project uses **Husky** and **lint-staged** to ensure code quality before commits.

### Automatic Code Quality Checks

Every time you commit code, the following checks run automatically:

- **ESLint**: Checks and fixes TypeScript code issues
- **Prettier**: Formats code according to project standards
- **Commitlint**: Ensures commit messages follow conventional commit format

### Manual Commands

```bash
# Lint and fix code issues
$ npm run lint

# Check linting without fixing
$ npm run lint:check

# Format code with Prettier
$ npm run format

# Check formatting without fixing
$ npm run format:check
```

### Commit Message Format

This project follows [Conventional Commits](https://www.conventionalcommits.org/). Use one of these types:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for code style changes
- `refactor:` for code refactoring
- `test:` for test changes
- `chore:` for maintenance tasks

**Example:** `feat: add user authentication module`

### Environment Variables

Create a `.env` file in the root directory:

```bash
PORT=4000
```

## CI/CD Pipeline

This project includes a GitHub Actions workflow that automatically runs on every push and pull request to the `master` branch.

### Automated Checks

The CI/CD pipeline performs the following checks:

- ✅ **Lint Check**: Validates code quality using ESLint
- ✅ **Format Check**: Ensures code formatting with Prettier
- ✅ **Build Check**: Verifies the project builds successfully
- ✅ **Tests**: Runs the test suite

### Matrix Testing

The pipeline tests against multiple Node.js versions:

- Node.js 18.x
- Node.js 20.x

### Workflow Status

You can monitor the status of your builds in the [Actions tab](https://github.com/amilcar-laniakea/nestjs-crm-lite-api/actions) of your repository.

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

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
