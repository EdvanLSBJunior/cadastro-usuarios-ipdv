import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

export class AuthService {
  async authenticate(email: string, password: string) {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({
      where: { email },
      relations: ["role"],
    });

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new Error("Invalid email or password.");
    }

    const payload = {
      id: user.id,
      email: user.email,
      roleId: user.role?.id,
    };

    const secret = process.env.JWT_SECRET as string;
    const expiresIn = (process.env.JWT_EXPIRES_IN || "60m") as unknown as SignOptions["expiresIn"];

    const token = jwt.sign(payload, secret, { expiresIn });

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }
}
