import { Request, Response, NextFunction } from 'express';

// TODO: Здесь должна быть ваша проверка авторизаций
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // const token = req.headers['authorization'];
  //
  // if (!token) {
  //   res.status(401).json({ message: 'Unauthorized: No token provided' });
  //   return;
  // }

  next();
};
