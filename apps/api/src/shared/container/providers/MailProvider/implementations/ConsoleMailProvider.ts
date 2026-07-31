import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'

class ConsoleMailProvider implements IMailProvider {
  public async sendMail({ to, subject, body }: { to: string; subject: string; body: string }) {
    console.log(`[MailProvider] to=${to} subject="${subject}" body="${body}"`)
  }
}

export default ConsoleMailProvider
