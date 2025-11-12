import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const root = process.cwd();
const envPath = path.join(root, '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// Map REACT_APP_* -> Angular environment fields
const get = (k, d='') => process.env[k] ?? d;

const apiBase = get('REACT_APP_API_BASE', get('REACT_APP_BACKEND_URL', ''));
const frontendUrl = get('REACT_APP_FRONTEND_URL', '');
const wsUrl = get('REACT_APP_WS_URL', '');
const nodeEnv = get('REACT_APP_NODE_ENV', process.env.NODE_ENV || 'development');
const enableSourceMaps = get('REACT_APP_ENABLE_SOURCE_MAPS', '');
const port = get('REACT_APP_PORT', '3000');
const logLevel = get('REACT_APP_LOG_LEVEL', 'info');
const healthcheckPath = get('REACT_APP_HEALTHCHECK_PATH', '/health');
const featureFlagsRaw = get('REACT_APP_FEATURE_FLAGS', '{}');
let featureFlags = {};
try { featureFlags = JSON.parse(featureFlagsRaw); } catch { featureFlags = {}; }
const experimentsEnabled = ['true', '1', 'yes'].includes(String(get('REACT_APP_EXPERIMENTS_ENABLED', 'false')).toLowerCase());

const base = {
  apiBaseUrl: apiBase,
  frontendUrl,
  wsUrl,
  nodeEnv,
  logLevel,
  healthcheckPath,
  featureFlags,
  experimentsEnabled
};

const envDev = {
  production: false,
  ...base
};
const envProd = {
  production: true,
  ...base
};

const envDir = path.join(root, 'src', 'environments');
fs.mkdirSync(envDir, { recursive: true });
fs.writeFileSync(path.join(envDir, 'environment.ts'), `export const environment = ${JSON.stringify(envDev, null, 2)} as const;\n`);
fs.writeFileSync(path.join(envDir, 'environment.prod.ts'), `export const environment = ${JSON.stringify(envProd, null, 2)} as const;\n`);

console.log('[env] Generated Angular environment files.');
console.log(`[env] Port configured (serve uses angular.json): ${port}`);
if (enableSourceMaps) {
  console.log(`[env] Source maps desired: ${enableSourceMaps}`);
}
