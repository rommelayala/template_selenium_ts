#!/usr/bin/env node
/**
 * Wrapper para ejecutar E2E con Cucumber.
 * Entorno y tags por argumentos o variables de entorno; package.json se mantiene corto.
 *
 * Argumentos:
 *   --env dev|staging|prod   Entorno (o variable TEST_ENV)
 *   --tags "expresión"       Filtro de tags Cucumber (o variable CUCUMBER_TAGS)
 *   Cualquier otro arg       Se pasa tal cual a cucumber-js (ej. --dry-run, --name "foo")
 *
 * Ejemplos:
 *   npm run test:e2e -- --env dev
 *   npm run test:e2e -- --env prod --tags "@rf_cripto and @transacciones"
 *   npm run test:e2e -- --tags "@smoke or @regression"
 *   TEST_ENV=staging CUCUMBER_TAGS="@transacciones" npm run test:e2e
 *   HEADLESS_MODE=true npm run test:e2e:headless -- --env dev --tags "@rf_cripto"
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const parsed = parseArgs(args);

// Entorno: --env dev|staging|prod o variable TEST_ENV
if (parsed.env) {
  process.env.TEST_ENV = parsed.env;
}

// Tags: --tags "expresión" o variable CUCUMBER_TAGS
const tags = parsed.tags || process.env.CUCUMBER_TAGS;

// Reporte HTML con timestamp
const docsDir = path.join(process.cwd(), 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}
const d = new Date();
const pad = (n) => String(n).padStart(2, '0');
const timestamp = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
const reportFile = path.join(docsDir, `report-${timestamp}.html`);

const cucumberArgs = [
  '--format', `html:${reportFile}`,
  ...parsed.rest
];

if (tags) {
  cucumberArgs.push('--tags', tags);
}

const child = spawn('npx', ['cucumber-js', ...cucumberArgs], {
  stdio: 'inherit',
  env: process.env
});

child.on('exit', (code) => process.exit(code ?? 0));

/**
 * Parsea --env y --tags y devuelve el resto de args para cucumber.
 */
function parseArgs(argv) {
  const result = { rest: [] };
  let i = 0;

  while (i < argv.length) {
    if (argv[i] === '--env' && argv[i + 1]) {
      result.env = argv[i + 1];
      i += 2;
      continue;
    }
    if (argv[i] === '--tags' && argv[i + 1]) {
      result.tags = argv[i + 1];
      i += 2;
      continue;
    }
    result.rest.push(argv[i]);
    i++;
  }

  return result;
}
