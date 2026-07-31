import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'

export class AddAuthActionTokensAndEmailVerification1713114740000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersTable = await queryRunner.getTable('users')

    if (usersTable && !usersTable.findColumnByName('email_verified_at')) {
      await queryRunner.addColumn(
        'users',
        new TableColumn({
          name: 'email_verified_at',
          type: 'timestamp',
          isNullable: true,
        }),
      )
    }

    if (!(await queryRunner.hasTable('auth_action_tokens'))) {
      await queryRunner.createTable(
        new Table({
          name: 'auth_action_tokens',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            { name: 'user_id', type: 'uuid' },
            { name: 'hashedToken', type: 'varchar', isUnique: true },
            { name: 'type', type: 'varchar' },
            { name: 'expires_at', type: 'timestamp' },
            { name: 'used_at', type: 'timestamp', isNullable: true },
            { name: 'created_at', type: 'timestamp', default: 'now()' },
          ],
        }),
      )

      await queryRunner.createForeignKey(
        'auth_action_tokens',
        new TableForeignKey({
          name: 'AuthActionTokenUser',
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }),
      )
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable('auth_action_tokens')) {
      await queryRunner.dropTable('auth_action_tokens')
    }

    const usersTable = await queryRunner.getTable('users')
    if (usersTable?.findColumnByName('email_verified_at')) {
      await queryRunner.dropColumn('users', 'email_verified_at')
    }
  }
}
