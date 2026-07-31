import crypto from 'crypto'

import LogoutService from '@modules/auth/services/LogoutService'
import FakeRefreshTokensRepository from '@modules/auth/repositories/fakes/FakeRefreshTokensRepository'

let logoutService: LogoutService
let fakeRefreshTokensRepository: FakeRefreshTokensRepository

describe('Logout', () => {
  beforeEach(() => {
    fakeRefreshTokensRepository = new FakeRefreshTokensRepository()
    logoutService = new LogoutService(fakeRefreshTokensRepository)
  })

  it('should revoke the refresh token when logging out', async () => {
    const rawToken = crypto.randomBytes(40).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex')

    await fakeRefreshTokensRepository.create({
      user_id: 'user-id-1',
      hashedToken,
    })

    await logoutService.execute({ refreshToken: rawToken })

    const revokedToken = await fakeRefreshTokensRepository.findByToken(hashedToken)

    expect(revokedToken?.revoked).toBe(true)
  })

  it('should allow logout without a refresh token', async () => {
    await expect(logoutService.execute({})).resolves.toBeUndefined()
  })
})
