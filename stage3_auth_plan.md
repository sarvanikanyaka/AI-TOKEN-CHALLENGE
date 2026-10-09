Stage 3 — Authentication Plan

Objective
- Refactor and modernize authentication with minimal disruption. Deliver JWT-based access + refresh token flow (or adapt to current stack), session store migration if needed, and E2E tests.

Tasks
1. Create feature branch: `feature/auth-refactor`.
2. Inventory auth files and current flows (OAuth providers, SSO, legacy sessions).
3. Design: choose session vs stateless JWT (document tradeoffs).
4. Implement: auth service, token issuance, refresh endpoint, protected-route middleware.
5. Add tests: unit tests for token logic, integration tests for middleware, E2E flows for sign-up/sign-in/sign-out/refresh.
6. Security: run SAST, dependency-scan, and perform a short checklist (no secrets in code, secure token storage, cookie flags, CSRF mitigations if using cookies).
7. Deploy to staging feature environment and run E2E.

Verification Gate
- All auth E2E tests pass in staging (including token refresh and session expiry).
- Vulnerability scan shows no critical findings.
- Security reviewer approves checklist items.

Artifacts to produce
- `auth/README.md` with flow diagrams and configuration notes.
- `auth/tests/e2e_auth.spec.ts` (or relevant test runner).
- `handoff_template.md` entry for Stage 3 when ready.

Commands (examples)
- Create branch:

  git checkout -b feature/auth-refactor

- Run unit tests:

  npm test -- auth

- Run E2E (example using Cypress):

  npx cypress run --spec "cypress/e2e/auth/*"

Open issues
- MFA decision (ISSUE-42)
- Session store migration timing

Next actions
- Confirm which token format to standardize on (JWT vs opaque).
- Assign security reviewer and staging environment.
