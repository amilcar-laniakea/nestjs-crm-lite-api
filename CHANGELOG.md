# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2025-08-24

### Added

- Comprehensive Swagger/OpenAPI documentation for all endpoints
- API documentation with request/response schemas and examples
- Bearer token authentication setup in Swagger UI
- Client management system with full CRUD operations
  - Create, read, update, and delete clients
  - Pagination and filtering capabilities for client listings
  - Client search by email and ID
- Notes management system with client relationship
  - Create notes associated with specific clients
  - Paginated notes listing with filtering options
  - Search notes by content and importance status
  - Notes organized by client ID
- Comprehensive DTOs with validation decorators
  - CreateClientDto with email, name, phone, company, and status validation
  - FindClientDto with pagination and filtering parameters
  - CreateNoteDto with content, image, and importance validation
  - FindNoteDto with advanced search and filtering options
- Response DTOs for consistent API responses
  - ClientResponseDto for standardized client data structure
  - NoteResponseDto for standardized note data structure
  - Common response DTOs for pagination and success/error handling
- Enhanced authentication controllers with Swagger documentation
- Type-safe request handling with proper Express type extensions

### Changed

- Updated main.ts with enhanced Swagger configuration and JWT authentication
- Improved API endpoint documentation with detailed descriptions and examples
- Enhanced error handling and response formatting across all endpoints
- Better type safety with comprehensive TypeScript interfaces

### Fixed

- Resolved unused import warnings in controllers
- Fixed ESLint formatting issues across all Swagger-decorated files
- Corrected API parameter documentation for path and query parameters

## [0.3.0] - 2025-08-21

### Added

- Prisma database integration with connection lifecycle management
- Health check endpoint for database connectivity monitoring
- Development-only guard to restrict health endpoints in production
- Unit tests for PrismaService with connection validation
- Authentication DTOs with proper validation decorators and error messages
- TypeScript strict typing improvements for ESLint compliance

### Changed

- Enhanced PrismaService with proper OnModuleDestroy implementation
- Improved error handling and type safety across database operations
- Proper validation implementation without ESLint rule disabling

## [0.2.0] - 2025-08-21

### Added

- GitHub Actions CI/CD pipeline for automated testing and builds
- Workflow dispatch for manual pipeline triggers
- Build artifacts upload with 7-day retention
- CI/CD status badge and documentation in README

### Changed

- Extended workflow triggers to support feature and fix branch PRs
- Enhanced README with CI/CD pipeline documentation and status monitoring

## [0.1.0] - 2025-08-21

### Added

- Husky pre-commit hooks for automated code quality checks
- lint-staged configuration to run ESLint and Prettier on staged files
- Commitlint configuration for conventional commit message validation
- ESLint configuration with TypeScript support
- Prettier code formatting
- dotenv support for environment variables (.env file loading)
- Updated README with code quality documentation and setup instructions

### Changed

- Enhanced project structure with automated code quality tools
- Updated package.json with new scripts for linting and formatting

## [0.0.1] - 2025-08-21

### Added

- Initial project setup with NestJS framework
- Basic application structure with AppModule, AppController, and AppService
- TypeScript configuration
- ESLint and Prettier basic setup
- Git repository initialization
