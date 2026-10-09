Auth Service — feature/auth-refactor

Purpose
- Contains the authentication service, token logic, middleware, and E2E test templates for the auth refactor.

Guidelines
- Follow `project_contract.md` rules: do not store secrets in code; reference secret names only.
- Implement token signing using the secret referenced as `AUTH_JWT_SECRET` stored in the secret manager.

Structure
- `service.ts` — token issuance / refresh / revoke skeleton
- `middleware.ts` — Express middleware for protected routes
- `tests/e2e_auth.spec.ts` — E2E test template (Cypress / Playwright / Jest+Puppeteer)

Local run examples
- Install deps (example):

  npm install

- Run unit tests for auth (example):

  npm test -- auth

- Run E2E (example using Cypress):

  npx cypress open

Notes
- Use feature branch `feature/auth-refactor` and open a PR with artifact links and CI evidence attached in the handoff template.