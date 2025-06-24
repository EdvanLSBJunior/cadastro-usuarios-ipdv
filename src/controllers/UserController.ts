import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const authService = new AuthService();
    const result = await authService.authenticate(email, password);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
};
