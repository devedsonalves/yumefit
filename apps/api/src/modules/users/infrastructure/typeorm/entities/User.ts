import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity('users')
class User {
  @PrimaryColumn('uuid')
  id: string

  @Column('varchar')
  name: string

  @Column('varchar')
  email: string

  @Column('varchar')
  @Exclude()
  password_hash: string

  @Column('varchar')
  role: string

  @Column({ type: 'varchar', default: 'local' })
  auth_provider: string

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date
}

export default User
