#!/bin/bash
  set -e

  echo "=== Node version ==="
  node --version

  echo "=== Installing pnpm ==="
  npm install -g pnpm --prefer-offline 2>/dev/null || true
  pnpm --version

  echo "=== Installing dependencies ==="
  NODE_ENV=production pnpm install --no-frozen-lockfile

  echo "=== Building frontend ==="
  BASE_PATH=/ NODE_ENV=production pnpm --filter @workspace/telangana-estates run build

  echo "=== Building backend ==="
  pnpm --filter @workspace/api-server run build

  echo "=== Build complete ==="
  ls -la artifacts/telangana-estates/dist/public/ 2>/dev/null && echo "Frontend OK" || echo "WARNING: Frontend dist not found"
  ls -la artifacts/api-server/dist/ 2>/dev/null && echo "Backend OK" || echo "WARNING: Backend dist not found"
  