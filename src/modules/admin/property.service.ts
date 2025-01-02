import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Property } from '@prisma/client';

@Injectable()
export class PropertyService {
  constructor(private prisma: PrismaService) {}

  async createProperty(data: { name: string; description?: string; address: string; organizationId: string }): Promise<Property> {
    return this.prisma.property.create({
      data,
    });
  }

  async getPropertyById(id: string): Promise<Property> {
    return this.prisma.property.findUnique({
      where: { id },
    });
  }

  async getPropertiesByOrganizationId(organizationId: string): Promise<Property[]> {
    return this.prisma.property.findMany({
      where: { organizationId },
    });
  }

  async updateProperty(id: string, data: { name?: string; description?: string; address?: string }): Promise<Property> {
    return this.prisma.property.update({
      where: { id },
      data,
    });
  }

  async deleteProperty(id: string): Promise<Property> {
    return this.prisma.property.delete({
      where: { id },
    });
  }
}
