import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../services/prisma';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        tipo: string;
      };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Token mal formatado' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token mal formatado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      tipo: string;
    };

    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.tipo)) {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    return next();
  };
}; 