import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PropertyService {
  constructor(private prisma: PrismaService) {}

  async createProperty(data: {
    name: string;
    description?: string;
    address: string;
    organizationId: string;
  }) {
    return this.prisma.property.create({
      data,
    });
  }

  async getPropertiesByOrganization(organizationId: string) {
    return this.prisma.property.findMany({
      where: { organizationId },
    });
  }
}
