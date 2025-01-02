import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: {
    email: string;
    password: string;
    name: string;
    organizationId: string;
  }): Promise<void> {
    // TODO: Implement this method
    console.log('createUser', data);
    // return this.prisma.user.create({
    //   data,
    // });
  }

  async getUserById(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(
    id: string,
    data: { email?: string; password?: string; name?: string },
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
