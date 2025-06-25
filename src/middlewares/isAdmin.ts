import { NextFunction, Request, Response } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      roleId?: number;
      [key: string]: any;
    };
  }
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user?.roleId !== 1) {
    return res.status(403).json({ error: "Acesso negado" });
  }
  next();
}