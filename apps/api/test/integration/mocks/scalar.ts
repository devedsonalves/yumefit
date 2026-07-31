import { NextFunction, Request, Response } from 'express'

export const apiReference = () => (_: Request, __: Response, next: NextFunction) => next()
