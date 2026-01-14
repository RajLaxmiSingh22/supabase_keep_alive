#!/usr/bin/env bash
set -e

echo "Pinging Supabase..."

curl -s -o /dev/null \
  -H "apikey: $SUPABASE_ANON_KEY" \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
  "$SUPABASE_URL/rest/v1/"

echo "Supabase is alive"
