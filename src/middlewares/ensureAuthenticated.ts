import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        roleId: number;
      };
    }
  }
}

dotenv.config();

interface TokenPayload {
  id: number;
  email: string;
  roleId: number;
  iat: number;
  exp: number;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new Error("Token não fornecido"));
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email,
      roleId: decoded.roleId,
    };

    next();
  } catch (err) {
    next(new Error("Token inválido ou expirado"));
  }
}
