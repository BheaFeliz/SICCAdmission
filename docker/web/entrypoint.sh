#!/bin/sh
set -e

cd /app

if [ ! -d "node_modules" ]; then
  if [ -f "yarn.lock" ]; then
    yarn install --frozen-lockfile
  else
    npm install
  fi
fi

exec yarn dev --hostname 0.0.0.0 --port 3000
