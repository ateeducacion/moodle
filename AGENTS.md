# Moodle SQLite Support — AI Agent Instructions

## Project Overview

This repository (`ateeducacion/moodle`) maintains experimental SQLite support for Moodle, enabling Moodle to run in WASM/browser environments and as a local PHP development server. The SQLite DML/DDL drivers were added as part of [MDL-88218](https://tracker.moodle.org/browse/MDL-88218).

## Branch Strategy

### Workbench branch (this branch)

- **Branch**: `mdl-88218-workbench` (tracks `origin/MDL-88218-main-sqlite-wasm`)
- **Purpose**: Development and testing. All changes should be made and verified here first.
- **Local testing**: Run `make up` to start a local PHP server with SQLite on http://localhost:8081
- **Clean**: Run `make clean` to wipe cache, database, and local data

### Maintained branches (upstream PRs)

Once a fix or improvement is verified on the workbench branch, it **must be replicated** to all three maintained branches:

| Branch | Moodle version | PR | SQLite driver path |
|--------|---------------|----|--------------------|
| `MDL-88218-sqlite-500` | 5.0 | [#3](https://github.com/ateeducacion/moodle/pull/3) | `lib/dml/sqlite3_pdo_moodle_database.php` |
| `MDL-88218-sqlite-501` | 5.1 | [#2](https://github.com/ateeducacion/moodle/pull/2) | `public/lib/dml/sqlite3_pdo_moodle_database.php` |
| `MDL-88218-Add-experimental-SQLite-support-for-Moodle-WASM-environments` | main | [#1](https://github.com/ateeducacion/moodle/pull/1) | `public/lib/dml/sqlite3_pdo_moodle_database.php` |

**Important**: The 5.0 branch has a different file structure — files are under `lib/` instead of `public/lib/`. The 5.1 and main branches use the `public/` prefix.

### Issues

Bugs and feature requests are tracked at: https://github.com/ateeducacion/moodle-playground/issues

## Workflow for Making Changes

1. **Develop on workbench**: Make changes on `mdl-88218-workbench`
2. **Test locally**: Run `make up`, verify in browser at http://localhost:8081 (admin/password)
3. **Replicate to maintained branches**: For each of the 3 branches:
   - `git checkout origin/<branch> -B <branch>`
   - Apply the same fix (adjust path if needed for 5.0)
   - Commit with the same message
   - `git push origin <branch>`
4. **Update issues**: Close or comment on related issues with links to all 3 PRs

## Key Files

### SQLite drivers (our code)

- `public/lib/dml/sqlite3_pdo_moodle_database.php` — DML driver (queries, connections, column introspection)
- `public/lib/ddl/sqlite_sql_generator.php` — DDL generator (CREATE TABLE, ALTER TABLE emulation, temp tables)

### Local development

- `Makefile` — `make up` (start server) and `make clean` (wipe data)
- `setup-local.sh` — Configures config.php, creates moodledata, installs Moodle on first run, starts PHP built-in server

### Moodle core files we depend on

- `public/lib/dml/pdo_moodle_database.php` — Parent class for our SQLite driver
- `public/lib/dml/moodle_database.php` — Base database abstraction
- `public/lib/dml/moodle_temptables.php` — Temporary table tracking
- `public/lib/ddl/database_manager.php` — Manages DDL operations

## Known Gotchas

- **Temporary tables in SQLite** live in `sqlite_temp_master`, not `sqlite_master`. Any method querying table metadata must check both catalogs with `UNION ALL`.
- **ALTER TABLE** is limited in SQLite. The DDL generator emulates it by recreating the table (BEGIN → copy to temp → DROP → CREATE new → INSERT from temp → DROP temp → COMMIT).
- **PHP 8.4 strictness**: Some Moodle core code triggers notices (e.g., object-to-int conversion) that are harmless but noisy with `debugdisplay=1`.
- **Config defaults**: The `setup-local.sh` sets `langmenu=0` and `guestloginbutton=0` to avoid edge cases in the UI.

## Local Environment

- **PHP**: `/opt/homebrew/opt/php@8.4/bin/php` (requires `pdo_sqlite` extension)
- **Database**: SQLite file at `.cache/local/moodledata/moodle.sq3.php`
- **Moodledata**: `.cache/local/moodledata/`
- **Default credentials**: admin / password
