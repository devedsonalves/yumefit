import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableColumn } from 'typeorm'

export class AddAuthProviderAndRefreshToken1713114720000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'auth_provider',
        type: 'varchar',
        default: "'local'",
      }),
    ])

    await queryRunner.createTable(
      new Table({
        name: 'refresh_tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'hashedToken',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'user_id',
            type: 'varchar',
          },
          {
            name: 'revoked',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    )

    await queryRunner.createForeignKey(
      'refresh_tokens',
      new TableForeignKey({
        name: 'RefreshTokenUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('refresh_tokens')
    if (table) {
      const foreignKey = table.foreignKeys.find((fk) => fk.name === 'RefreshTokenUser')
      if (foreignKey) {
        await queryRunner.dropForeignKey('refresh_tokens', foreignKey)
      }
    }
    await queryRunner.dropTable('refresh_tokens')
    await queryRunner.dropColumn('users', 'auth_provider')
  }
}
