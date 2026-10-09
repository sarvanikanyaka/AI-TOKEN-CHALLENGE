Stage 2 — DB Migration Plan (Draft)

Goals
- Introduce normalized `products` table and `sessions` table for auth.
- Provide up/down migrations and a dry-run procedure for staging snapshot.

Migration files
- migrations/20261009_create_products.sql
- migrations/20261009_add_sessions.sql

Up (example SQL)
- migrations/20261009_create_products.sql
  - CREATE TABLE products (
      id UUID PRIMARY KEY,
      sku VARCHAR(64) UNIQUE NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      price NUMERIC(12,2) NOT NULL,
      currency CHAR(3) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );

Dry-run procedure
1. Checkout a staging snapshot database or exported dump.
2. Create a throwaway DB from the snapshot.
3. Run migrations in `--dry-run` or on the throwaway DB:

   psql $THROWAWAY_DB -f migrations/20261009_create_products.sql

4. Run schema validation tool (example: `schemacheck` or `sqllint`).
5. Run smoke queries against the migrated DB to ensure existing reads return expected shapes.

Rollback
- Provide the DOWN migration SQL for each UP.
- Test DOWN by applying UP then DOWN on the throwaway DB and validating equality to snapshot state.

Acceptance criteria (Gate)
- Migrations apply cleanly to staging snapshot.
- Down migrations restore snapshot-equivalent schema.
- Smoke queries from existing app tests succeed against migrated DB.

Open decisions
- Nullability and indexing strategy for search (owner: backend lead)
- Exact product price precision and currency handling (owner: finance)
