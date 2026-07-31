declare namespace Express {
  export interface Request {
    user: {
      id: string
      role: import('@modules/users/types/UserRole').UserRole
    }
  }
}
