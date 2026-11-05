#!/bin/sh
set -eu
: "${REVEN_APP_USER:=reven_app}"
: "${REVEN_APP_PASSWORD:?REVEN_APP_PASSWORD is required}"
psql --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" \
  --set=app_user="$REVEN_APP_USER" --set=app_password="$REVEN_APP_PASSWORD" \
  --set=db_name="$POSTGRES_DB" --set=ON_ERROR_STOP=1 <<'SQL'
SELECT format('CREATE ROLE %I LOGIN PASSWORD %L', :'app_user', :'app_password')
WHERE NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = :'app_user')\gexec
SELECT format('GRANT CONNECT ON DATABASE %I TO %I', :'db_name', :'app_user')\gexec
SQL
