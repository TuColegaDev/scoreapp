import { PrismaClient, User, Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../utils/errors/api_error";

export default class UserService {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async getAll() {
    try {
      const users: User[] = await this.prisma.user.findMany();
      users.forEach((user: Prisma.UserCreateInput) => delete user.password)
      return users
    } catch (error: any) {
      throw new ApiError(StatusCodes.NOT_FOUND, error.message);
    }
  }

  async update(id: string, data: Prisma.UserCreateInput) {
    try {
      const user: User | null = await this.prisma.user.findFirst({
        where: { id: Number(id) },
      });
      if (!user) throw new ApiError( StatusCodes.NOT_FOUND, 'Not found User')
      const updatedUser: Prisma.UserCreateInput = await this.prisma.user.update({ where: { id: Number(id) }, data });
      delete updatedUser.password
      return updatedUser
    } catch (error: any) {
      throw new ApiError(StatusCodes.NOT_FOUND, error.message);
    }
  }

  async destroy(id: string) {
    try {
      const user: User | null = await this.prisma.user.findFirst({
        where: { id: Number(id) },
      });
      if (!user) throw new ApiError( StatusCodes.NOT_FOUND, 'Not found User')
      return await this.prisma.user.delete({ where: { id: Number(id) } });
    } catch (error: any) {
      throw new ApiError(StatusCodes.NOT_FOUND, error.message);
    }
  }
}
