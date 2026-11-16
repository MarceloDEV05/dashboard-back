import { compare } from "bcryptjs";
import { prisma } from "../../prisma/index.js";
import jwt from "jsonwebtoken";

interface AuthUserProps {
  email: string;
  password: string;
}

export class AuthUserService {
  async execute({ email, password }: AuthUserProps) {
    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Email ou senha inválidos");
    }

    const passwordCompare = await compare(password, user.password);

    if (!passwordCompare) {
      throw new Error("Email ou senha inválidos");
    }

    const token = jwt.sign({
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d",
      });

      return{
        id: user.id,
        name: user.name,
        email: user.email,
        token: token
      };
  }
};
