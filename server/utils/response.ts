import { Response } from 'express';

export function returnJson(
  object: {
    res: Response,
    code: number,
    message?: string,
    data?: any
  }
) {

  const code: number = typeof object.code !== 'undefined' ? object.code : 200
  const error: boolean = code != 200
  const message: string | null = typeof object.message !== 'undefined' ? object.message : null
  const data: any | null = typeof object.data !== 'undefined' ? object.data : null

  return object.res.status(code).json({
    error,
    message,
    data
  })
}