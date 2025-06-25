import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { Role } from "../entities/Role";
import bcrypt from "bcrypt";

export class UserService {
  private userRepo = AppDataSource.getRepository(User);
  private roleRepo = AppDataSource.getRepository(Role);

  async createUser(name: string, email: string, password: string, roleId: number) {
    const userExists = await this.userRepo.findOne({ where: { email } });
    if (userExists) throw new Error("User already exists.");

    const role = await this.roleRepo.findOne({ where: { id: roleId } });
    if (!role) throw new Error("Invalid role.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({
      name,
      email,
      password: hashedPassword,
      role,
      active: true,
    });

    const savedUser = await this.userRepo.save(user);
    const { password: _, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
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
