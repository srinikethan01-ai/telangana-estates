#!/bin/bash
set -e

echo "=== Installing pnpm ==="
npm install -g pnpm --prefer-offline 2>/dev/null || true
pnpm --version

echo "=== Installing dependencies ==="
pnpm install --no-frozen-lockfile

echo "=== Building frontend ==="
BASE_PATH=/ NODE_ENV=production pnpm --filter @workspace/telangana-estates run build

echo "=== Building backend ==="
pnpm --filter @workspace/api-server run build

echo "=== Build complete ==="
