import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { Role } from "../entities/Role";
import bcrypt from "bcrypt";

export class UserController {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const authService = new AuthService();
      const result = await authService.authenticate(email, password);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }

  async register(req: Request, res: Response): Promise<Response> {
    const { name, email, password, roleId } = req.body;

    try {
      const userRepo = AppDataSource.getRepository(User);
      const roleRepo = AppDataSource.getRepository(Role);

      const userExists = await userRepo.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: "User already exists." });
      }

      const role = await roleRepo.findOne({ where: { id: roleId } });
      if (!role) {
        return res.status(400).json({ error: "Invalid role." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = userRepo.create({
        name,
        email,
        password: hashedPassword,
        role,
        active: true,
      });

      const savedUser = await userRepo.save(newUser);
      const { password: _, ...userWithoutPassword } = savedUser;

      return res.status(201).json(userWithoutPassword);
    } catch (error: any) {
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async getAllUsers(_req: Request, res: Response): Promise<Response> {
    const users = await AppDataSource.getRepository(User).find({ relations: ["role"] });
    return res.json(users);
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: Number(req.params.id) },
      relations: ["role"],
    });

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    return res.json(user);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { name, email, roleId, active } = req.body;
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { id: Number(req.params.id) } });
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (roleId !== undefined && roleId !== user.role.id) {
      const roleRepo = AppDataSource.getRepository(Role);
      const newRole = await roleRepo.findOne({ where: { id: roleId } });
      if (!newRole) {
        return res.status(400).json({ error: "Invalid role." });
      }
      user.role = newRole;
    }

    user.active = active ?? user.active;

    await userRepo.save(user);
    return res.json(user);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { id: Number(req.params.id) } });
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    await userRepo.remove(user);
    return res.status(204).send();
  }
}
