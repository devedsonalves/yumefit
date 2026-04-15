import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import User from '@modules/users/infrastructure/typeorm/entities/User'

/**
 * RefreshToken Entity
 * Used for token rotation and persistent user sessions.
 */
@Entity('refresh_tokens')
class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string

  /**
   * SHA-256 Hash of the refresh token string.
   */
  @Column('varchar')
  hashedToken: string

  @Column('uuid')
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ type: 'boolean', default: false })
  revoked: boolean

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date
}

export default RefreshToken
