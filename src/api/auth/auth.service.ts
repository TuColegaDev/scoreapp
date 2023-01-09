import { Prisma, PrismaClient, User } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../utils/errors/api_error";
import bcrypt from 'bcrypt'

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
      
      if ( user?.email != data.email || await bcrypt.compare(data.password, user?.password) )
        throw new ApiError( StatusCodes.UNAUTHORIZED, "Incorrect credentials" );

      return user;
    } catch (error: any) {
      throw new ApiError( StatusCodes.NOT_FOUND, error.message );
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
    } catch (error: any) {
      throw new ApiError( StatusCodes.NOT_ACCEPTABLE, error.message );
    }
  }
}
