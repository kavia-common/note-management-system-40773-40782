export const environment = {
  "production": false,
  "apiBaseUrl": "https://vscode-internal-10581-qa.qa01.cloud.kavia.ai:8000",
  "frontendUrl": "https://vscode-internal-10581-qa.qa01.cloud.kavia.ai:3000",
  "wsUrl": "ws://vscode-internal-10581-qa.qa01.cloud.kavia.ai:8000/ws",
  "nodeEnv": "development",
  "logLevel": "info",
  "healthcheckPath": "/healthz",
  "featureFlags": {},
  "experimentsEnabled": false
} as const;
