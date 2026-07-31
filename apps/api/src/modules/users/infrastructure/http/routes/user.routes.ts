import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import UserController from '@modules/users/infrastructure/http/controllers/UsersController'

import ensureAuthentication from '@modules/users/infrastructure/http/middlewares/EnsureAuthentication'
import {
  allowRoles,
  allowSelfOrRoles,
} from '@modules/users/infrastructure/http/middlewares/Authorize'

const usersRouter = Router()

/**
 * @openapi
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     description: Creates a new user in the YumeFit system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully.
 *       400:
 *         description: Validation failed.
 */
usersRouter.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().trim().lowercase().email().required(),
        password: Joi.string().min(8).required(),
      },
    },
    { abortEarly: false },
  ),
  UserController.create,
)

/**
 * @openapi
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: List all users
 *     description: Returns a list of all registered users.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users.
 *       401:
 *         description: Not authenticated.
 */
usersRouter.get('/', ensureAuthentication, allowRoles('admin'), UserController.index)

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Show user details
 *     description: Returns the details of a specific user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details.
 *       404:
 *         description: User not found.
 */
usersRouter.get(
  '/:id',
  ensureAuthentication,
  allowSelfOrRoles('admin'),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  UserController.show,
)

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update a user
 *     description: Updates the details of a specific user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 */
usersRouter.put(
  '/:id',
  ensureAuthentication,
  allowSelfOrRoles('admin'),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().trim().lowercase().email().required(),
      password: Joi.string().min(8).optional(),
      role: Joi.string().valid('admin', 'user').optional(),
    },
  }),
  UserController.update,
)

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user
 *     description: Deletes a specific user from the system.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 */
usersRouter.delete(
  '/:id',
  ensureAuthentication,
  allowRoles('admin'),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  UserController.destroy,
)

export default usersRouter
