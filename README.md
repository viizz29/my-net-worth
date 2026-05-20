# My Net Worth

A personal finance and net-worth tracking web application built with Next.js. Track your income and expenses, manage accounts, and view your financial overview through an interactive dashboard.

## Features

- **Authentication** — Register and log in with JWT-based authentication
- **Account Management** — Create, edit, delete income and expense accounts
- **Transaction Tracking** — Record transactions against accounts with amounts and comments
- **Dashboard** — View a financial overview with summaries
- **Expense Insights** — See daily expense totals for the last 10 days
- **Internationalization** — English and Hindi language support
- **Dark/Light Theme** — Toggle between dark and light modes
- **Interactive API Docs** — Swagger UI with auto-generated OpenAPI 3.0.3 spec
- **Responsive Design** — Works on desktop and mobile

## Tech Stack

| Technology                                                            | Purpose                         |
| --------------------------------------------------------------------- | ------------------------------- |
| [Next.js](https://nextjs.org/) (App Router)                           | Full-stack framework            |
| [TypeScript](https://www.typescriptlang.org/)                         | Language                        |
| [Prisma](https://www.prisma.io/)                                      | ORM (runtime queries)           |
| [Sequelize](https://sequelize.org/)                                   | Database migrations and seeding |
| [PostgreSQL](https://www.postgresql.org/)                             | Database                        |
| [Tailwind CSS](https://tailwindcss.com/) v4                           | Styling                         |
| [Material UI](https://mui.com/)                                       | UI components (tables, buttons) |
| [next-intl](https://next-intl.dev/)                                   | Internationalization            |
| [TanStack React Query](https://tanstack.com/query)                    | Server state management         |
| [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) | Form validation                 |
| [Axios](https://axios-http.com/)                                      | HTTP client                     |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)            | JWT auth                        |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js)                  | Password hashing                |
| [Hashids](https://hashids.org/)                                       | ID obfuscation                  |
| [Swagger UI](https://swagger.io/tools/swagger-ui/)                    | API documentation               |
| [Luxon](https://moment.github.io/luxon/)                              | Date/time formatting            |
| [Sonner](https://sonner.emilkowal.ski/)                               | Toast notifications             |
| [Lucide](https://lucide.dev/)                                         | Icons                           |

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL database

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables and configure your database
cp .env.example .env.local
# Edit .env.local with your PostgreSQL credentials

# 3. Run database migrations
npm run migrate:dev

# 4. Seed demo data
npm run seed:dev

# 5. Generate Prisma client
npm run prisma:gen:dev

# 6. Start the development server
npm run dev
```

Visit [http://localhost:3000/](http://localhost:3000/) and log in using:

| Email                     | Password      |
| ------------------------- | ------------- |
| `avery.patel@example.com` | `password123` |

Interactive API docs: [http://localhost:3000/en/api-docs](http://localhost:3000/en/api-docs)

### Demo Accounts

The seed script creates 5 demo users (`avery.patel@example.com`, `maya.thompson@example.com`, `jordan.kim@example.com`, `sofia.garcia@example.com`, `noah.williams@example.com`) all with password `password123`, each with sample accounts and transactions.

## npm Scripts

| Script                     | Description               |
| -------------------------- | ------------------------- |
| `npm run dev`              | Start development server  |
| `npm run build`            | Production build          |
| `npm run start`            | Start production server   |
| `npm run lint`             | Lint code with ESLint     |
| `npm run migrate:dev`      | Run Sequelize migrations  |
| `npm run seed:dev`         | Seed demo data            |
| `npm run migrate:dev:undo` | Undo last migration       |
| `npm run prisma:gen:dev`   | Generate Prisma client    |
| `npm run openapi:generate` | Generate OpenAPI spec     |
| `npm run prisma:seed:dev`  | Seed demo data via Prisma |

## API

All API endpoints are under `/api/v1/` and return responses in the format:

```json
{
  "code": 200,
  "msg": "Success",
  "data": {}
}
```

### Authentication

| Method | Endpoint                | Description           |
| ------ | ----------------------- | --------------------- |
| POST   | `/api/v1/auth/login`    | Log in (public)       |
| POST   | `/api/v1/auth/register` | Register (public)     |
| GET    | `/api/v1/me`            | Get current user info |

### Accounts

| Method | Endpoint               | Description    |
| ------ | ---------------------- | -------------- |
| GET    | `/api/v1/accounts`     | List accounts  |
| POST   | `/api/v1/accounts`     | Create account |
| GET    | `/api/v1/accounts/:id` | Get account    |
| PATCH  | `/api/v1/accounts/:id` | Update account |
| DELETE | `/api/v1/accounts/:id` | Delete account |

### Transactions

| Method | Endpoint                                     | Description          |
| ------ | -------------------------------------------- | -------------------- |
| GET    | `/api/v1/transactions`                       | List transactions    |
| POST   | `/api/v1/transactions`                       | Create transaction   |
| GET    | `/api/v1/transactions/:id`                   | Get transaction      |
| PATCH  | `/api/v1/transactions/:id`                   | Update transaction   |
| DELETE | `/api/v1/transactions/:id`                   | Delete transaction   |
| GET    | `/api/v1/transactions/expenses/last-10-days` | Daily expense totals |

## Project Structure

```
my-net-worth/
├── app/
│   ├── [locale]/               # Locale-based routes (en, hi)
│   │   ├── (app)/              # Protected pages
│   │   │   ├── page.tsx        # Dashboard
│   │   │   ├── accounts/       # Account management
│   │   │   └── transactions/   # Transaction management
│   │   ├── api-docs/           # Swagger UI
│   │   └── login/              # Login page
│   ├── api/
│   │   ├── v1/                 # API routes
│   │   ├── hello/              # Example API route
│   │   └── _lib/               # Shared API utilities
│   ├── api-calls/              # Frontend API client functions
│   ├── auth/                   # Auth context, hooks, guards
│   ├── components/             # UI components
│   ├── configs/                # App configuration
│   ├── db/
│   │   ├── prisma/             # Prisma schema + client
│   │   └── sequelize/          # Migrations, seeders, models
│   ├── i18n/                   # Internationalization config
│   └── lib/                    # Utility functions
├── messages/                   # Translation files (en, hi)
├── public/                     # Static assets
└── scripts/                    # Utility scripts
```

## Database

The database uses PostgreSQL with a composite primary key design for user-scoped records:

- **`users`** — `id` (BigInt), `email`, `name`, `password`, timestamps
- **`accounts`** — `(user_id, sn)` composite PK, `name`, `description`, `type` (income/expense)
- **`transactions`** — `(user_id, sn)` composite PK, `account_sn`, `amount`, `comment`

Sequential IDs (`sn`) are auto-generated per user via PostgreSQL triggers. All exposed IDs are obfuscated using Hashids to prevent information leakage.

## Design Decisions

- **Dual ORM approach**: Sequelize handles migrations and seeding (with PostgreSQL-specific triggers), while Prisma handles runtime queries.
- **Composite primary keys**: Accounts and transactions use `(user_id, sn)` to scope sequences per user.
- **ID obfuscation**: Sequential numeric IDs are encoded via Hashids before being sent to the frontend.
- **camelCase/snake_case conversion**: The API transparently converts between camelCase (frontend) and snake_case (database).
- **Auto-generated OpenAPI spec**: Each API route has a co-located `openapi.ts` file; the spec is aggregated at dev/build time.
