import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Organization } from '@prisma/client';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  async createOrganization(data: { name: string; description?: string }): Promise<Organization> {
    return this.prisma.organization.create({
      data,
    });
  }

  async getOrganizationById(id: string): Promise<Organization> {
    return this.prisma.organization.findUnique({
      where: { id },
    });
  }

  async updateOrganization(id: string, data: { name?: string; description?: string }): Promise<Organization> {
    return this.prisma.organization.update({
      where: { id },
      data,
    });
  }

  async deleteOrganization(id: string): Promise<Organization> {
    return this.prisma.organization.delete({
      where: { id },
    });
  }
}