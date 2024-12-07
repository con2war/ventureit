const requiredEnvVars = [
  'DATABASE_URL',
  'ADMIN_SECRET',
  'EMAIL_USER',
  'EMAIL_APP_PASSWORD',
] as const

export function validateEnv() {
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`)
    }
  }
} 