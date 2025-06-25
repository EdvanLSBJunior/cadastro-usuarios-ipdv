import { Request, Response, NextFunction } from "express";

export function isAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!req.user || req.user.roleId !== 1) {
    res.status(403).json({ error: "Acesso negado. Admins apenas." });
    return;
  }

  next();
}