import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreateUserService from '@modules/users/services/CreateUserService'
import ListAllUsersService from '@modules/users/services/ListAllUsersService'
import ShowUserService from '@modules/users/services/ShowUserService'
import UpdateUserService from '@modules/users/services/UpdateUserService'
import DeleteUserService from '@modules/users/services/DeleteUserService'

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUser = container.resolve(CreateUserService)

    const user = await createUser.execute({ name, email, password })

    return response.status(200).json(classToClass(user))
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listAllUsers = container.resolve(ListAllUsersService)

    const users = await listAllUsers.execute()

    return response.status(200).json(users)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const showUser = container.resolve(ShowUserService)

    const user = await showUser.execute({ user_id: id })

    return response.status(200).json(classToClass(user))
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, email, password, role } = request.body

    const updateUser = container.resolve(UpdateUserService)

    const user = await updateUser.execute({
      user_id: id,
      name,
      email,
      password,
      role
    })

    return response.status(200).json(classToClass(user))
  }

  public async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteUser = container.resolve(DeleteUserService)

    await deleteUser.execute({ user_id: id })

    return response.status(204).send()
  }
}

export default new UsersController()
