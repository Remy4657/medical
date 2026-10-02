# Medical Backend API

[NestJS](https://nestjs.com/) backend application for a medical system. This project provides a complete API for managing medical services including user authentication, blog posts, product catalog, shopping cart, orders, and payment processing.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Module Structure](#module-structure)
- [Deployment](#deployment)
- [License](#license)

## 📝 Project Overview

This is a NestJS TypeScript backend designed for a medical application. The system includes:

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Blog Module**: Manage medical articles and posts
- **Product Catalog**: Manage medical products and inventory
- **Shopping Cart & Orders**: Handle patient orders
- **Payment Processing**: Integrated PayOS payment gateway
- **Search**: Full-text search functionality
- **User Management**: Roles, permissions, and profiles

## 🔧 Prerequisites

- [Node.js](https://nodejs.org/) (>= 20.x)
- [pnpm](https://pnpm.io/) (package manager)
- [PostgreSQL](https://www.postgresql.org/) (database)
- [Docker](https://www.docker.com/) (optional, for containerized development)

## 🛠️ Installation

```bash
# Install dependencies
pnpm install

# Compile the project
pnpm run build

# Run in development mode
pnpm run start:dev

# Run in production mode
pnpm run start:prod
```

## 🌿 Environment Configuration

Copy the environment file and configure your settings:

```bash
cp .env.example .env
# Or copy from existing .env file
```

Edit `.env` with your configuration:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=medical_db

# PayOS Payment
PAYOS_CLIENT_ID=your-payos-client-id
PAYOS_API_KEY=your-payos-api-key
PAYOS_CHECKSUM_KEY=your-payos-checksum-key

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 🗄️ Database Setup

The project uses **PostgreSQL** with **TypeORM**.

### Using Docker (recommended for development):

```bash
docker run -e POSTGRES_PASSWORD=your_password -e POSTGRES_DB=medical_db -p 5432:5432 -d postgres:15
```

### Manual Setup:

1. Create a PostgreSQL database: `medical_db`
2. Update `.env` with your database credentials
3. Run migrations (if any):
   ```bash
   pnpm typeorm migration:run
   ```

### Schema

The database schema includes entities for:

- Users, Accounts, Sessions (Authentication)
- Roles and Permissions
- Blog Posts, Categories, Images
- Products, Categories, Brands, Inventory
- Carts, Order Items, Orders
- Search keywords

## 📦 Available Scripts

| Script                 | Description                            |
| ---------------------- | -------------------------------------- |
| `pnpm run build`       | Compile TypeScript to `dist/`          |
| `pnpm run start`       | Start production server                |
| `pnpm run start:dev`   | Start development mode with hot reload |
| `pnpm run start:debug` | Start with debugger                    |
| `pnpm run start:prod`  | Start production from `dist/`          |
| `pnpm run lint`        | Run ESLint                             |
| `pnpm run format`      | Format with Prettier                   |
| `pnpm run test`        | Run unit tests                         |
| `pnpm run test:watch`  | Run tests in watch mode                |
| `pnpm run test:cov`    | Run tests with coverage                |
| `pnpm run test:e2e`    | Run end-to-end tests                   |

## 🏗️ Module Structure

```
src/
├── auth/           # Authentication & Authorization
├── blog/           # Blog system (posts, categories, images)
├── product/        # Product catalog & inventory
├── category/       # Product categories
├── cart/           # Shopping cart
├── order/          # Order management
├── payos/          # Payment processing via PayOS
├── search/         # Search functionality
├── common/         # Shared utilities, guards, decorators
├── config/         # Configuration files
└── app/            # Root module & app service
```

### Key Modules

- **Auth**: better-auth integration (`betterAuth()`), session guard (`AuthGuard`), profile endpoints
- **Blog**: CRUD for blog posts, categories, image management
- **Product**: Product management, attributes, variants, inventory tracking
- **Order**: Order creation, item management, order status tracking
- **PayOS**: Payment integration with callback handling
- **Search**: Keyword indexing and search queries

## 🔐 Authentication

The system uses **[better-auth](https://www.better-auth.com/)** for authentication — a modern, framework-agnostic auth library. All session management (login, logout, refresh, email/password, social login) is handled by better-auth, not implemented manually.

## 💳 Payment Integration (PayOS)

The project integrates with **PayOS** for payment processing:

- Create payment links
- Handle payment callbacks
- Verify payment status
- Support for multiple payment methods

Configuration requires:

- `PAYOS_CLIENT_ID`
- `PAYOS_API_KEY`
- `PAYOS_CHECKSUM_KEY`

Set these in your `.env` file from your PayOS dashboard.

## 🔍 Search functionality

- Index blog posts and products for search
- Search by keyword in titles, descriptions, and content
- Search queries are logged for analytics

## 🧪 Testing

```bash
# Run all tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Run with coverage
pnpm run test:cov

# Run E2E tests
pnpm run test:e2e
```

## 📦 Deployment

### Using Docker

```bash
# Build the Docker image
docker build -t medical-backend .

# Run the container
docker run -p 3000:3000 --env-file .env medical-backend
```

### Using PM2 (production)

```bash
# Install PM2 globally
npm install -g pm2

# Start with environment variables
pm2 start dist/main --env .env
```

### Docker

Deploy using the provided `docker-compose.yml` or create Kubernetes manifests.

## 🙏 Documents

- [NestJS](https://nestjs.com/) - The progressive Node.js framework
- [PayOS](https://payos.vn/) - Payment gateway
- [TypeORM](https://typeorm.io/) - ORM for PostgreSQL
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing
