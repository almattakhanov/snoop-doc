// src/controllers/userController.ts

import { Request, Response } from 'express';
import { calculateAverageAge } from '../services/userService';

export const getAverageAge = (req: Request, res: Response) => {
  const averageAge = calculateAverageAge();
  res.json({ averageAge });
};
