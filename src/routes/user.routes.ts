import { Request, Response, Router } from "express";
import { login } from "../controllers/UserController";

const router = Router();

router.post("/login", login as (req: Request, res: Response) => any);

export default router;
