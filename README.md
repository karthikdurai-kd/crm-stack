# CRMStack

A modern, feature-rich Customer Relationship Management (CRM) system built with NestJS and PostgreSQL.

## Features

- **Client Management**
  - Create and manage client profiles
  - Track company information
  - View client insights and analytics
  - Monitor monthly revenue trends

- **Opportunity Management**
  - Create and track business opportunities
  - Advanced filtering options
  - Track opportunity amounts and stages
  - Associate opportunities with clients

- **Contact Management**
  - Manage client contacts
  - Store contact details
  - Link contacts to client companies

- **Notes System**
  - Add notes to opportunities
  - Track communication history

- **Analytics**
  - View top clients by revenue
  - Opportunity pipeline analytics
  - Revenue tracking and reporting

## Tech Stack

- **Backend Framework**: NestJS
- **Database**: PostgreSQL
- **ORM (Object-Relational Mapping)**: TypeORM
- **API Documentation**: Swagger/OpenAPI
- **Development Tools**: TypeScript, ESLint, Docker

## Prerequisites

- Node.js
- PostgreSQL
- Docker

## Installation

1. Clone the repository:

```bash
git clone <https://github.com/karthikdurai-kd/crm-stack.git>
cd crm-stack
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=crmstack
PORT=3000
```

4. Start the application:

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## Docker Setup

Use Docker Compose to run the application with PostgreSQL:

```bash
docker-compose up -d
```

## API Documentation

Once the application is running, access the Swagger documentation at:

```
http://localhost:3000/api
```
