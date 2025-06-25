import { Router, Request, Response, NextFunction } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const router = Router();

router.get(
  "/private",
  ensureAuthenticated,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({
        message: "Rota protegida acessada com sucesso!",
        user: req.user,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
