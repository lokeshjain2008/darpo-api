import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VisitorService {
  constructor(private prisma: PrismaService) {}

  async createVisitor(name: string, email: string, phone: string) {
    return this.prisma.visitor.create({
      data: {
        name,
        email,
        phone,
      },
    });
  }

  async getVisitorByEmail(email: string) {
    return this.prisma.visitor.findUnique({
      where: { email },
    });
  }
}
