import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'

class FakeMailProvider implements IMailProvider {
  public messages: Array<{ to: string; subject: string; body: string }> = []

  public async sendMail(message: { to: string; subject: string; body: string }): Promise<void> {
    this.messages.push(message)
  }
}

export default FakeMailProvider
