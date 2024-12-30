import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserProperties(userId: string) {
    const userProperties = await this.prisma.userPropertyRole.findMany({
      where: { userId },
      include: {
        property: true,
      },
    });

    return userProperties.map((userPropertyRole) => userPropertyRole.property);
  }
}
