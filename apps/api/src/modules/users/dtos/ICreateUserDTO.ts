export default interface ICreateUserDTO {
  name: string
  email: string
  password_hash: string
  auth_provider?: string
}
