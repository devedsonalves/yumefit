import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

export type AuthActionTokenType = 'password_reset' | 'email_verification'

@Entity('auth_action_tokens')
class AuthActionToken {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('uuid')
  user_id: string

  @Column('varchar')
  hashedToken: string

  @Column('varchar')
  type: AuthActionTokenType

  @Column('timestamp')
  expires_at: Date

  @Column({ type: 'timestamp', nullable: true })
  used_at?: Date | null

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date
}

export default AuthActionToken
