import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { Role } from "../entities/Role";
import bcrypt from "bcrypt";

export class UserService {
  private userRepo = AppDataSource.getRepository(User);
  private roleRepo = AppDataSource.getRepository(Role);

  async createUser(data: Partial<User>): Promise<User> {
  const userRepo = AppDataSource.getRepository(User);
  const roleRepo = AppDataSource.getRepository(Role);

  const existingUser = await userRepo.findOne({ where: { email: data.email } });
  if (existingUser) {
    throw new Error("Email already in use.");
  }

  const role = await roleRepo.findOne({ where: { id: data.role?.id } });
  if (!role) {
    throw new Error("Invalid role.");
  }

  const hashedPassword = await bcrypt.hash(data.password!, 10);

  const user = userRepo.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    active: data.active ?? true,
    role,
  });

  return await userRepo.save(user);
}


  async listAll() {
    return this.userRepo.find({ relations: ["role"] });
  }

  async getById(id: number) {
    const user = await this.userRepo.findOne({ where: { id }, relations: ["role"] });
    if (!user) throw new Error("Usuário não encontrado");
    return user;
  }

  async updateUser(id: number, updates: Partial<User>, roleId?: number) {
  const user = await this.userRepo.findOne({ where: { id }, relations: ["role"] });
  if (!user) throw new Error("Usuário não encontrado");

  if (roleId !== undefined && roleId !== user.role.id) {
    const newRole = await this.roleRepo.findOne({ where: { id: roleId } });
    if (!newRole) throw new Error("Invalid role.");
    user.role = newRole;
  }

  Object.assign(user, updates);
  return this.userRepo.save(user);
}

  async deleteUser(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new Error("Usuário não encontrado");

    await this.userRepo.remove(user);
  }
}
