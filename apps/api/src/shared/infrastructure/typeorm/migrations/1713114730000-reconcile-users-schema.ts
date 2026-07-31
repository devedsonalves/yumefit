import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class ReconcileUsersSchema1713114730000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersTable = await queryRunner.getTable('users')

    if (!usersTable) {
      return
    }

    if (
      usersTable.findColumnByName('encrypted_password') &&
      !usersTable.findColumnByName('password_hash')
    ) {
      await queryRunner.renameColumn('users', 'encrypted_password', 'password_hash')
    }

    if (usersTable.findColumnByName('bio')) {
      await queryRunner.dropColumn('users', 'bio')
    }

    if (!usersTable.findColumnByName('role')) {
      await queryRunner.addColumn(
        'users',
        new TableColumn({
          name: 'role',
          type: 'varchar',
          default: "'user'",
        }),
      )
    }

    if (!usersTable.findColumnByName('created_at')) {
      await queryRunner.addColumn(
        'users',
        new TableColumn({
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        }),
      )
    }
  }

  public async down(): Promise<void> {
    // This migration reconciles legacy databases and is intentionally irreversible.
  }
}
