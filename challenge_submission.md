CHALLENGE 3 — Multi-Turn Workflow Optimization — Submission

Summary
- Deliverable: compact, judge-ready staged workflow for refactoring an ecommerce platform into safe, verifiable multi-turn stages.
- Includes: staged workflow (8 stages), Input/Output/Gate for each stage, reusable project contract outline, context handoff template, token-savings explanation, and token-estimation examples.

1) Staged Workflow (primary outcome per stage)

Stage 1 — Discovery
- Input: repository map, CI/test output, bug backlog, product requirements, deployment targets.
- Output: architecture summary, prioritized change list, risk matrix, migration strategy, protected-behavior list.
- Gate: stakeholder sign-off on scope, protected behaviors, and rollback strategy.
- Context carried: prioritized list, protected behavior doc, minimal file path map, decisions log.
- Primary outcome: Approved scope & migration plan.

Stage 2 — Contracts & Data
- Input: approved plan, DB schema files, API surface, external integrations list.
- Output: versioned API contracts (OpenAPI/GraphQL), DB migration plan (up/down), migration dry-run artifacts.
- Gate: automated schema validation + migration dry-run success on staging snapshot.
- Context carried: contracts, migration scripts, test dataset pointers, unresolved schema decisions.
- Primary outcome: Contract-and-migration artifacts validated for development.

Stage 3 — Authentication (high-risk)
- Input: project contract, auth files, session/store configs, SSO/OAuth details.
- Output: refactored auth module, token/session migration path, E2E auth test harness.
- Gate: E2E tests (sign-up/sign-in/sign-out/refresh/protected routes) pass in staging; security checklist passed (SAST/SCA), no secrets leaked, reviewer sign-off.
- Context carried: auth docs, test logs, protected endpoints list, open security items.
- Primary outcome: Verified, deployable auth module.

Stage 4 — Catalog & Search
- Input: product models, existing index config, catalog UI contracts, sample datasets.
- Output: normalized product schema, CRUD APIs, improved search/index mapping, benchmark plan.
- Gate: CRUD tests and search/filter acceptance tests pass; index rebuild verification successful.
- Context carried: product schema, index mapping, sample queries, performance baseline.
- Primary outcome: Catalog API + search validated.

Stage 5 — Checkout & Payments (high-risk)
- Input: checkout flow, cart model, payment provider configs, PCI scope notes.
- Output: test-mode payment integration, idempotent payment API, webhook handlers, retry/cancel flows.
- Gate: payment verification suite (success/decline/retry/refund/cancel), webhook idempotency, and PCI/security checklist signed by security reviewer.
- Context carried: webhook evidence, idempotency token design, payment test keys (referenced only).
- Primary outcome: Verified payment integration in test-mode.

Stage 6 — Interface & Accessibility
- Input: completed feature APIs/components, UI code, accessibility audit results.
- Output: integrated UI updates, a11y fixes (keyboard nav, aria, contrast), responsive adjustments.
- Gate: automated axe checks + manual keyboard/focus checklist + responsive tests pass.
- Context carried: changed components list, a11y reports, outstanding UX tradeoffs.
- Primary outcome: Accessible, integrated UI.

Stage 7 — Tests, Performance & QA
- Input: changed-files list, all tests, performance baselines.
- Output: test coverage report, regression test results, load test report, remediation plan for hotspots.
- Gate: coverage threshold met, no critical regressions, performance targets met or accepted mitigations.
- Context carried: failing test logs, perf profiles, test artifacts for release.
- Primary outcome: Verified quality and performance baselines.

Stage 8 — Release & Deployment
- Input: release candidate build, changelog, migration scripts, deployment manifest.
- Output: deployment plan, rollback procedures, monitoring/alerting config, post-release verification runbook.
- Gate: staging smoke tests pass, rollback rehearsal complete, deployment approval.
- Context carried: artifact hashes, migration plan, runbook for production cutover.
- Primary outcome: Production-ready release with verified runbook.

2) Per-stage Input/Output/Verification Gates (Summary table)
- Each stage above lists explicit machine-checkable gates: tests, schema validation, dry-runs, security sign-offs, automated audits.
- High-risk stages (Auth, Payments) require additional security gates and manual reviewer sign-off before downstream stages proceed.

3) Context to carry between stages (compact set)
- Approved plan ID and short summary.
- Changed-files list + diffs (not full file contents unless necessary).
- Contract artifacts (OpenAPI YAML, GraphQL schema, DB migration SQLs).
- Test result summaries and CI artifact IDs/links (not raw logs).
- Outstanding decisions with owner and due date.
- Minimal reproducible steps to re-run verification.

4) Reusable Project Instruction Contract (single source)
- See `project_contract.md` in repository; key points:
  - Use existing stack unless migration approved.
  - Never include secrets in prompts or commits; reference secret names only.
  - Preserve protected behaviors; require sign-off to change them.
  - Each change must include tests and reproducible verification steps.
  - Auth and Payments require SAST/SCA and security reviewer sign-off.
  - Accessibility targets: WCAG AA baseline; run automated + manual checks.
  - Each stage must report: changed-files, artifact IDs, test summary, unresolved decisions.

5) Context Handoff Template (compact)
- Use `handoff_template.md` in repo; minimal fields to include per handoff:
  - Stage: <N — short name>
  - PrevGate: <PASS|FAIL + artifact id>
  - PrimaryOutcome: <one-line outcome>
  - FilesChanged: [list of relative paths]
  - Artifacts: {contracts: id/path, migrations: id/path, tests: id/path}
  - RequiredChecks: [list of tests/benchmarks to pass next]
  - OpenIssues: [id:desc, owner, due]
  - NextActions: [small actionable items]
  - Contact/Reviewer: <role>
- Include small evidence links (build IDs), not raw logs or full repo.

6) Token-saving and quality explanation
- Token savings methods:
  - Single-source contract: stable rules live in `project_contract.md` and are referenced by name.
  - Compact handoffs: pass artifact IDs/paths and short summaries only, avoiding retransmitting large files or histories.
  - Diffs & hashes: share diffs or artifact hashes instead of full file contents.
  - Deterministic gates: machine-checkable gates reduce back-and-forth clarifications.
- Quality improvements:
  - Isolates high-risk work (Auth/Payments) with strict gates.
  - Fail-fast approach prevents wasted downstream effort.
  - Traceable artifacts per stage enable auditing and reproducibility.

7) Token Estimation (method and example)
- Method: Estimated tokens = total characters ÷ 4.
- Examples:
  - Compact handoff message ~1,200 chars → ~300 tokens.
  - Full repo snapshot ~200,000 chars → ~50,000 tokens.
  - Per-turn saving: ~49,700 tokens (≈99% reduction) by sending compact handoffs instead of full snapshots.

8) Compact example handoff (concrete)
Stage: 3 — Authentication
PrevGate: Stage2 PASS — schema-20261009-abc123
PrimaryOutcome: Refactored JWT auth + refresh token flow
FilesChanged:
  - auth/service.ts
  - auth/store.ts
  - auth/tests/e2e_auth.spec.ts
Artifacts:
  contracts: schemas/auth-v2.yaml
  migrations: migrations/20261009-add-sessions.sql
  tests: artifacts/e2e_auth_20261009/report.html
RequiredChecks:
  - e2e_auth.spec.ts (pass)
  - vuln-scan (no-critical)
OpenIssues:
  - ISSUE-42: MFA UX decision — owner: product-owner, due: 2026-10-12
NextActions:
  - Run staging E2E with real session store
Contact: security-team@company

9) Judge Checklist mapping
- Stage design and dependencies: 8 stages with sequential gating and clear dependencies.
- Inputs/outputs/gates: Provided for every stage.
- Context handoff efficiency: Handoff template + artifacts/diffs only.
- Safety and quality controls: Contract requires tests, SCA/SAST for Auth/Payments, a11y baseline.
- Explanation and presentation: Token savings and example estimation included.

10) Deliverables in repository
- `project_contract.md` — project contract rules
- `handoff_template.md` — handoff template
- `stage2_openapi.yaml` — contract skeleton
- `stage2_migration_plan.md` — migration plan
- `stage3_auth_plan.md` — auth plan
- `auth/` — scaffold: `service.ts`, `middleware.ts`, `store.ts`, tests templates
- `challenge_submission.md` — this file

Next steps (if you want me to continue executing changes)
- Push branch `feature/auth-refactor` to your remote and open a PR (requires remote URL and push permissions).
- Implement and run the auth E2E tests in CI (requires secrets in CI secret manager and staging env).
- Proceed to Stage 4 once Stage 3 gates pass.

End of submission.
