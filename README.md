# Perspectiv API

> Open Source Transaction Enrichment API — clean, normalize, and enrich raw card transaction descriptions with merchant names and logos.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/express-5.x-lightgrey)](https://expressjs.com/)

---

## What is this?

Raw card transaction descriptions are messy. Something like:

```
[SUCCESS][VISA](DEBIT) PURCHASE of GHS23.00 placed for Visa Direct /africaworldairlines using card..1399;fee:0.01;BAL:GHS137.92
```

Perspectiv API normalizes this into something human-readable, matches it to a known merchant, and returns a logo — ready to display in your app.

```json
{
  "merchant": "africa world airlines",
  "merchant_alias": "africaworldairlines",
  "logo": "https://cdn.jsdelivr.net/gh/perspectiv-enrichment-api/merchant-logo-cdn/merchant_logos/africa_world_airlines.png"
}
```

---

## Table of Contents

- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

---

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/perspectiv-enrichment-api/perspectiv-api.git
cd perspectiv-api

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your values

# 4. Start the development server
npm run dev
```

The API will be running at `http://localhost:3000`.

---

## Environment Variables

Create a `.env` file in the project root. The following variables are supported:

| Variable | Required | Description | Example |
|---|---|---|---|
| `APP_PORT` | No | Port the server runs on (defaults to 3000) | `3000` |
| `LOGO_CDN` | Yes | Base URL for merchant logo CDN | `https://cdn.jsdelivr.net/gh/perspectiv-enrichment-api/merchant-logo-cdn/merchant_logos/` |
| `NODE_ENV` | No | Environment (`development` / `production`) | `production` |
| `DB_HOST` | No | PostgreSQL host (not yet in use) | `localhost` |
| `DB_USER` | No | PostgreSQL user (not yet in use) | `postgres` |
| `DB_PASSWORD` | No | PostgreSQL password (not yet in use) | `password` |
| `DB_SCHEMA_NAME` | No | PostgreSQL schema (not yet in use) | `public` |
| `DB_PORT` | No | PostgreSQL port (not yet in use) | `5432` |

A `.env.example` file is provided in the repository for reference.

---

## API Endpoints

### Base URL

```
http://localhost:3000/api/v1
```

---

### `POST /enrich`

Normalizes a raw transaction description and returns enriched merchant data.

**Request Body**

```json
{
  "raw_description": "[SUCCESS][VISA](DEBIT) PURCHASE of GHS23.00 placed for Visa Direct /africaworldairlines using card..1399;fee:0.01;BAL:GHS137.92"
}
```

**Success Response** `200 OK`

```json
{
  "status": "success",
  "data": {
    "originalDescription": "[SUCCESS][VISA](DEBIT) PURCHASE of GHS23.00 placed for Visa Direct /africaworldairlines using card..1399;fee:0.01;BAL:GHS137.92",
    "normalizedDescription": "success placed for direct /africaworldairlines using card fee bal",
    "merchant": "africa world airlines",
    "merchant_alias": "africaworldairlines",
    "logo": "https://cdn.jsdelivr.net/gh/perspectiv-enrichment-api/merchant-logo-cdn/merchant_logos/africa_world_airlines.png"
  }
}
```

**No Match Response** `200 OK`

```json
{
  "status": "success",
  "data": {
    "originalDescription": "...",
    "normalizedDescription": "...",
    "merchant": null,
    "merchant_alias": null,
    "logo": null,
    "note": "unable to match to a merchant. bear with us, we'll get there 😅"
  }
}
```

**Error Response** `400 Bad Request`

```json
{
  "status": "error",
  "message": "raw_description is required"
}
```

---

## Contributing

Contributions are welcome! Here's how to get involved:

### Adding a New Merchant Logo

1. Add the merchant's logo as a `.png` file to the [`merchant-logo-cdn`](https://github.com/perspectiv-enrichment-api/merchant-logo-cdn) repository under `/merchant_logos/`
2. Use snake_case for the filename (e.g. `my_merchant.png`)
3. Open a PR on that repository

### Adding or Improving Merchant Aliases

Merchant matching rules live in:

```
src/config/normalize-0.0.1.rules.json
```

Each merchant entry looks like this:

```json
{
  "name": "africa world airlines",
  "aliases": ["africa world airlines", "awa", "africaworld", "africaworldairlines"],
  "merchant_logo": "africa_world_airlines.png"
}
```

To add or improve a merchant:
1. Fork the repository
2. Edit `normalize-0.0.1.rules.json`
3. Add your merchant or new aliases following the existing pattern
4. Open a pull request with a brief description of what you added

### Development Workflow

```bash
# Run in development mode with hot reload
npm run dev

# Run in production mode
npm start
```

### Guidelines

- Follow the existing code style
- Keep aliases specific enough to avoid false matches — avoid short abbreviations (2–3 characters)
- Test your changes against real transaction strings before submitting a PR
- Keep PRs focused — one merchant or one fix at a time

---

## License

[MIT](LICENSE) © Perspectiv