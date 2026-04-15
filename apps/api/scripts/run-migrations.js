#!/usr/bin/env node
/**
 * Script para rodar migrations do TypeORM sem depender de ts-node.
 * As migrations são compiladas on-the-fly usando require('ts-node-dev') não,
 * mas registrando ts-node/register manualmente via node_modules do monorepo,
 * garantindo que o contexto correto seja usado.
 *
 * Uso:
 *   node scripts/run-migrations.js            → migration:run
 *   node scripts/run-migrations.js revert     → migration:revert
 *   node scripts/run-migrations.js show       → migration:show
 */

// Registrar suporte a TypeScript
require('/home/devedsonalves/www/ForgeFit/node_modules/.pnpm/ts-node@9.1.1_typescript@4.9.5/node_modules/ts-node').register(
  {
    project: require('path').join(__dirname, '..', 'tsconfig.json'),
    transpileOnly: true,
  },
)

// Registrar path aliases (tsconfig-paths)
require('/home/devedsonalves/www/ForgeFit/node_modules/.pnpm/tsconfig-paths@3.15.0/node_modules/tsconfig-paths/register')

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') })

const { createConnection } = require('typeorm')
const path = require('path')

const action = process.argv[2] || 'run'

const connectionOptions = {
  type: process.env.TYPEORM_TYPE || 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: Number(process.env.TYPEORM_PORT) || 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  logging: true,
  migrations: [path.join(__dirname, '..', 'src/shared/infrastructure/typeorm/migrations/*.ts')],
  entities: [path.join(__dirname, '..', 'src/modules/**/infrastructure/typeorm/entities/*.ts')],
}

async function main() {
  console.log(`[migrations] Running migration:${action}...`)
  const connection = await createConnection(connectionOptions)

  try {
    if (action === 'run') {
      await connection.runMigrations({ transaction: 'all' })
      console.log('[migrations] ✅ Migrations executadas com sucesso.')
    } else if (action === 'revert') {
      await connection.undoLastMigration({ transaction: 'all' })
      console.log('[migrations] ✅ Última migration revertida com sucesso.')
    } else if (action === 'show') {
      const migrations = await connection.showMigrations()
      console.log('[migrations] Pending migrations:', migrations)
    } else {
      console.error(`[migrations] Ação desconhecida: "${action}". Use: run | revert | show`)
      process.exit(1)
    }
  } finally {
    await connection.close()
  }
}

main().catch((err) => {
  console.error('[migrations] ❌ Erro:', err)
  process.exit(1)
})
