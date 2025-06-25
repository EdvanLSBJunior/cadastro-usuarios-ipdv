import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { UserService } from "../services/UserService";

export class UserController {
  private userService = new UserService();

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const authService = new AuthService();

    try {
      const result = await authService.authenticate(email, password);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }

  async register(req: Request, res: Response): Promise<Response> {
  try {
    const newUser = await this.userService.createUser(req.body);
    const { password: _, ...userWithoutPassword } = newUser;
    return res.status(201).json(userWithoutPassword);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}


  async getAllUsers(_req: Request, res: Response): Promise<Response> {
    const users = await this.userService.listAll();
    return res.json(users);
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.getById(Number(req.params.id));
      return res.json(user);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
  const { name, email, roleId, active } = req.body;

  try {
    const updates = { name, email, active };
    const updated = await this.userService.updateUser(Number(req.params.id), updates, roleId);
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      await this.userService.deleteUser(Number(req.params.id));
      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}
