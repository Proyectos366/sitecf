import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
);

function normalizeSqliteUrl(value) {
  if (!value?.startsWith("file:")) {
    return null;
  }

  if (value === "file::memory:" || value.startsWith("file:/")
    || /^[A-Za-z]:[\\/]/.test(value.slice("file:".length))) {
    return value;
  }

  const relativePath = value.slice("file:".length);
  const absolutePath = path.resolve(projectRoot, relativePath);
  return process.platform === "win32"
    ? `file:${absolutePath.replaceAll("\\", "/")}`
    : pathToFileURL(absolutePath).href;
}

export function getDatabaseProvider(env = process.env) {
  return env.VERCEL || env.DATABASE_PROVIDER === "postgresql"
    ? "postgresql"
    : "sqlite";
}

function firstPostgresUrl(...urls) {
  return urls.find(
    (url) =>
      url?.startsWith("postgres://") || url?.startsWith("postgresql://"),
  );
}

export function getPostgresDatabaseUrl(env = process.env) {
  return firstPostgresUrl(
    env.POSTGRES_PRISMA_URL,
    env.POSTGRES_URL,
    env.POSTGRES_URL_NON_POOLING,
    env.DIRECT_URL,
    env.DATABASE_URL,
  );
}

export function getDirectPostgresDatabaseUrl(env = process.env) {
  return firstPostgresUrl(
    env.DIRECT_URL,
    env.POSTGRES_URL_NON_POOLING,
    env.POSTGRES_URL,
    env.POSTGRES_PRISMA_URL,
    env.DATABASE_URL,
  );
}

export function getSqliteDatabaseUrl(env = process.env) {
  const configuredUrl = normalizeSqliteUrl(env.SQLITE_DATABASE_URL)
    ?? normalizeSqliteUrl(env.DATABASE_URL);

  return configuredUrl
    ?? (process.platform === "win32"
      ? `file:${path.join(projectRoot, "prisma", "prisma", "dev.db").replaceAll("\\", "/")}`
      : pathToFileURL(path.join(projectRoot, "prisma", "prisma", "dev.db")).href);
}
