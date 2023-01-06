import { PrismaClient, User, Prisma } from "@prisma/client";

export default class UserService {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAll() {
    try {
      const users: User[] = await this.prisma.user.findMany();

      return users;
    } catch (error) {
      await this.prisma.$disconnect();
      throw error;
    }
  }

  async update(id: string, data: Prisma.UserCreateInput) {
    try {
      const user: User | null = await this.prisma.user.findFirst({
        where: { id: Number(id) },
      });
      if (!user) throw new Error("User not found");
      return await this.prisma.user.update({ where: { id: Number(id) }, data });
    } catch (error) {
      await this.prisma.$disconnect();
      throw error;
    }
  }

  async destroy(id: string) {
    try {
      const user: User | null = await this.prisma.user.findFirst({
        where: { id: Number(id) },
      });
      if (!user) throw new Error("User not found");

      return await this.prisma.user.delete({ where: { id: Number(id) } });
    } catch (error) {
      await this.prisma.$disconnect();
      throw error;
    }
  }
}
