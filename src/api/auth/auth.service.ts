import { Prisma, PrismaClient, User } from "@prisma/client";

export default class AuthService {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async login(data: Prisma.UserCreateInput) {
    try {
      const user: User | null = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
      if (!user) throw new Error("Not found user");
      return user;
    } catch (error) {
      await this.prisma.$disconnect();
      throw error;
    }
  }

  async register(data: Prisma.UserCreateInput) {
    const validatedUser: Prisma.UserCreateInput =
      Prisma.validator<Prisma.UserCreateInput>()(data);

    try {
      const user: User = await this.prisma.user.create({
        data: { ...validatedUser },
      });
      return user;
    } catch (error) {
      await this.prisma.$disconnect();
      throw error;
    }
  }
}
