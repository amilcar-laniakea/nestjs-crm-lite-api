# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
