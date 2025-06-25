import { AppDataSource } from "../config/data-source";
import { Role } from "../entities/Role";

export class RoleService {
  private roleRepo = AppDataSource.getRepository(Role);

  async getAllRoles(): Promise<Role[]> {
    return this.roleRepo.find();
  }

  async getRoleById(id: number): Promise<Role | null> {
    return this.roleRepo.findOne({ where: { id } });
  }

  async createRole(name: string): Promise<Role> {
   const existing = await this.roleRepo.findOne({ where: { name } });
   if (existing) {
     throw new Error("Role already exists");
   }

  const role = this.roleRepo.create({ name });
  return await this.roleRepo.save(role);
}


  async updateRole(id: number, name: string): Promise<Role | null> {
    const role = await this.getRoleById(id);
    if (!role) return null;

    role.name = name;
    return this.roleRepo.save(role);
  }

  async deleteRole(id: number): Promise<boolean> {
    const role = await this.getRoleById(id);
    if (!role) return false;

    await this.roleRepo.remove(role);
    return true;
  }
}
