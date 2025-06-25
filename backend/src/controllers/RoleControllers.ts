import { Request, Response } from "express";
import { RoleService } from "../services/RoleService";

export class RoleController {
  private roleService = new RoleService();

  async getAll(req: Request, res: Response): Promise<Response> {
    const roles = await this.roleService.getAllRoles();
    return res.json(roles);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const role = await this.roleService.getRoleById(Number(req.params.id));
    if (!role) return res.status(404).json({ error: "Role not found" });

    return res.json(role);
  }

  async create(req: Request, res: Response): Promise<Response> {
   try {
     const { name } = req.body;
     const role = await this.roleService.createRole(name);
     return res.status(201).json(role);
   } catch (error: any) {
     return res.status(400).json({ error: error.message });
   }
 }

  async update(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const updated = await this.roleService.updateRole(Number(req.params.id), name);

    if (!updated) return res.status(404).json({ error: "Role not found" });
    return res.json(updated);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const deleted = await this.roleService.deleteRole(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: "Role not found" });

    return res.status(204).send();
  }
}
