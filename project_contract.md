Project Contract — Core Rules

Purpose
- Single-source stable rules for the ecommerce refactor workflow. Reference this file in every stage; do not repeat rules in prompts.

Stack & Scope
- Default: Continue using the existing stack unless a migration is explicitly approved by engineering leadership.
- Keep changes minimal to meet goals; prefer adapters over rip-and-replace.

Secrets & Configuration
- NEVER include secrets, API keys, or test credentials in prompts, commits, or handoff artifacts.
- Reference secrets by name (e.g., `PAYMENTS_TEST_KEY`) and store them in the secret manager/env in CI.

Protected Behavior
- Explicitly list non-breaking or backward-compatible behaviors. Example: public product API endpoints, order-number format, tax calculations.
- Any change touching protected behaviors requires explicit stakeholder sign-off recorded in the handoff.

Verification Requirements
- Every change must include reproducible verification steps: unit tests, integration tests, E2E or contract tests as relevant.
- Auth and Payments stages require automated E2E tests and a security checklist before downstream work begins.

Security
- Run static analysis and dependency vulnerability scans on every feature branch.
- For Auth and Payments, perform an additional security review (SCA/SAST and an agreed manual checklist). Never proceed to deployment without sign-off.

Accessibility
- Target WCAG AA baseline for all UI changes by default.
- Run automated axe/core checks and a short manual keyboard/focus checklist during the Interface stage.

Reporting & Artifacts
- Each stage must produce: Changed-files list, artifact identifiers (build hashes/URLs), test results summary, and unresolved decisions.
- Use short evidence links or CI artifact IDs rather than full logs in handoffs.

Handoff & Communication
- Use `handoff_template.md` to create compact, machine- and human-friendly stage handoffs.
- Do not resend entire repo or chat history at every stage.

Decision Ownership
- Record unresolved decisions with an owner and a due date for each stage.

Change Log
- Record the date, author, and short rationale for any updates to this contract.

Contact
- Add reviewers and security contacts in each handoff (roles preferred over names).
