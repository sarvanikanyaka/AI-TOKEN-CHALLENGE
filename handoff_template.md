Handoff Template (compact YAML)

# Use this template for every stage handoff. Keep it short and attach artifact IDs/paths.

Stage: "<N — short name>"
PrevGate: "<PASS|FAIL> — <short evidence link or artifact id>"
PrimaryOutcome: "<one-line outcome>"
FilesChanged:
  - "relative/path/to/file1"
  - "relative/path/to/file2"
Artifacts:
  contracts: "path/or/artifact-id"
  migrations: "path/or/artifact-id"
  tests: "path/to/test-suite-or-report"
RequiredChecks:
  - "name: e2e_auth.spec.js, type: e2e, pass: true"
  - "name: schema-validate, type: static, pass: true"
OpenIssues:
  - id: ISSUE-123
    desc: "Short description"
    owner: "role-or-person"
    due: "YYYY-MM-DD"
NextActions:
  - "Run: command or short instruction"
Contact: "role@company (security-owner/reviewer)"

Example:
Stage: "3 — Authentication"
PrevGate: "Stage2 PASS — schema-20261009-abc123"
PrimaryOutcome: "Refactored JWT auth + refresh token flow"
FilesChanged:
  - "auth/service.ts"
  - "auth/tests/e2e_auth.spec.ts"
Artifacts:
  contracts: "schemas/auth-v2.yaml"
  migrations: "migrations/20261009-add-sessions.sql"
  tests: "artifacts/e2e_auth_20261009/report.html"
RequiredChecks:
  - "e2e_auth.spec.ts (pass)"
  - "vuln-scan (no-critical)"
OpenIssues:
  - id: ISSUE-42
    desc: "MFA UX decision"
    owner: "product-owner"
    due: "2026-10-12"
NextActions:
  - "Run staging E2E with real session store"
Contact: "security-team@company"
