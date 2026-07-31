export default interface IMailProvider {
  sendMail(options: { to: string; subject: string; body: string }): Promise<void>
}
