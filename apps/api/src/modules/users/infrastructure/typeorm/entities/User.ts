import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  name: string

  @Column('varchar')
  email: string

  @Column('varchar')
  @Exclude()
  password_hash: string

  @Column({ type: 'varchar', default: 'user' })
  role: string

  @Column({ type: 'varchar', default: 'local' })
  auth_provider: string

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @Column({ type: 'timestamp', nullable: true })
  email_verified_at?: Date | null
}

export default User
