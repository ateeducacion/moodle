#!/bin/sh
#
# Starts a local PHP development server for Moodle with SQLite.
#
# Usage: ./setup-local.sh [PORT] [PHP_BIN]
#   PORT defaults to 8081
#   PHP_BIN defaults to "php84"

set -eu

REPO_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PORT=${1:-8081}
PHP_BIN=${2:-/opt/homebrew/opt/php@8.4/bin/php}

MOODLE_DIR="$REPO_DIR"
LOCAL_DIR="$REPO_DIR/.cache/local"
MOODLEDATA_DIR="$LOCAL_DIR/moodledata"
DB_FILE="$MOODLEDATA_DIR/moodle.sq3.php"
CONFIG_FILE="$MOODLE_DIR/config.php"
DOCROOT="$MOODLE_DIR"

# Check PHP has pdo_sqlite
if ! "$PHP_BIN" -m 2>/dev/null | grep -qi pdo_sqlite; then
  echo "$PHP_BIN does not have pdo_sqlite enabled." >&2
  exit 1
fi

if [ -f "$MOODLE_DIR/public/lib/setup.php" ]; then
  DOCROOT="$MOODLE_DIR/public"
fi

PHP_COMMON_ARGS="
-d max_input_vars=5000
-d memory_limit=512M
-d post_max_size=128M
-d upload_max_filesize=128M
"

# Create moodledata directories
mkdir -p "$MOODLEDATA_DIR/cache"
mkdir -p "$MOODLEDATA_DIR/localcache"
mkdir -p "$MOODLEDATA_DIR/sessions"
mkdir -p "$MOODLEDATA_DIR/temp/backup"
mkdir -p "$MOODLEDATA_DIR/temp/sessions"

WWWROOT="http://localhost:$PORT"

# Write config.php
cat > "$CONFIG_FILE" <<CONFIGEOF
<?php
unset(\$CFG);
global \$CFG;
\$CFG = new stdClass();

\$CFG->dbtype = 'sqlite3';
\$CFG->dblibrary = 'pdo';
\$CFG->dbhost = 'localhost';
\$CFG->dbname = 'moodle_local';
\$CFG->dbuser = '';
\$CFG->dbpass = '';
\$CFG->prefix = 'mdl_';
\$CFG->dboptions = [
    'dbpersist' => 0,
    'dbport' => '',
    'dbsocket' => '',
    'dbhandlesoptions' => false,
    'file' => '$DB_FILE',
];

\$CFG->wwwroot = '$WWWROOT';
\$CFG->dataroot = '$MOODLEDATA_DIR';
\$CFG->cachedir = '$MOODLEDATA_DIR/cache';
\$CFG->localcachedir = '$MOODLEDATA_DIR/localcache';
\$CFG->tempdir = '$MOODLEDATA_DIR/temp';
\$CFG->backuptempdir = '$MOODLEDATA_DIR/temp/backup';
\$CFG->admin = 'admin';
\$CFG->directorypermissions = 0777;
\$CFG->sslproxy = false;
\$CFG->reverseproxy = false;
\$CFG->debug = E_ALL;
\$CFG->debugdisplay = 1;
\$CFG->debugdeveloper = true;
\$CFG->cachejs = false;
\$CFG->cachetemplates = false;
\$CFG->langstringcache = true;
\$CFG->themedesignermode = false;

require_once(__DIR__ . '/lib/setup.php');
CONFIGEOF

# First run: install Moodle via CLI
if [ ! -f "$DB_FILE" ]; then
  echo "=== First run: installing Moodle via CLI ===" >&2
  cd "$MOODLE_DIR"
  # shellcheck disable=SC2086
  "$PHP_BIN" $PHP_COMMON_ARGS admin/cli/install_database.php \
    --lang=en \
    --adminuser=admin \
    --adminpass='password' \
    --adminemail=admin@example.com \
    --fullname='Moodle Playground (local)' \
    --shortname='Playground' \
    --agree-license
  echo "" >&2
  echo "Installation complete. Admin credentials:" >&2
  echo "  Username: admin" >&2
  echo "  Password: password" >&2
  echo "" >&2
fi

echo "=== Moodle local PHP server ===" >&2
echo "URL:        $WWWROOT" >&2
echo "Docroot:    $DOCROOT" >&2
echo "Database:   $DB_FILE" >&2
echo "PHP:        $PHP_BIN ($("$PHP_BIN" -v 2>&1 | head -1))" >&2
echo "" >&2

cd "$MOODLE_DIR"
# shellcheck disable=SC2086
exec "$PHP_BIN" $PHP_COMMON_ARGS -S "localhost:$PORT" -t "$DOCROOT"
