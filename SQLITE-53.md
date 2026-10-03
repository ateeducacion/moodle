# Experimental SQLite for Moodle 5.3

This branch ports the existing main SQLite patch (MDL-88218) to
`MOODLE_503_STABLE`, including its column metadata and MySQL-function fixes. The
SQLite vendor declaration belongs to the 5.3 environment block, not 5.2.

The PR first targeted `feature/moodle-53-baseline` (a copy of `v5.3.0-beta`).
Upstream released 5.3 and created `MOODLE_503_STABLE`, so on 2026-10-03 the
patch was rebased onto that branch (no conflicts) and the PR retargeted to it.
Keep the 5.2 PR and main PR independent.

This backend remains experimental, for demos/WASM/testing, not production.
Container installation, HTTP, Moosh, restart and persistence checks are exercised
by the companion alpine-moodle readiness PR. Validation results are recorded in
that PR and its `docs/moodle-53-migration.md` document.

Local checks: `git diff --check`; PHP lint on all changed PHP files; XML assertion
that exactly one SQLite vendor exists under 5.3 and none under 5.2. The source
patch applies without conflicts to the exact beta tag.

Integration passed on 2026-09-16 in
[alpine-moodle PR #171](https://github.com/erseco/alpine-moodle/pull/171): exact
5.3 beta / PHP 8.4.21 / SQLite installation, HTTP, Moosh, Moodle status checks,
code synchronization and restart. The companion suite also passed PostgreSQL
17 and MariaDB 11.4, and a persistent 4.5.14 → 5.3 beta upgrade on PostgreSQL 17.
See its [reproducible report](https://github.com/erseco/alpine-moodle/blob/feature/moodle-53-readiness/docs/moodle-53-migration.md).

Revalidated on 2026-10-03 against `v5.3.0` / PHP 8.4 in
[alpine-moodle PR #172](https://github.com/erseco/alpine-moodle/pull/172):
SQLite installation, HTTP, Moosh, status checks, code sync and restart passed.
